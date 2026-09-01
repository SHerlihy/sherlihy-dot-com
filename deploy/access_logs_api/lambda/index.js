const { CloudWatchLogsClient, FilterLogEventsCommand } = require("@aws-sdk/client-cloudwatch-logs");

const LOG_GROUP_NAME = process.env.LOG_GROUP_NAME;
const LOG_REGION = process.env.LOG_REGION || "us-east-1";
const DEFAULT_LIMIT = Number(process.env.DEFAULT_LIMIT || 100);
const MAX_LIMIT = Number(process.env.MAX_LIMIT || 500);
const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS || 2000);

const logs = new CloudWatchLogsClient({ region: LOG_REGION });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handler = awslambda.streamifyResponse(async (event, responseStream, context) => {
  responseStream.setContentType("text/event-stream");

  const params = event.queryStringParameters || {};
  const startedAt = Date.now();
  let startTime = Number(params.startTime || startedAt - 15 * 60 * 1000);
  const endTime = params.endTime ? Number(params.endTime) : null;
  const limit = Math.min(Number(params.limit || DEFAULT_LIMIT), MAX_LIMIT);
  const filterPattern = params.filterPattern;
  const seenEventIds = new Set();

  if (!Number.isInteger(startTime) || (endTime !== null && !Number.isInteger(endTime)) || !Number.isInteger(limit)) {
    writeEvent(responseStream, "error", { message: "startTime, endTime, and limit must be integers" });
    responseStream.end();
    return;
  }

  if (limit < 1) {
    writeEvent(responseStream, "error", { message: "limit must be greater than zero" });
    responseStream.end();
    return;
  }

  if (endTime !== null && startTime > endTime) {
    writeEvent(responseStream, "error", { message: "startTime must be before endTime" });
    responseStream.end();
    return;
  }

  writeEvent(responseStream, "ready", { startTime, pollIntervalMs: POLL_INTERVAL_MS });

  while (context.getRemainingTimeInMillis() > POLL_INTERVAL_MS + 1000) {
    const windowEnd = endTime || Date.now();
    const request = {
      logGroupName: LOG_GROUP_NAME,
      startTime,
      endTime: windowEnd,
      limit,
      interleaved: true,
    };

    if (filterPattern) {
      request.filterPattern = filterPattern;
    }

    try {
      const result = await logs.send(new FilterLogEventsCommand(request));
      const events = (result.events || []).sort((left, right) => left.timestamp - right.timestamp);

      for (const event of events) {
        if (seenEventIds.has(event.eventId)) {
          continue;
        }

        seenEventIds.add(event.eventId);
        startTime = Math.max(startTime, event.timestamp + 1);
        writeEvent(responseStream, "log", formatEvent(event));
      }
    } catch (error) {
      writeEvent(responseStream, "error", {
        message: "Failed to read CloudFront access logs.",
        error: error.name || "Unknown",
      });
    }

    if (endTime !== null && startTime >= endTime) {
      break;
    }

    writeEvent(responseStream, "heartbeat", { timestamp: Date.now() });
    await sleep(POLL_INTERVAL_MS);
  }

  writeEvent(responseStream, "done", { durationMs: Date.now() - startedAt });
  responseStream.end();
});

function writeEvent(responseStream, eventName, payload) {
  responseStream.write(`event: ${eventName}\n`);
  responseStream.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function formatEvent(event) {
  return {
    eventId: event.eventId,
    timestamp: event.timestamp,
    ingestionTime: event.ingestionTime,
    logStreamName: event.logStreamName,
    message: parseMessage(event.message),
  };
}

function parseMessage(message) {
  if (!message) {
    return message;
  }

  try {
    return JSON.parse(message);
  } catch {
    return message;
  }
}
