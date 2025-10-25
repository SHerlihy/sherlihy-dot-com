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
flex flex-col flex-1 overflow-hidden
`}>
                {isNav && navigate}
                {!isNav && <ContentLayout>{content}</ContentLayout>}
                <hr />
            </article>
        </main>
    )
}

function ContentLayout({ children }: { children: ReactNode }) {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <div className={`p-16 flex-1 flex flex-row justify-center align-center`}>
                <div className={`flex flex-col justify-center align-center`}>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default PageLayout
