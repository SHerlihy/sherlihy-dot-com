import AccessLogDisplayData from "./AccessLogDisplayData.tsx";
import { useCloudwatchLogs } from "../useCloudwatchLogs";

function AccessLogRow({ id }: { id: string }) {
  const { getLog } = useCloudwatchLogs();

  const logDisplayData = getLog(id);

  return <AccessLogDisplayData logDisplayData={logDisplayData} />;
}

export default AccessLogRow;
