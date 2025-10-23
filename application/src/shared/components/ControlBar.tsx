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
                {isDesktop && <ContactInfoDesktop/>}
                {!isDesktop && <ContactInfoMobile/>}
            </div>
        </div>
    )
}

const PHONE_NO = "+44 7354430588"
const EMAIL = "steven_herlihy@yahoo.com"

function ContactInfoDesktop() {
    return (
        <div>
            <p>{PHONE_NO}</p>
            <p>&nbsp;|&nbsp;</p>
            <p>{EMAIL}</p>
        </div>
    )
}

function ContactInfoMobile() {
    return (
        <div className={`grid grid-cols-2 grid-rows-2`}>
            <p className={`row-start-1 row-end-2 col-start-1 col-end-2`}>
                {PHONE_NO}
            </p>
            <p className={`row-start-1 row-end-2 col-start-2 col-end-3`}>
                copy
            </p>
            <p className={`row-start-2 row-end-3 col-start-1 col-end-2`}>
                {EMAIL}
            </p>
            <p className={`row-start-2 row-end-3 col-start-2 col-end-3`}>
                copy
            </p>
        </div>
    )
}

export default ControlBar
