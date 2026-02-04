import React, { ReactNode } from 'react'

const HighlightDesktopImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <span className='min-h-[180px] min-w-[180px] float-left overflow-hidden'>
            <span className="h-30 w-30 relative">
                {children}
            </span>
        </span>
    )
}

export default HighlightDesktopImage
