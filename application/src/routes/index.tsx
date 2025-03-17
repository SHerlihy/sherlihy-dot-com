import { createFileRoute } from "@tanstack/react-router"
import { EventQueryOptions } from "./events"

export type HomeQueryOptions = "highlight" | "velma" | "i2" | "authService" | "sherlihyDotCom" | "resumeGrader"| "awsCert"

export type AllQueryOptions = HomeQueryOptions | EventQueryOptions

type ProductSearch = {
    highlight: AllQueryOptions
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    // validate and parse the search params into a typed state
    return {
      highlight: (search.highlight as AllQueryOptions) || "highlight",
    }
  },
})
