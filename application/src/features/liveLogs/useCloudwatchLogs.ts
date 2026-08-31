import { useState } from "react";
import { LogDisplayData, LogEntryEvent } from "./definitions";

type NullablePartial<T> = {
  [P in keyof T]: T[P] | null;
};

export function useCloudwatchLogs() {
  const [orderedLogs, setOrderedLogs] = useState<Array<LogDisplayData>>([]);

  function addLog(eventLog: LogEntryEvent) {
    const logDisplayData = logDisplayDataFromLogEntryEvent(eventLog);

    setOrderedLogs((prev) => {
      return [...prev, logDisplayData];
    });
  }

  return {
    orderedLogs: orderedLogs,
    addLog: addLog,
  };
}

function logDisplayDataFromLogEntryEvent(
  eventLog: LogEntryEvent,
): LogDisplayData {
  const logDisplayData: NullablePartial<LogDisplayData> = {
    id: null,
    timestamp: null,
    time_taken: null,
    sc_status: null,
    ctx_host: null,
    cs_method: null,
    cs_uri_stem: null,
    cs_uri_query: null,
    x_edge_result_type: null,
    x_edge_request_id: null,
    ssl_protocol: null,
    ssl_cipher: null,
    x_edge_response_result_type: null,
    cs_user_agent: null,
    cs_referer: null,
    cs_cookie: null,
    sc_bytes: null,
    cs_bytes: null,
    x_edge_location: null,
    sc_content_len: null,
    time_to_first_byte: null,
    cs_host_header: null,
    cs_protocol: null,
    cs_protocol_version: null,
    fle_status: null,
    fle_encrypted_fields: null,
  };

  const logDisplayKeys = Object.keys(logDisplayData) as Array<
    keyof LogDisplayData
  >;

  logDisplayKeys.forEach((key) => {
    if (key === "id") {
      logDisplayData.id = eventLog.id ?? self.crypto.randomUUID();
      return;
    }

    const value = eventLog.data[key];

    if (value === undefined) {
      throw new Error(`LogEntryEvent value undefined: ${key}`);
    }

    // @ts-expect-error - this is part of removing the null option
    logDisplayData[key] = value;
  });

  return logDisplayData as LogDisplayData;
}
