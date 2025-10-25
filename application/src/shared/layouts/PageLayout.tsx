import { ReactNode, useContext } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import DesktopLayout from "./DesktopLayout"
import MobileLayout from "./MobileLayout"
import { NavContext } from "../context/NavContext"
import ControlBar from "../components/ControlBar"

function PageLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    // const isDesktop = useIsDesktop()
    //
    // return (
    //     <>
    //         {isDesktop && <DesktopLayout
    //             content={content}
    //             navigate={navigate}
    //         />}
    //         {!isDesktop && <MobileLayout
    //             content={content}
    //             navigate={navigate}
    //         />}
    //     </>
    // )
    const isDesktop = useIsDesktop()
    const { isNav } = useContext(NavContext)

    return (
        <main className={`
${isDesktop && "p-10"}
flex flex-col w-full h-full overflow-hidden
`}>
            <div>
                <ControlBar />
            </div>
            <hr className={`pb-4`} />
            <article className={`flex flex-col flex-1 overflow-hidden`}>
                {isNav && navigate}
                {!isNav && content}
                <hr />
            </article>
        </main>
    )
}

export default PageLayout
