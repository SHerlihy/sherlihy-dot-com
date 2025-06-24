import { ReactNode, useState } from "react";
import ContactInfo from "../components/ContactInfo";

function MobileLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const [isNav, setIsNav] = useState(false)

    return (
        <main className={`flex flex-col w-full h-full`}>
            <div className={`py-4 flex justify-center`}>
                <ContactInfo />
            </div>
            <hr className={`pb-4`} />
            {isNav && navigate}
            {!isNav && content}
            <hr />
            <button
                className={`p-4 hover:cursor-pointer`}
                onClick={() => setIsNav((prev) => !prev)}>
                {isNav && <p>View</p>}
                {!isNav && <p>Navigate</p>}
            </button>
        </main>
    )
}

export default MobileLayout
