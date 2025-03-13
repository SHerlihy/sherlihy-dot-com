import React, { ReactNode } from 'react'
import highlightCss from "./Highlight.module.css"
import CoupleContainer from '../shared/layouts/CoupleContainer'
import FlexDirectionOnDesktop from '../shared/components/FlexDirectionOnDesktop'
import useIsDesktop from '../shared/hooks/useIsDesktop'

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

const DesktopLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    return (
        <div>
            <div className='float-left h-1/3 w-1/3'>
                {children}
            </div>
            {paragraphs.map((para, idx) => <>
                <p key={idx}>{para}</p>
                &nbsp;
            </>)}
        </div>
    )
}

const MobileLayout = ({
    paragraphs,
    children
}: {
    paragraphs: string[],
    children: ReactNode
}) => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='h-2/5'>
                {children}
            </div>
            <div className='overflow-scroll'>
                {paragraphs.map((para, idx) => <>
                    <p key={idx}>{para}</p>
                    &nbsp;
                </>)}
            </div>
        </div>
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
                <DesktopLayout paragraphs={paragraphs}>
                    <CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />
                </DesktopLayout>
            }
            {!isDesktop &&
                <MobileLayout paragraphs={paragraphs}>
                    <CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />
                </MobileLayout>
            }
        </>
    )
    return (
        <FlexDirectionOnDesktop>
            <div className={`${highlightCss.container_image}
${!isDesktop ? "h-1/3 w-1/3" :
                    ""}
`}>
                <CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />
            </div >
            <div className={`${highlightCss.container_content}
${!isDesktop ? "h-2/3 w-full" : ""}
`}>
                <p>
                    Unlike the Cloud Practitioner exam, my previous experience of provisioning AWS infrastructure was not broad enough to provide the needed foundation to meet the new challanges required for the Solutions Architect exam.
                </p>
                &nbsp;
                <p>
                    To overcome my lack of foundational experience, I leveraged the use of guided practices such as Labs and AWS Cloud Quest to remember, reinforce and retain the new fundemental concepts to explore new topics the Solutions Architct exam covers. After gaining this needed foundational expereince I was able to engauge in tech deep dives and use practice exams to successfully prepare for the Solutions Architect exam just as I had done for the Cloud Practioner exam.
                </p>
                &nbsp;
                <p>
                    Though I am proud of my AWS certifications, I'm excited to grow my existing knowledge of AWS services to meet project demands but also continually improve how I plan and provision infrastructure to include fellow developers using collaborative and scalable practices.
                </p>
            </div >

        </FlexDirectionOnDesktop>
    )
}

export default AWSCertsHighlight
