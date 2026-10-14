import css from "./SherlihyImage.module.css"

const SherlihyImage = ({ height = "150px", width = "150px" }) => {
    const imgStyles = {
        "maxHeight": height,
        "minHeight": height,

        "maxWidth": width,
        "minWidth": width,
    }
    return (
        <span className={`${css.profile_img_container}`} style={imgStyles}>
            <span className={`${css.constrained}`}>
                <img src="/sherlihy.png" className={`${css.img}`} style={imgStyles} />
            </span>
        </span>
    )
}

export default SherlihyImage
