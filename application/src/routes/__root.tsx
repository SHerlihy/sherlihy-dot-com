import { useContext } from "react"
import useIsDesktop from "@/shared/hooks/useIsDesktop"
import { NavContext } from "@/shared/context/NavContext"
import ControlBar from "@/features/navigation/ControlBar"
import NavList from "@/features/navigation/NavList"

import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (<PageLayout/>),
})

function PageLayout() {
    const isDesktop = useIsDesktop()
    const { isNav } = useContext(NavContext)

    return (
        <main className={`
flex flex-col w-full h-full overflow-hidden
`}>
            <div>
                <ControlBar />
            </div>
            <article className={`
${isDesktop && "p-10"}
flex flex-col flex-1 overflow-hidden justify-between align-center
`}>
                {isNav && <NavList/>}
                {!isNav && <Outlet/>}
                {isDesktop && <hr />}
            </article>
        </main>
    )
}
