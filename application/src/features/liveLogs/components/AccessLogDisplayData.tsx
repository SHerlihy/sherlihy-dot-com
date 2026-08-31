import { Route } from "../../../routes/observe";
import { LogDisplayData, columnOrder } from "../definitions.ts";

type Props = {
  logDisplayData: LogDisplayData;
};

const isBitSet = (number: number, position: number) =>
  (number & (1 << position)) !== 0;

function AccessLogDisplayData({ logDisplayData }: Props) {
  const { deselected } = Route.useSearch();

  return (
    <tr>
      {columnOrder.map(({ objKey }, i) => {
        console.log(objKey);
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
