import { columnOrder } from "../definitions.ts";
import { isBitSet } from "../../../lib/bitwise.ts";

import { Link, useLocation } from "@tanstack/react-router";
import { Route } from "../../../routes/observe.tsx";

function DeselectedSelector() {
  const { deselected } = Route.useSearch();
  const location = useLocation();

  return (
    <div>
      {columnOrder.map(({ displayText }, i) => (
        <Link
          key={`${displayText}`}
          style={{ color: "inherit" }}
          className={`
flex justify-center items-center 
${isBitSet(deselected, i) ? "bg-green-400" : "bg-red-400"}
`}
          to={location.pathname}
          search={(prev) => {
            let deselectedVal = 0;
            if (prev.deselected !== undefined) {
              deselectedVal = prev.deselected;
            }

            const mask = 1 << i;

            return {
              deselected: deselectedVal ^ mask,
            };
          }}
        >
          {displayText}
        </Link>
      ))}
    </div>
  );
}

export default DeselectedSelector;
