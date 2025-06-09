import React, { ReactNode } from 'react'

const HighlightMobileContent = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className='w-full h-7/12 flex flex-col'>
            <span />
            <div className='h-full p-4 overflow-scroll shadow-[inset_0_-2rem_1rem_-2rem,inset_0_2rem_1rem_-2rem]
            '>
                {children}
            </div>
        </div>
    )
}

export default HighlightMobileContent
