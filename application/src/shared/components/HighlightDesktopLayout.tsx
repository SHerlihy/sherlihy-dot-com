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
            <div className='float-left overflow-hidden p-4'>
                {children}
            </div>
            {paragraphs.map((para, idx) => <div key={idx}>
                <p>{para}</p>
                &nbsp;
            </div>)}
        </>
    )
}

export default HighlightDesktopLayout
