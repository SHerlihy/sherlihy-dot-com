import React, { ReactNode } from 'react'

const HighlightMobileImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className={`pt-8 pb-8 flex justify-center items-center flex-1 flex-col`}>
            <div className="h-30 relative">
                {children}
            </div>
        </div>
    )
}

export default HighlightMobileImage
