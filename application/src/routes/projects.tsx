import { createFileRoute } from "@tanstack/react-router"
import ProjectsLeaf from "../pages/leafPages/ProjectsLeaf"

export type ProjectsQueryOptions = "velma" | "i2" | "authService" | "sherlihyDotCom" | "resumeGrader" | "awsCert"

export const Route = createFileRoute('/projects')({
    component: ProjectsLeaf,
    validateSearch: (search: Record<string, unknown>): { highlight: ProjectsQueryOptions } => {
        // validate and parse the search params into a typed state
        return {
            highlight: (search.highlight as ProjectsQueryOptions) || "sherlihyDotCom",
        }
    },
})
