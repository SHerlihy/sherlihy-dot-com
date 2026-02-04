import React, { ReactNode } from 'react'

type Props = {
    boxDimension: number,
    imageDimension: number,
    children: ReactNode
}

const HighlightDesktopImage = ({
    boxDimension,
    imageDimension,
    children
}: Props) => {
    return (
        <span className={`min-h-[${boxDimension}px] min-w-[${boxDimension}px]  float-left overflow-hidden`}>
            <span className={`inline-block max-h-[${imageDimension}px] max-w-[${imageDimension}px]`}>
                {children}
            </span>
        </span>
    )
}

export default HighlightDesktopImage
