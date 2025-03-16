import HomeHighlightCss from "./HomeHighlight.module.css"

const SherlihyImage = ({ height = "150px", width = "150px" }: { height: string, width: string }) => {
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

//.img {
//    min-height: 150px;
//    max-height: 150px;
//    min-width: 150px;
//    max-width: 150px;
//    animation: 1s ease-out 0s 1 slideInUp;
//}
//
//.container_padding {
//    padding: 1rem;
//}
//
//.profile_img_container{
//    position: relative;
//
//    display: flex;
//    flex-direction: column-reverse;
//
//    min-height: 150px;
//    max-height: 150px;
//    min-width: 150px;
//    max-width: 150px;
//    background-color: rgba(128, 128, 160, 0.7);
//
//    border: 10px solid rgba(60, 30, 60, 1);
//    border-radius: 50%;
//}
//
//.constrained {
//    position: absolute;
//
//    display: flex;
//    flex-direction: column-reverse;
//    align-items: center;
//
//    min-height: 180px;
//    max-height: 180px;
//    min-width: 130px;
//    max-width: 130px;
//
//    overflow: hidden;
//
//    border-radius: 0 0 450px 450px;
//}
