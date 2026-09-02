export const methods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "PATCH",
] as const;
export const edgeResultTypes = [
  "Hit",
  "Miss",
  "RefreshHit",
  "Redirect",
  "Error",
  "LimitExceeded",
  "CapacityExceeded",
] as const;
export const sslProtocols = ["TLSv1.2", "TLSv1.3", "-"] as const;
export const userProtocols = ["http", "https", "ws", "wss"] as const;
export const userProtocolVersion = [
  "HTTP/1.0",
  "HTTP/1.1",
  "HTTP/2",
  "HTTP/3",
] as const;

export type CloudFrontLogPayload = {
    "date": number;
    "time": number;
    "x-edge-location": string;
    "sc-bytes": number;
    "cs-method": (typeof methods)[number];
    "cs(Host)": string;
    "cs-uri-stem": string;
    "sc-status": number;
    "cs(User-Agent)": string;
    "x-edge-result-type": (typeof edgeResultTypes)[number];
    "x-edge-request-id": string;
    "x-host-header": string;
    "cs-protocol": (typeof userProtocols)[number];
    "cs-bytes": number;
    "time-taken": number;
    "ssl-protocol": (typeof sslProtocols)[number];
    "ssl-cipher": string;
    "x-edge-response-result-type": (typeof edgeResultTypes)[number];
    "cs-protocol-version": (typeof userProtocolVersion)[number];
    "fle-status": string;
    "fle-encrypted-fields": number;
    "c-port": number;
    "time-to-first-byte": number;
    "x-edge-detailed-result-type": string;
    "sc-content-len": number;
    "sc-range-start": number;
    "sc-range-end": number;
    "c-country": string;
}

function createOrderObj(displayText: string, objKey: keyof LogDisplayData) {
  return {
    displayText: displayText,
    objKey: objKey,
  };
}

export const columnOrder = [
  createOrderObj("Id", "id"),
  // Time and location
  createOrderObj("Date", "date"),
  createOrderObj("Time", "time"),
  createOrderObj("Edge Location", "x-edge-location"),
  // Cliet details
  createOrderObj("User Agent", "cs(User-Agent)"),
  // Request attributes
  createOrderObj("Host Domain", "cs(Host)"),
  createOrderObj("Host Domain Header", "x-host-header"),
  createOrderObj("URL Path", "cs-uri-stem"),
  // Response
  createOrderObj("HTTP Method", "cs-method"),
  createOrderObj("HTTP Status Code", "sc-status"),
  createOrderObj("Response Content Length", "sc-content-len"),
  createOrderObj("Bytes Sent", "sc-bytes"),
  createOrderObj("Bytes Received", "cs-bytes"),
  // CDN
  createOrderObj("Edge Cache Result Type", "x-edge-result-type"),
  createOrderObj("Edge Response Result Type", "x-edge-response-result-type"),
  createOrderObj("Edge Request ID", "x-edge-request-id"),
  createOrderObj("Time Taken (Seconds)", "time-taken"),
  createOrderObj("Time to First Byte (Seconds)", "time-to-first-byte"),
  // Security
  createOrderObj("Protocol Used", "cs-protocol"),
  createOrderObj("HTTP Protocol Version", "cs-protocol-version"),
  createOrderObj("SSL Protocol Version", "ssl-protocol"),
  createOrderObj("SSL Cipher Suite", "ssl-cipher"),
  createOrderObj("Field-Level Encryption Status", "fle-status"),
  createOrderObj("Field-Level Encryption Count", "fle-encrypted-fields"),
];

export const columnTitles = columnOrder.map(({ displayText }) => displayText);

export type ColumnTitles = (typeof columnTitles)[number];

/**
 * SSE Event containing an actual CloudFront log entry.
 */
export type LogEntryEvent = {
  /** Unique identifier for the SSE message event. */
  id?: string;
  /** The type of event being sent. */
  event: "log_entry";
  /** The log data payload. */
  data: CloudFrontLogPayload;
};

/**
 * SSE Event used to keep the connection alive (Heartbeat).
 */
type PingEvent = {
  id?: string;
  event: "ping";
  /** Ping events typically have an empty string or timestamp as data. */
  data: string;
};

/**
 * The unified event type received from the CloudFront log stream.
 */
export type CloudFrontLogEvent = LogEntryEvent | PingEvent;

export type DisplayLogEvent = Required<CloudFrontLogEvent>;

export type LogDisplayData = {
  id: string;
} & CloudFrontLogPayload;
