import { ReactNode } from "react"

const HighlightDesktopLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    return (
        <>
            <div className='float-left h-1/3 w-1/3'>
                {children}
            </div>
            {paragraphs.map((para, idx) => <>
                <p key={idx}>{para}</p>
                &nbsp;
            </>)}
        </>
    )
}

export default HighlightDesktopLayout
