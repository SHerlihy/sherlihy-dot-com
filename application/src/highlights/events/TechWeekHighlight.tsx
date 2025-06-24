import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const paragraphs = [
    "Although I regularly attend AI talks the tech week AI talks not only focused on application development but also governance in the AI sector which highlighted interesting issues that were new to me. The quantum computing talks were a fun update on the state of quantum computing and the near future applications for the technology. Being educated in materials science I was previously aware of quantum computing so now being a developer and having the developer perspective on the technology was fun.",
]

const TechWeekHighlight = () => {
    const isDesktop = useIsDesktop()


    return (
        <>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <span />
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <span />
                </HighlightMobileLayout>
            }
        </>
    )
}

export default TechWeekHighlight
