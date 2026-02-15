import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const Content = () => {
    return (
        <>
            <p>
                AI Cambridge is a really fun way for me to learn about the latest research, start-ups and scale-ups based on AI.
            </p>
            &nbsp;
            <p>
                I really enjoy the presentations given by people leading AI projects and businesses. Their applications of the technology are always fascinating and the discussions following, usually around scale up challenges and diversifying their product applications, are always a fun way to spend an evening. For example, projects range from diagnosing unhealthy cells from microscopy images to automating the production of sterilised insects for pest control.
            </p>
        </>
    )
}

const CambridgeAIHighlight = () => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <HighlightDesktopLayout
                image={<img src="/camAI/camAI.webp" />}
                content={<Content />}
            />
        )
    }

    return (
        <HighlightMobileLayout
            image={<img src="/camAI/camAI.webp" />}
            content={<Content />}
        />
    )
}

export default CambridgeAIHighlight
