import { ReactNode } from "react"
import HighlightDesktopImage from "./HighlightDesktopImage"

const HighlightDesktopLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    return (
        <>
            <HighlightDesktopImage>
                {children}
            </HighlightDesktopImage>
            {paragraphs.map((para, idx) => <div key={idx}>
                <p>{para}</p>
                &nbsp;
            </div>)}
        </>
    )
}

export default HighlightDesktopLayout
