import { Route } from "../../../routes/observe";
import { columnOrder, type LogDisplayData } from "../definitions.ts";
import AccessLogDisplayData from "./AccessLogDisplayData.tsx";

import { isBitSet } from "../../../lib/bitwise.ts";

type Props = {
  orderedLogs: Array<LogDisplayData>;
};

function AccessLogsTable({ orderedLogs }: Props) {
  const { deselected } = Route.useSearch();

  return (
    <table className="border-separate border-spacing-4">
      <thead>
        <tr>
          {columnOrder.map(({ displayText }, i) => {
            if (isBitSet(deselected, i)) {
              return null;
            }
            return (
              <th scope="col" key={displayText}>
                {displayText}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {orderedLogs.map((log) => (
          <AccessLogDisplayData key={log.id} logDisplayData={log} />
        ))}
      </tbody>
    </table>
  );
}

export default AccessLogsTable;
