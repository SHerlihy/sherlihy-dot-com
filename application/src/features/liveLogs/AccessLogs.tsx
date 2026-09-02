import { useEffect, useState } from "react";
import { useCloudwatchLogs } from "./useCloudwatchLogs.ts";

import AccessLogsTable from "./components/AccessLogsTable.tsx";
import DeselectedSelector from "./components/DeselectedSelector.tsx";

const URL =
  "https://xkn6ujw7kyd67uoy4kretill4a0yhyfu.lambda-url.us-east-1.on.aws/";

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

    console.log("after connecting");

    eventSource.addEventListener("open", () => {
      console.log("onopen");
      setStatus("connected");
    });

    eventSource.addEventListener("message", (e) => {
      let parsedLog = e.data;
      try {
        for (let i = 0; i < 3 && typeof parsedLog === "string"; i++) {
          parsedLog = JSON.parse(parsedLog);
        }
        if (typeof parsedLog === "string") {
          throw new TypeError("Log message did not parse to object.");
        }

        addLog(parsedLog);
      } catch (err) {
        console.error("Failed to parse log event data:", err);
      }
    });

    eventSource.addEventListener("end", () => {
      console.log("end");
      setStatus("disconnected");
      eventSource.close();
    });

    eventSource.addEventListener("error", (err) => {
      console.error("EventSource error:", err);
      setError("Connection lost or failed to connect.");
      setStatus("disconnected");
    });

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
      <AccessLogsTable orderedLogs={orderedLogs} />
    </div>
  );
}

export default AccessLogs;
