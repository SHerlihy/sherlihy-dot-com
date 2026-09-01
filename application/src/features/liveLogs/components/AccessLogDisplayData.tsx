import { Route } from "../../../routes/observe";
import { LogDisplayData, columnOrder } from "../definitions.ts";

import { isBitSet } from "../../../lib/bitwise.ts";

type Props = {
  logDisplayData: LogDisplayData;
};

function AccessLogDisplayData({ logDisplayData }: Props) {
  const { deselected } = Route.useSearch();

  return (
    <tr>
      {columnOrder.map(({ objKey }, i) => {
        if (isBitSet(deselected, i)) {
          return null;
        }

        return (
          <td key={`${logDisplayData.id}-${i}`}>{logDisplayData[objKey]}</td>
        );
      })}
    </tr>
  );
}

export default AccessLogDisplayData;
