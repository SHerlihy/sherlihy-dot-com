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
            <p>
                    Thanks to my previous experience using AWS to provision infrastructure, I was already familiar with key services such as EC2, S3 and RDS and this provided a significant foundation of knowledge and confidence making earning my Cloud Practitioner certifiaction an enjoyable journey.
            </p>
                &nbsp;
                <p>
                     I believe the knowledge I have gained on managing spending will be of most value in the future. Before gaining my certification I used Cost and Usage to investigate issues with spending in a reactive manner but now I feel much more confident to predict costs and use services to help me forecast spending to prevent overspending.
                </p>
            </div>
    </>
    )
}

export default CertifiedPractionerHighlight
