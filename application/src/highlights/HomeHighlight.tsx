import HomeHighlightCss from "./HomeHighlight.module.css"
import useIsDesktop from "../shared/hooks/useIsDesktop"

const HomeImage = () => {
    return (
        <div className={`${HomeHighlightCss.profile_img_container}`}>
            <div className={`${HomeHighlightCss.constrained}`}>
                <img src="/sherlihy.png" className={`${HomeHighlightCss.img}`} />
            </div>
        </div>
    )
}

const HomeHighlight = () => {
    const isDesktop = useIsDesktop()
    return (
        <div className={`
w-full h-full p-4 flex justify-center items-center
${isDesktop ? "flex-row" : "flex-col"}
`}>
            <HomeImage />
            <span className="p-4" />
            <p>
                Welcome, here I reflect on projects I have worked on.
            </p>
        </div>
    )
}

export default HomeHighlight
