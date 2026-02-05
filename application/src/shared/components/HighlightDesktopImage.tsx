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
        <span
            className={`float-left overflow-hidden`}
            style={{
                height: `${boxDimension}px`,
                width: `${boxDimension}px`
            }}
        >
            <span
                className={`inline-block`}
                style={{
                    maxHeight: `${imageDimension}px`,
                    maxWidth: `${imageDimension}px`
                }}
            >
                {children}
            </span>
        </span >
    )
}

export default HighlightDesktopImage
