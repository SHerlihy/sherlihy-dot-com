import React, { ReactNode } from 'react'

const HighlightMobileImage = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className='flex justify-center items-center'>
            {children}
        </div>
    )
}

export default HighlightMobileImage
