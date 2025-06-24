import { ReactNode } from "react"
import HighlightMobileImage from "./HighlightMobileImage"
import HighlightMobileContent from "./HighlightMobileContent"

const HighlightMobileLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    return (
        <>
            <HighlightMobileImage>
                {children}
            </HighlightMobileImage>
            <span className='pb-4'/>
            <HighlightMobileContent>
                {paragraphs.map((para, idx) => <div key={idx}>
                    <p>{para}</p>
                    &nbsp;
                </div>)}
            </HighlightMobileContent>
        </>
    )
}

export default HighlightMobileLayout
