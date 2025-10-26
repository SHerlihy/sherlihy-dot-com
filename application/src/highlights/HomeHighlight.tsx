import HighlightDesktopImage from "../shared/components/HighlightDesktopImage"
import HighlightMobileContent from "../shared/components/HighlightMobileContent"
import HighlightMobileImage from "../shared/components/HighlightMobileImage"
import useIsDesktop from "../shared/hooks/useIsDesktop"
import SherlihyImage from "./SherlihyImage"

const HomeHighlight = () => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <div>
                <HighlightDesktopImage>
                    <SherlihyImage />
                </HighlightDesktopImage>
                <Content />
            </div>
        )
    }

    return (
        <>
            <HighlightMobileImage>
                <SherlihyImage />
            </HighlightMobileImage>
            <span className='pb-4' />
            <HighlightMobileContent>
                <Content />
            </HighlightMobileContent>
        </>
    )
}


const Content = () => {
    return (
        <>
            <p>
                Welcome to my website!
            </p>
            &nbsp;
            <p>
                Here you’ll find events, projects and hobbies that I enjoy so you can get to know me better.
            </p>
            &nbsp;
            <p>
                I spend the majority of my time helping Amazon improve their Alexa AI model but I also find time to practice my web development skills.
            </p>
            &nbsp;
            <p>
                I’m currently studying for my AWS DevOps Professional certification and examples of my DevOps work can be found here &nbsp;
                <a
                    href={"https://github.com/SHerlihy/cantrill-devops"}>
                    cantrill-devops
                </a>.
            </p>
        </>
    )
}

export default HomeHighlight
