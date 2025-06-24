import React, { ReactNode } from 'react'

const HighlightMobileContent = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className='p-4 overflow-scroll shadow-[inset_0_-2rem_1rem_-2rem,inset_0_2rem_1rem_-2rem]
            '>
            {children}
        </div>
    )
}

export default HighlightMobileContent
