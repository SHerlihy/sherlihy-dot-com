import { ReactNode } from "react";

function DesktopLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    return (
        <div className={`
grow-1
            grid grid-cols-6
`
        }>
            <div className={`col-start-1 col-end-5
pr-4 flex flex-col justify-center align-center
`}>
                {content}
            </div>
            <div className={`col-start-5 col-end-7
pl-4 border-l
`}>
                {navigate}
            </div>
        </div>
    )
}

export default DesktopLayout
