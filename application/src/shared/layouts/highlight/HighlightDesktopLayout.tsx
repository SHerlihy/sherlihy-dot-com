import { ReactNode } from "react"
import HighlightDesktopImage from "./HighlightDesktopImage"

const HighlightDesktopLayout = ({
    image,
    content
}: {
    image: ReactNode,
    content: ReactNode
}) => {
    return (
        <div className="flex flex-1 justify-center items-center">
            <div className="w-2/3 h-fit">
                <HighlightDesktopImage
                    boxDimension={180}
                    imageDimension={150}
                >
                    {image}
                </HighlightDesktopImage>
                    {content}
            </div>
        </div>
    )
}

export default HighlightDesktopLayout
