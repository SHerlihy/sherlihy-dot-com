import useIsDesktop from '../../shared/hooks/useIsDesktop'

import CoupleContainer from '../../shared/layouts/CoupleContainer'
import HighlightMobileImage from '../../shared/components/HighlightMobileImage'
import HighlightMobileContent from '../../shared/components/HighlightMobileContent'
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

    if (isDesktop) {
        return (
            <HighlightDesktopLayout
                image={<CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />}
                content={<Content />}
            />
        )
    }

    return (
        <HighlightMobileLayout
            image={<CoupleContainer TlImg={ArchitectImg} BrImg={PractitionerImg} />}
            content={<Content />}
        />
    )
}

const Content = () => {
    return (
        <>
            <p>
                I really enjoy using AWS to provision cloud infrastructure. It’s a service that affords me the capability to share any software I develop with the world and this is the reason why I started as a  software developer.
            </p>
            &nbsp;
            <p>
                I’m currently studying and practicing for my AWS DevOps Professional certification. I’ve chosen the DevOps certification because I’m a huge fan of DevOps practices. I find it really cool to create a tool/pipeline that enables software to go from being in development to being used by its intended audience with as little friction as possible. Examples of my work can be found here <a href={'https://github.com/SHerlihy/cantrill-devops'}> cantrill-devops </a>.
            </p>
            &nbsp;
            <p>
                I previously earned my AWS Solution Architect Associate certification, which I’m really proud of, and found it very useful in creating infrastructure for my applications. However, as I became more adventurous with my infrastructure practices, I found I wanted more knowledge and this is why I’m currently practicing for the DevOps Professional certification.
            </p>
        </>
    )
}

export default AWSCertsHighlight
