import { useEffect, useState } from "react";
import { useCloudwatchLogs } from "./useCloudwatchLogs.ts";

import AccessLogsTable from "./components/AccessLogsTable.tsx";
import DeselectedSelector from "./components/DeselectedSelector.tsx";

import { CloudFrontLogEvent } from "./definitions.ts";

const URL = "/api/logs/sse-stream";

function AccessLogs() {
  const { orderedLogs, addLog } = useCloudwatchLogs();

  const [status, setStatus] = useState<
    "connecting" | "connected" | "disconnected"
  >("connecting");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(URL);

    setStatus("connecting");
    setError(null);

    eventSource.onopen = () => {
      setStatus("connected");
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedLog: CloudFrontLogEvent = JSON.parse(event.data);
        if (parsedLog.event === "log_entry") {
          addLog(parsedLog);
        }
      } catch (err) {
        console.error("Failed to parse log event data:", err);
      }
    };

    eventSource.addEventListener("end", () => {
      setStatus("disconnected");
      eventSource.close();
    });

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      setError("Connection lost or failed to connect.");
      setStatus("disconnected");
    };

    return () => {
      eventSource.close();
    };
  }, [addLog]);

  return (
    <div style={{ padding: "20px", background: "#1e1e1e", color: "#fff" }}>
      <h3>
        System Logs
        <span style={{ marginLeft: "10px", fontSize: "14px" }}>
          {status === "connecting" && "🟡 Connecting..."}
          {status === "connected" && "🟢 Live"}
          {status === "disconnected" && "🔴 Disconnected"}
        </span>
      </h3>

      {error && (
        <div style={{ color: "#ff6b6b", marginBottom: "10px" }}>{error}</div>
      )}

      <DeselectedSelector />

      <div
        style={{
          height: "400px",
          overflowY: "scroll",
          fontFamily: "monospace",
          background: "#111",
          padding: "10px",
        }}
      >
        <AccessLogsTable orderedLogs={orderedLogs} />
      </div>
    </div>
  );
}

export default AccessLogs;
