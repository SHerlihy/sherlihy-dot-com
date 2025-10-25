import useIsDesktop from "../hooks/useIsDesktop"

import { useContext } from "react";
import { BackIcon, CopyIcon, MenuIcon } from "../icons";
import { NavContext } from "../context/NavContext";

function ControlBar() {
    const { isNav, toggleIsNav } = useContext(NavContext)
    return (
        <section className={`p-1`}>
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
        <section className={`
${style}`}>
            {isDesktop && <ContactInfoDesktop />}
            {!isDesktop && <ContactInfoMobile />}
        </section>
    )
}

const PHONE_NO = "+44 7354430588"
const EMAIL = "steven_herlihy@yahoo.com"

function ContactInfoDesktop() {
    return (
        <div className={`flex-1 flex justify-end`}>
            <p>{PHONE_NO}&nbsp;</p>
            <CopyButton content={PHONE_NO} />
            <p>&nbsp;|&nbsp;</p>
            <p>{EMAIL}&nbsp;</p>
            <CopyButton content={EMAIL} />
        </div>
    )
}

function ContactInfoMobile() {
    return (
        <div className={`flex-1 grid gap-1 grid-cols-5 grid-rows-2`}>
            <p className={`text-right row-start-1 row-end-2 col-start-1 col-end-5`}>
                {PHONE_NO}
            </p>
            <p className={`row-start-1 row-end-2 col-start-5 col-end-6`}>
                <CopyButton content={PHONE_NO} />
            </p>
            <p className={`text-right row-start-2 row-end-3 col-start-1 col-end-5`}>
                {EMAIL}
            </p>
            <p className={`row-start-2 row-end-3 col-start-5 col-end-6`}>
                <CopyButton content={EMAIL} />
            </p>
        </div>
    )
}

function CopyButton({ content }: { content: string }) {
    function updateClipboard() {
        navigator.clipboard.writeText(content).then(
            () => {
                /* clipboard successfully set */
            },
            () => {
                /* clipboard write failed */
            },
        );
    }

    return (
        <button className={`cursor-pointer`}
            onClick={() => updateClipboard()}
        >
            <CopyIcon />
        </button>
    )
}

export default ControlBar
