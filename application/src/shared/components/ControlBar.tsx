import useIsDesktop from "../hooks/useIsDesktop"

import { useContext } from "react";
import { BackIcon, CopyIcon, MenuIcon } from "../icons";
import { NavContext } from "../context/NavContext";

// <div className="
// absolute left-0
// border-t-100 border-t-red-950 border-r-100 border-r-transparent
// "/>

function ControlBar() {
    const { isNav, toggleIsNav } = useContext(NavContext)
    return (
        <section className="">
<div className="
absolute left-0
h-28
w-28
bg-[linear-gradient(135deg,rgba(155,55,155,100%)50%,rgba(255,255,255,0)50%)]
"/>
                <button
                    className={`
z-1
p-4
hover:cursor-pointer`}
                    onClick={() => toggleIsNav()}>
                    {isNav && <BackIcon />}
                    {!isNav && <MenuIcon />}
                </button>
            <ContactInfo style={``} />
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
        <div className={`grid gap-1 grid-cols-5 grid-rows-2`}>
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
