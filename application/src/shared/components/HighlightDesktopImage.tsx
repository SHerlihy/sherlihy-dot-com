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
        <span className={`min-h-2xs min-w-2xs  float-left overflow-hidden`}>
            <span className={`inline-block max-h-3xs max-w-3xs`}>
                {children}
            </span>
        </span>
    )
}

export default HighlightDesktopImage
