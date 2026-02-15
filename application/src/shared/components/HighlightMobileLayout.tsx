import { ReactNode } from "react"
import HighlightMobileImage from "./HighlightMobileImage"
import HighlightMobileContent from "./HighlightMobileContent"

const HighlightMobileLayout = ({
    image,
    content
}: {
    image: ReactNode,
    content: ReactNode
}) => {
    return (
        <>
            <HighlightMobileImage>
                {image}
            </HighlightMobileImage>
            <span className='pb-4' />
            <HighlightMobileContent>
                {content}
            </HighlightMobileContent>
        </>
    )
}

export default HighlightMobileLayout
