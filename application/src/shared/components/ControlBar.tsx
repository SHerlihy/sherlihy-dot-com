import useIsDesktop from "../hooks/useIsDesktop"

import { useContext } from "react";
import { BackIcon, MenuIcon } from "../icons";
import { NavContext } from "../context/NavContext";

function ControlBar() {
    const { isNav, toggleIsNav } = useContext(NavContext)
    return (
        <section>
            <div className={`flex-1 grid grid-cols-4`}>
                <div className={`col-start-1 col-end-2`}>
                    <button
                        className={`col-start-1 col-end-2
                        p-4 hover:cursor-pointer`}
                        onClick={() => toggleIsNav()}>
                        {isNav && <BackIcon />}
                        {!isNav && <MenuIcon />}
                    </button>
                </div>
                <ContactInfo style={`col-start-2 col-end-5`} />
            </div>
        </section>
    )
}

function ContactInfo({ style }: { style: string }) {
    const isDesktop = useIsDesktop()
    return (
        <div className={`flex justify-center items-center
${style}
`}>
            <div
                className={`
flex
${isDesktop ? 'flex-row' : 'flex-col'}
`}
            >
                <p>+44 7354430588</p>
                {isDesktop && <p>&nbsp;|&nbsp;</p>}
                <p> steven_herlihy@yahoo.com</p>
            </div>
        </div>
    )
}

export default ControlBar
