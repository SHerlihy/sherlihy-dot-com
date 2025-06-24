import { ReactNode } from "react"
import HighlightDesktopImage from "./HighlightDesktopImage"
import useIsDesktop from "../hooks/useIsDesktop"

const HighlightDesktopLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    const isDesktop = useIsDesktop()

    return (
        <div className={`
${!isDesktop && 'flex flex-col'}
`}>
            <HighlightDesktopImage>
                {children}
            </HighlightDesktopImage>
            {paragraphs.map((para, idx) => <div key={idx}>
                <p>{para}</p>
                &nbsp;
            </div>)}
        </div>
    )
}

export default HighlightDesktopLayout
