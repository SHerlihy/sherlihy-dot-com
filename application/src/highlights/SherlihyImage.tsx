import HomeHighlightCss from "./HomeHighlight.module.css"

const SherlihyImage = ({ height = "150px", width = "150px" }) => {
    const imgStyles = {
        "maxHeight": height,
        "minHeight": height,

        "maxWidth": width,
        "minWidth": width,
    }
    return (
        <div className={`${HomeHighlightCss.profile_img_container}`} style={imgStyles}>
            <div className={`${HomeHighlightCss.constrained}`}>
                <img src="/sherlihy.png" className={`${HomeHighlightCss.img}`} style={imgStyles} />
            </div>
        </div>
    )
}

export default SherlihyImage
