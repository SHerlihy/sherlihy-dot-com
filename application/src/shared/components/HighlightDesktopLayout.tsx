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
        <div className="flex flex-1 justify-center items-center">
            <div className="w-2/3 h-fit">
                <HighlightDesktopImage
                    boxDimension={180}
                    imageDimension={150}
                >
                    {children}
                </HighlightDesktopImage>
                {paragraphs.map((para, idx) => <div key={idx}>
                    <p key={idx}>{para}</p>
                    &nbsp;
                </div>)}
            </div>
        </div>
    )
}

export default HighlightDesktopLayout
