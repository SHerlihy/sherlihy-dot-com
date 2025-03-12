import HomeHighlightCss from "./HomeHighlight.module.css"
import highlightCss from "./Highlight.module.css"

const HomeHighlight = () => {
    return (
    <>
        <div className={`${HomeHighlightCss.container_padding}`}>
        <div className={`${HomeHighlightCss.profile_img_container}`}>
            <div className={`${HomeHighlightCss.constrained}`}>
                <img src="/sherlihy.png" className={`${HomeHighlightCss.img}`}/>
            </div>
        </div>
        </div>
            <div className={`${highlightCss.container_content}`}>
            <p>
                Welcome, here I reflect on projects I have worked on.
            </p>
            </div>
    </>
    )
}

export default HomeHighlight
