import useIsDesktop from "../../shared/hooks/useIsDesktop.tsx"

import authHighlightCss from "./AuthHighlight.module.css"

import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout.tsx"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout.tsx"
import HighlightDesktopImage from "../../shared/components/HighlightDesktopImage.tsx"

const AuthHighlightImg = () => {
    return (
        <span className="grid grid-cols-1 grid-rows-1">
            <img src="/authService/robo3.png" className={`z-1 col-span-full row-span-full  ${authHighlightCss.queue_up3}`} />
            <img src="/authService/boop3.png" className={`z-1 col-span-full row-span-full  ${authHighlightCss.talk3}`} />
            <img src="/authService/robo2.png" className={`z-2 col-span-full row-span-full  ${authHighlightCss.queue_up2}`} />
            <img src="/authService/boop2.png" className={`z-2 col-span-full row-span-full  ${authHighlightCss.talk2}`} />
            <img src="/authService/robo1.png" className={`z-3 col-span-full row-span-full  ${authHighlightCss.queue_up1}`} />
            <img src="/authService/notAToaster.png" className={`z-3 col-span-full row-span-full ${authHighlightCss.talk1}`} />
            <img src="/authService/queueBarrier.png" className={`z-4 col-span-full row-span-full`} />
        </span>
    )
}

const Content = () => {
    return (
        <>
            <p>
                Using Go v1.22 and only the standard http package, I created a backend REST service to handle authentication requests.
            </p>
            &nbsp;
            <p>
                I had previous experience creating Go backend services using the GoFiber framework, however, on discovering the standard http package was updated I wanted to experience and use the updated package.
            </p>
            &nbsp;
            <p>
                Further to the backend service, I also created a MySQL database to store the authenication data.
            </p>
        </>
    )
}


const AuthServiceHighlight = () => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <HighlightDesktopLayout
                image={<AuthHighlightImg />}
                content={<Content />}
            />
        )
    }

    return (
        <HighlightMobileLayout
            image={<AuthHighlightImg />}
            content={<Content />}
        />
    )
}

export default AuthServiceHighlight
