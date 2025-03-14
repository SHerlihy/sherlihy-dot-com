import { ReactNode } from "react"

const HighlightMobileLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    return (
        <>
            <div className='h-4/12 flex justify-center items-center'>
                {children}
            </div>
            <span className='h-1/12' />
            <div className='w-full h-7/12 flex flex-col'>
                <span />
                <div className='h-full p-4 overflow-scroll shadow-[inset_0_-2rem_1rem_-2rem,inset_0_2rem_1rem_-2rem]
            '>
                    {paragraphs.map((para, idx) => <div key={idx}>
                        <p>{para}</p>
                        &nbsp;
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default HighlightMobileLayout
