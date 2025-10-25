import React, { ReactNode } from 'react'

const HighlightMobileImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className='flex justify-center items-center'>
            <div className="h-30 relative">
                {children}
            </div>
        </div>
    )
}

export default HighlightMobileImage
