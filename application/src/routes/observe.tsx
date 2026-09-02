import { createFileRoute } from "@tanstack/react-router";
import Observe from "../pages/Observe";

export const Route = createFileRoute("/observe")({
  component: Observe,
  validateSearch: (search: Record<string, unknown>): { deselected: number } => {
    if (search.deselected === undefined) {
      search.deselected = 0;
    }
    // validate and parse the search params into a typed state
    if (
      typeof search.deselected !== "string" &&
      typeof search.deselected !== "number"
    ) {
      throw new TypeError("Search parameter needs to be string or number");
    }

    let deselected = search.deselected;

    if (typeof deselected === "string") {
      deselected = parseInt(deselected);
    }

    return {
      deselected: deselected,
    };
  },
});
