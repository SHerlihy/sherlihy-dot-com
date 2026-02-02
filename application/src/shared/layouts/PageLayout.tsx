import { ReactNode, useContext } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import { NavContext } from "../context/NavContext"
import ControlBar from "../components/ControlBar"

function PageLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
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
                {isNav && navigate}
                {!isNav && content}
                <hr />
            </article>
        </main>
    )
}

export default PageLayout
