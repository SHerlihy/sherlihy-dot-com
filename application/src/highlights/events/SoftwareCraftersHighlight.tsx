import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const SCCImage = () => {
    return (
        <img
            src="/scc/scc.webp"
        />
    )
}

const paragraphs = [
"Every month I meet up with fellow software engineers where we improve our engineering capabilities through collaborative practice, open discussions and presentations.",
"I really enjoy being able to work with fellow engineers. My favourite activities are the Architecture Katas where we form teams of roughly five and work together to plan a software architecture that will satisfy a given brief. The last kata was to create a highly scalable architecture for a growing chain of restaurants that require AI to be used by customers to order their meals.",
"Aside from Architecture Katas, common events include Test Driven Development (TDD) Katas, Lightning Talks and Unconferences. The assortment of events allows me to broaden my perspectives on software engineering topics and hone my engineering skills in a fun and friendly environment."
]

const SoftwareCraftersHighlight = () => {
    const isDesktop = useIsDesktop()

    return (
        <>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                        <SCCImage/>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                        <SCCImage/>
                </HighlightMobileLayout>
            }
        </>
    )
}

export default SoftwareCraftersHighlight
