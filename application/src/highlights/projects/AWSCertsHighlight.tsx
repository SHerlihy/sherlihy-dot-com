import useIsDesktop from '../../shared/hooks/useIsDesktop'

import CoupleContainer from '../../shared/layouts/CoupleContainer'
import HighlightDesktopLayout from '../../shared/components/HighlightDesktopLayout'
import HighlightMobileLayout from '../../shared/components/HighlightMobileLayout'

const PractitionerImg = () => {
    return (
        <a href="https://www.credly.com/badges/64a19493-6171-4c41-9b45-fe86e31d16f6/public_url">
            <img
                src="/awsCerts/aws-certified-cloud-practitioner.png"
            />
        </a>
    )
}

const ArchitectImg = () => {
    return (
        <a href="https://www.credly.com/badges/ee291c64-d1af-4b2c-9757-e0768efb4575/public_url">
            <img
                src="/awsCerts/aws-certified-solutions-architect-associate.png"
            />
        </a>
    )
}

const AWSCertsHighlight = () => {
    const isDesktop = useIsDesktop()

    const paragraphs = [
        "Unlike the Cloud Practitioner exam, my previous experience of provisioning AWS infrastructure was not broad enough to provide the needed foundation to meet the new challanges required for the Solutions Architect exam.",
        "To overcome my lack of foundational experience, I leveraged the use of guided practices such as Labs and AWS Cloud Quest to remember, reinforce and retain the new fundemental concepts to explore new topics the Solutions Architct exam covers. After gaining this needed foundational expereince I was able to engauge in tech deep dives and use practice exams to successfully prepare for the Solutions Architect exam just as I had done for the Cloud Practioner exam.",
        "Though I am proud of my AWS certifications, I'm excited to grow my existing knowledge of AWS services to meet project demands but also continually improve how I plan and provision infrastructure to include fellow developers using collaborative and scalable practices."
    ]

    return (
        <>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />
                    </div>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <div className="h-30 w-full relative">
                        <CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />
                    </div>
                </HighlightMobileLayout>
            }
        </>
    )
}

export default AWSCertsHighlight
