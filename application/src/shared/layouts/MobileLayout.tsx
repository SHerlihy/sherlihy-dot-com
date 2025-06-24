import { ReactNode, useState } from "react";
import ContactInfo from "../components/ContactInfo";

function MobileLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const [isNav, setIsNav] = useState(false)

    return (
        <main className={`h-full flex flex-col`}>
            <div className={`grow-1 grid gap-4 grid-rows-9 min-h-0 min-w-0`}>
                <div className={`row-start-1 row-end-2`}>
                    <ContactInfo />
                    <hr />
                </div>
                <div className={`flex flex-col row-start-2 row-end-9`}>
                    {isNav && navigate}
                    {!isNav && content}
                    <hr />
                </div>
                <div className={`flex justify-center row-start-9 row-end-10`}>
                    <button
                        className={`p-4 hover:cursor-pointer`}
                        onClick={() => setIsNav((prev) => !prev)}>
                        {isNav && <p>View</p>}
                        {!isNav && <p>Navigate</p>}
                    </button>
                </div>
            </div>
        </main>
    )
}

export default MobileLayout
