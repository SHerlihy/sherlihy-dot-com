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
            <div className="h-1/3 grid grid-cols-[1fr_2fr_1fr]">
                <div className="min-h-0 py-4 col-start-2 col-end-2 flex justify-center align-center">
                    {image}
                </div>
            </div >
            <HighlightMobileContent>
                {content}
            </HighlightMobileContent>
        </>
    )
}

export default HighlightMobileLayout
