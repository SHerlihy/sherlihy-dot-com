import { createFileRoute } from "@tanstack/react-router"
import Home from "@/pages/Home"

type ProjectsQueryOptions = "velma" | "i2" | "authService" | "sherlihyDotCom" | "resumeGrader" | "awsCert" | ""
type EventQueryOptions = "DoC" | "SCC" | "CamAI" | "TechWeek"
export type AllQueryOptions =  EventQueryOptions | ProjectsQueryOptions

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: (search: Record<string, unknown>): {highlight: AllQueryOptions} => {
    // validate and parse the search params into a typed state
    return {
      highlight: (search.highlight as AllQueryOptions) || "",
    }
  },
})
