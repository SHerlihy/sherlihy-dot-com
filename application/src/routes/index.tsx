import { createFileRoute } from "@tanstack/react-router"
import RootBranch from "../pages/RootBranch"

type ProjectsQueryOptions = "velma" | "i2" | "authService" | "sherlihyDotCom" | "resumeGrader" | "awsCert"
type EventQueryOptions = "DoC" | "SCC" | "CamAI" | "TechWeek"
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
