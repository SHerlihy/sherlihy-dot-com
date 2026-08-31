import { createFileRoute } from "@tanstack/react-router"
import RootBranch from "../pages/RootBranch"

export const Route = createFileRoute('/observe')({
  component: RootBranch,
  validateSearch: (search: Record<string, unknown>): {deselected: number} => {
    // validate and parse the search params into a typed state
    if (typeof search.deselected !== 'string' || typeof search.deselected !== 'number'){
      throw new TypeError('Search parameter needs to be string or number')
    }
    return {
	deselected: parseInt(search.deselected) ?? -1,
    }
  },
})
