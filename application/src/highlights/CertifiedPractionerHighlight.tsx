import highlightCss from "./Highlight.module.css"

const CertifiedPractionerHighlight = () => {
    return (
        <>
            <div>
            <div className={`${highlightCss.container_image}`}>
                    <a href="https://www.credly.com/badges/64a19493-6171-4c41-9b45-fe86e31d16f6/public_url">
                <img
                    className={`${highlightCss.img}`}
                    src="/awsCerts/aws-certified-cloud-practitioner.png"
                />
                </a>
            </div>
            </div>
            <div className={`${highlightCss.container_content}`}>
            <p >
                Cloud prac sell
            </p>
                &nbsp;
                <p>
                    Personal reflection
                </p>
            </div>
    </>
    )
}

export default CertifiedPractionerHighlight
