import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const Content = () => {
    return (
        <>
            <p>
                Every month I meet up with fellow software engineers where we improve our engineering capabilities through collaborative practice, open discussions and presentations.
            </p>
            &nbsp;
            <p>
                I really enjoy being able to work with fellow engineers. My favourite activities are the Architecture Katas where we form teams of roughly five and work together to plan a software architecture that will satisfy a given brief. The last kata was to create a highly scalable architecture for a growing chain of restaurants that require AI to be used by customers to order their meals.
            </p>
            &nbsp;
            <p>
                Aside from Architecture Katas, common events include Test Driven Development (TDD) Katas, Lightning Talks and Unconferences. The assortment of events allows me to broaden my perspectives on software engineering topics and hone my engineering skills in a fun and friendly environment.
            </p>
        </>
    )
}

const SoftwareCraftersHighlight = () => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <HighlightDesktopLayout
                image={<img src="/scc/scc.webp" />}
                content={<Content />}
            />
        )
    }

    return (
        <HighlightMobileLayout
            image={<img src="/scc/scc.webp" />}
            content={<Content />}
        />
    )
}

export default SoftwareCraftersHighlight
