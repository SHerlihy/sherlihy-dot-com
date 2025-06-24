import { ReactNode } from "react";
import ContactInfo from "../components/ContactInfo";

function DesktopLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    return (
        <main className={`flex flex-col w-full h-full p-10`}>
            <ContactInfo />
            <hr className={`pb-4`} />
            <div className={`
grow-1
            grid grid-cols-6
`
            }>
                <div className={`col-start-1 col-end-6
p-[15%] flex flex-col justify-center align-center
`}>
                    {content}
                </div>
                <div className={`col-start-6 col-end-7
pl-4 border-l flex flex-col
`}>
                    {navigate}
                </div>
            </div>
        </main>
    )
}

export default DesktopLayout
