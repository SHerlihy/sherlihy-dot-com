import highlightCss from "./Highlight.module.css"
import velmaHighlightCss from "./VelmaModeHighlight.module.css"

const VelmaModeHighlight = () => {
    return (
        <>
            <div>
            <div className={`${highlightCss.container_image}`}>
                <img 
                    src="/velmaMode/velmaNoGlasses.png" 
                    className={`${highlightCss.img} ${velmaHighlightCss.blur}`}
                />
                <img 
                    src="/velmaMode/velmaNoGlasses.png" 
                    className={`${highlightCss.img} ${velmaHighlightCss.mask} ${velmaHighlightCss.blur_up}`}
                />
                <img 
                    src="/velmaMode/velmaGlasses.png" 
                    className={`${highlightCss.img} ${velmaHighlightCss.move_up}`}
                />
            </div>
            </div>
            <div className={`${highlightCss.container_content}`}>
            <p >
                The core idea of this project was to provide users with the control to change the size of text and at the same time respect the existing layout of the applications the wrapping component is used in.
            </p>
                &nbsp;
                <p>
                    The application uses a custom hook and the react context API to provide and update the user specified magnification for only the components wrapped in the "Velma Mode" component.
                </p>
                &nbsp;
                <p>
                    As the project has grown it's become more important to clearly explore and document the desired user experience which has led to creating design decision documents inside the project.
                </p>
            </div>
        </>
    )
}

export default VelmaModeHighlight
