import { pipeline } from "stream/promises";
import {
  CloudWatchLogsClient,
  StartLiveTailCommand,
} from "@aws-sdk/client-cloudwatch-logs";

const LOG_GROUP_ARN = process.env.LOG_GROUP_ARN;
const LOG_FILTER_PATTERN = process.env.LOG_FILTER_PATTERN;
const REGION = process.env.REGION;

const client = new CloudWatchLogsClient({ region: REGION });

export const handler = awslambda.streamifyResponse(
  async (event, responseStream, context) => {
    // 1. Use HttpResponseStream to set the protocol metadata
    const httpStream = awslambda.HttpResponseStream.from(responseStream, {
      statusCode: 200,
      headers: { "Content-Type": "text/event-stream" }, // Excellent for live logs
    });

    httpStream.write(`event: open\ndata: {}\n\n`);

    const liveTailSession = new StartLiveTailCommand({
      logGroupIdentifiers: [LOG_GROUP_ARN],
      logEventFilterPattern: LOG_FILTER_PATTERN,
    });

    const response = await client.send(liveTailSession);

    await pipeline(
      response.responseStream, // Source
      async function* (source) {
        // Transformation layer to format the data
        for await (const chunk of source) {
          if (chunk.sessionUpdate?.sessionResults) {
            for (const log of chunk.sessionUpdate.sessionResults) {
              //remove backslashes so is valid json?
              //no because json in json
              yield `data: ${JSON.stringify(log.message)}\n\n`;
            }
          }
        }
      },
      httpStream, // Destination
    );
  },
);
