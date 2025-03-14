import FeatureLayout from "./layouts/FeatureLayout.tsx"
import highlightCss from "./Highlight.module.css"
import authHighlightCss from "./AuthHighlight.module.css"
import useIsDesktop from "../shared/hooks/useIsDesktop.tsx"
import HighlightDesktopLayout from "../shared/components/HighlightDesktopLayout.tsx"
import HighlightMobileLayout from "../shared/components/HighlightMobileLayout.tsx"

// .container_image {
//     position: relative;
//     height: 200px;
//     width: 200px;
// }
const AuthHighlightImg = () => {
    return (
            <div className={`h-full w-1/2 relative`}>
                <img src="/authService/robo3.png" className={`${highlightCss.img} ${authHighlightCss.queue_up3}`} />
                <img src="/authService/robo2.png" className={`${highlightCss.img} ${authHighlightCss.queue_up2}`} />
                <img src="/authService/robo1.png" className={`${highlightCss.img} ${authHighlightCss.queue_up1}`} />
                <img src="/authService/boop3.png" className={`${highlightCss.img} ${authHighlightCss.talk3}`} />
                <img src="/authService/boop2.png" className={`${highlightCss.img} ${authHighlightCss.talk2}`} />
                <img src="/authService/notAToaster.png" className={`${highlightCss.img} ${authHighlightCss.talk1}`} />
                <img src="/authService/queueBarrier.png" className={`${highlightCss.img}`} />
            </div>
    )
}


const AuthServiceHighlight = () => {
    const isDesktop = useIsDesktop()

    const paragraphs = [
        "Using Go v1.22 and only the standard http package, I created a backend REST service to handle authentication requests.",
        "I had previous experience creating Go backend services using the GoFiber framework, however, on discovering the standard http package was updated I wanted to experience and use the updated package.",
        "Further to the backend service, I also created a MySQL database to store the authenication data."
    ]

    return (
        <div className={`
p-6
${!isDesktop && 'w-full h-full flex flex-col'}
`}>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <AuthHighlightImg />
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <AuthHighlightImg />
                </HighlightMobileLayout>
            }
        </div>
    )
}

export default AuthServiceHighlight
