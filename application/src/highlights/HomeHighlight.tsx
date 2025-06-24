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
                Hello, I'm a web developer currently studying for my AWS DevOps Engineer Professional certification.
            </p>
            &nbsp;
            <p>
                I used to work as a Front End Web Developer and over the past two years I have:
            </p>
            &nbsp;
            <ul className="list-disc">
                <li>
                    Improved my algorithm design skills.
                </li>
                <li>
                    Joined a monthly software meetup "Software Crafters Cambridge" because I enjoy working with other developers and discussing software topics.
                </li>
                <li>
                    Earned my AWS Solutions Architect Associate certification.
                </li>
                <li>
                    Learned how to use Next.js for full stack development.
                </li>
                <li>
                    Learned how to use React Native through the Meta course on Coursera.
                </li>
            </ul>
        </>
    )
}

export default HomeHighlight
