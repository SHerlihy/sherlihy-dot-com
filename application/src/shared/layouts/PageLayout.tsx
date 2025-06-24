import { ReactNode } from "react"
import useIsDesktop from "../hooks/useIsDesktop"
import DesktopLayout from "./DesktopLayout"
import ContactInfo from "../components/ContactInfo"
import MobileLayout from "./MobileLayout"

function PageLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const isDesktop = useIsDesktop()

    return (
        <main className={`flex flex-col w-full h-full p-10`}>
            <div className={`pb-4 flex justify-center`}>
                <ContactInfo />
            </div>
            <hr className={`pb-4`} />
                    {isDesktop && <DesktopLayout
                        content={content}
                        navigate={navigate}
                    />}
                    {!isDesktop && <MobileLayout
                        content={content}
                        navigate={navigate}
                    />}
        </main>
    )
}

export default PageLayout
