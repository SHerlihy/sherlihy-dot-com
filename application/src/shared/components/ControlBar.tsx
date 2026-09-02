import useIsDesktop from "../hooks/useIsDesktop";

import { useContext } from "react";
import { BackIcon, MenuIcon } from "../icons";
import { NavContext } from "../context/NavContext";
import CopyButton from "../../features/copyFeedback/CopyButton";
import { Link } from "@tanstack/react-router";

const phoneId = crypto.randomUUID();
const emailId = crypto.randomUUID();

function ControlBar() {
  const { isNav, toggleIsNav } = useContext(NavContext);
  return (
    <>
      <section className="">
        <div
          className="
absolute left-0 top-0
"
        >
          <div
            className="
absolute
rotate-45
-translate-x-1/2
-translate-y-1/2
h-32
w-32
border-r-1
bg-[Canvas]
"
          />
        </div>
        <button
          className={`
z-1
p-4
hover:cursor-pointer`}
          onClick={() => toggleIsNav()}
        >
          {isNav && <BackIcon />}
          {!isNav && <MenuIcon />}
        </button>
        <ContactInfo style={``} />
      </section>
      <hr />
    </>
  );
}

function ContactInfo({ style }: { style: string }) {
  const isDesktop = useIsDesktop();
  return (
    <section
      className={`
${style}`}
    >
      {isDesktop && <ContactInfoDesktop />}
      {!isDesktop && <ContactInfoMobile />}
    </section>
  );
}

const PHONE_NO = "+44 7354430588";
const EMAIL = "steven_herlihy@yahoo.com";
const LLM_LEARNING = "https://d2gru0zoilocfa.cloudfront.net/";

function ContactInfoDesktop() {
  return (
    <div className={`flex-1 flex justify-center`}>
      <p>{PHONE_NO}&nbsp;</p>
      <CopyButton id={phoneId} content={PHONE_NO} />
      <p>&nbsp;|&nbsp;</p>
      <p>{EMAIL}&nbsp;</p>
      <CopyButton id={emailId} content={EMAIL} />
      <p>&nbsp;|&nbsp;</p>
      <a href={LLM_LEARNING} target="_blank" rel="noopener noreferrer">
        LLM Learning
      </a>
      <p>&nbsp;|&nbsp;</p>
      <Link
        to="/observe"
        search={() => {
          return {
            deselected: 0,
          };
        }}
      >
        Observe
      </Link>
    </div>
  );
}

function ContactInfoMobile() {
  return (
    <div className={`grid gap-1 grid-cols-5 grid-rows-2`}>
      <p className={`text-right row-start-1 row-end-2 col-start-1 col-end-5`}>
        {PHONE_NO}
      </p>
      <p className={`row-start-1 row-end-2 col-start-5 col-end-6`}>
        <CopyButton id={phoneId} content={PHONE_NO} />
      </p>
      <p className={`text-right row-start-2 row-end-3 col-start-1 col-end-5`}>
        {EMAIL}
      </p>
      <p className={`row-start-2 row-end-3 col-start-5 col-end-6`}>
        <CopyButton id={emailId} content={EMAIL} />
      </p>
      <div
        className={`flex justify-center row-start-3 row-end-4 col-start-1 col-end-6`}
      >
        <a href={LLM_LEARNING} target="_blank" rel="noopener noreferrer">
          LLM Learning
        </a>
      </div>
    </div>
  );
}

export default ControlBar;
