import React, { ReactNode } from 'react'

const HighlightDesktopImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className='float-left overflow-hidden p-6'>
            {children}
        </div>
    )
}

export default HighlightDesktopImage
