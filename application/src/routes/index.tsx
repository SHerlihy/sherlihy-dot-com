import { createFileRoute } from "@tanstack/react-router"
import { EventQueryOptions } from "./events"
import RootBranch from "../pages/RootBranch"
import { ProjectsQueryOptions } from "./projects"

export type AllQueryOptions =  EventQueryOptions | ProjectsQueryOptions

export const Route = createFileRoute('/')({
  component: RootBranch,
  validateSearch: (search: Record<string, unknown>): {highlight: AllQueryOptions} => {
    // validate and parse the search params into a typed state
    return {
      highlight: (search.highlight as AllQueryOptions) || "",
    }
  },
})
