import { ReactNode } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import DesktopLayout from "./DesktopLayout"
import MobileLayout from "./MobileLayout"

function PageLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const isDesktop = useIsDesktop()

    return (
        <>
            {isDesktop && <DesktopLayout
                content={content}
                navigate={navigate}
            />}
            {!isDesktop && <MobileLayout
                content={content}
                navigate={navigate}
            />}
        </>
    )
}

export default PageLayout
