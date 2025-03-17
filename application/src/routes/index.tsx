import { createFileRoute } from "@tanstack/react-router"
import { EventQueryOptions } from "./events"
import RootBranch from "../pages/RootBranch"

export type AllQueryOptions =  EventQueryOptions

export const Route = createFileRoute('/')({
  component: RootBranch,
})
