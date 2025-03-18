import useIsDesktop from "../../shared/hooks/useIsDesktop"

import velmaHighlightCss from "./VelmaModeHighlight.module.css"

import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"

const VelmaImages = () => {
    return (
        <>
            <img
                src="/velmaMode/velmaNoGlasses.png"
                className={`absolute ${velmaHighlightCss.blur} ${velmaHighlightCss.pop}`}
            />
            <img
                src="/velmaMode/velmaNoGlasses.png"
                className={`absolute ${velmaHighlightCss.mask} ${velmaHighlightCss.blur_up}`}
            />
            <img
                src="/velmaMode/velmaGlasses.png"
                className={`absolute ${velmaHighlightCss.move_up}`}
            />
        </>
    )
}

const VelmaModeHighlight = () => {
    const isDesktop = useIsDesktop()

    const paragraphs = [
        "The core idea of this project was to provide users with the control to change the size of text and at the same time respect the existing layout of the applications the wrapping component is used in.",
        "The application uses a custom hook and the react context API to provide and update the user specified magnification for only the components wrapped in the 'Velma Mode' component.",
        "As the project has grown it's become more important to clearly explore and document the desired user experience which has led to creating design decision documents inside the project."
    ]

    return (
        <div className={`
p-6
${!isDesktop && 'w-full h-full flex flex-col'}
`}>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <VelmaImages />
                    </div>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <VelmaImages />
                    </div>
                </HighlightMobileLayout>
            }
        </div>
    )
}

export default VelmaModeHighlight
