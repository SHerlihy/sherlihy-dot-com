import { ReactNode, useContext } from "react";
import ControlBar from "../components/ControlBar";
import { NavContext } from "../context/NavContext";

function MobileLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const { isNav } = useContext(NavContext)

    return (
        <main className={`flex flex-col w-full h-full overflow-hidden`}>
            <div>
                <ControlBar />
            </div>
            <hr className={`pb-4`} />
            <article className={`flex flex-col flex-1 overflow-hidden`}>
                {isNav && navigate}
                {!isNav && content}
                <hr />
            </article>
        </main>
    )
}

export default MobileLayout
