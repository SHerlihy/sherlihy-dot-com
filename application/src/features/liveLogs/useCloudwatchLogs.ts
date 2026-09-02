import { useCallback, useState } from "react";
import { LogDisplayData, CloudFrontLogPayload } from "./definitions";

export function useCloudwatchLogs() {
  const [orderedLogs, setOrderedLogs] = useState<Array<LogDisplayData>>([]);

  const addLog = useCallback((log: CloudFrontLogPayload) => {
    const displayLog = Object.assign(log, {id: self.crypto.randomUUID()}) as LogDisplayData

    setOrderedLogs((prev) => {
      return [...prev, displayLog];
    });
  }, []);

  return {
    orderedLogs: orderedLogs,
    addLog: addLog,
  };
}
