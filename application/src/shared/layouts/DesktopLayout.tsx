import { ReactNode, useContext } from "react";
import { NavContext } from "../context/NavContext";
import ControlBar from "../components/ControlBar";

function DesktopLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const { isNav } = useContext(NavContext)
    return (
        <main className={`w-full h-full p-10`}>
            <div>
                <ControlBar />
            </div>
            <hr className={`pb-4`} />
            <article>
                {isNav && navigate}
                {!isNav && content}
                <hr />
            </article>
        </main>
    )
}

export default DesktopLayout
