import React, { ReactNode } from 'react'

const HighlightMobileImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className={`pt-8 pb-8 flex justify-center items-center flex-col`}>
                {children}
        </div>
    )
}

export default HighlightMobileImage
