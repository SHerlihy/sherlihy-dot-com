import { useCloudwatchLogs } from "../useCloudwatchLogs.ts";
import { columnOrder } from "../definitions.ts";
import AccessLogDisplayData from "./AccessLogDisplayData.tsx";

function AccessLogsTable() {
  const { orderedLogs } = useCloudwatchLogs();

  return (
    <table>
      <thead>
        <tr>
          {columnOrder.map(({ displayText }) => {
            return (
              <th scope="col" key={displayText}>
                {displayText}
              </th>
            );
          })}
        </tr>
      </thead>
      {orderedLogs.map((log) => (
        <AccessLogDisplayData logDisplayData={log} />
      ))}
    </table>
  );
}

export default AccessLogsTable;
