import { ReactNode, useState } from "react";

function MobileLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const [isNav, setIsNav] = useState(false)

    return (
        <>
            {isNav && navigate}
            {!isNav && content}
            <button onClick={() => setIsNav((prev) => !prev)}>
                {isNav && <p>View</p>}
                {!isNav && <p>Navigate</p>}
            </button>
        </>
    )
}

export default MobileLayout
