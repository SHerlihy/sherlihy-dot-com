import { createFileRoute } from "@tanstack/react-router"
import EventsLeaf from "../pages/leafPages/EventsLeaf.tsx"

export type EventQueryOptions = "DoC" | "SCC" | "CamAI" | "TechWeek"

export const Route = createFileRoute('/events')({
  component: EventsLeaf,
  validateSearch: (search: Record<string, unknown>): {highlight: EventQueryOptions} => {
    // validate and parse the search params into a typed state
    return {
      highlight: (search.highlight as EventQueryOptions) || "DoC",
    }
  },
})
