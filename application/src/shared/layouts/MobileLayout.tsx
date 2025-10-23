import { ReactNode, useContext } from "react";
import ControlBar from "../components/ControlBar";
import { NavContext } from "../context/NavContext";

function MobileLayout({ content, navigate }: { content: ReactNode, navigate: ReactNode }) {
    const { isNav } = useContext(NavContext)

    return (
        <main className={`h-full flex flex-col`}>
            <div className={`grow-1 grid gap-4 grid-rows-9 min-h-0 min-w-0`}>
                <div className={`flex justify-center row-start-1 row-end-2`}>
                    <ControlBar />
                </div>
                <div className={`flex flex-col row-start-2 row-end-10`}>
                    {isNav && navigate}
                    {!isNav && content}
                    <hr />
                </div>
            </div>
        </main>
    )
}

export default MobileLayout
