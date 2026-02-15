import useIsDesktop from "../../shared/hooks/useIsDesktop"

import velmaHighlightCss from "./VelmaModeHighlight.module.css"

import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"

const VelmaImages = () => {
    return (
        <span className="grid grid-cols-1 grid-rows-1">
            <img
                src="/velmaMode/velmaGlasses.png"
                className={`z-3 col-span-full row-span-full ${velmaHighlightCss.glasses_on}`}
            />
            <img
                src="/velmaMode/velmaNoGlasses.png"
                className={`z-2 col-span-full row-span-full ${velmaHighlightCss.mask} ${velmaHighlightCss.mask_up}`}
            />
            <img
                src="/velmaMode/velmaNoGlasses.png"
                className={`z-1 col-span-full row-span-full ${velmaHighlightCss.blur_in}`}
            />
        </span>
    )
}

const Content = () => {
    return (
        <>
            <p>
                The core idea of this project was to provide users with the control to change the size of text and at the same time respect the existing layout of the applications the wrapping component is used in.
            </p>
            &nbsp;
            <p>
                The application uses a custom hook and the react context API to provide and update the user specified magnification for only the components wrapped in the 'Velma Mode' component.
            </p>
            &nbsp;
            <p>
                As the project has grown it's become more important to clearly explore and document the desired user experience which has led to creating design decision documents inside the project.
            </p>
        </>
    )
}

const VelmaModeHighlight = () => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <HighlightDesktopLayout
                image={<VelmaImages />}
                content={<Content />}
            />
        )
    }

    return (
        <HighlightMobileLayout
            image={<VelmaImages />}
            content={<Content />}
        />
    )
}

export default VelmaModeHighlight
