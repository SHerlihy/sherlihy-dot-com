import React, { ReactNode } from 'react'

const HighlightDesktopImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className='float-left overflow-hidden p-6'>
            <div className="h-30 w-30 relative">
                {children}
            </div>
        </div>
    )
}

export default HighlightDesktopImage
