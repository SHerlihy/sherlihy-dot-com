import { createFileRoute } from "@tanstack/react-router"
import Events from '../pages/leafPages/Events.tsx'
import EventsLeaf from "../pages/leafPages/EventsLeaf.tsx"

// export type HomeQueryOptions = "highlight" | "velma" | "i2" | "authService" | "sherlihyDotCom" | "resumeGrader"| "awsCert"

export const Route = createFileRoute('/events')({
  component: EventsLeaf,
  // validateSearch: (search: Record<string, unknown>): ProductSearch => {
  //   // validate and parse the search params into a typed state
  //   return {
  //     highlight: (search.highlight as HomeQueryOptions) || "highlight",
  //   }
  // },
})

// type ProductSearch = {
//     highlight: HomeQueryOptions
// }
