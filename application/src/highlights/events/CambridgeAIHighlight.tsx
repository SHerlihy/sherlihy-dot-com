import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const paragraphs = [
"AI Cambridge is a really fun way for me to learn about the latest research, start-ups and scale-ups based on AI.",
"I really enjoy the presentations given by people leading AI projects and businesses. Their applications of the technology are always fascinating and the discussions following, usually around scale up challenges and diversifying their product applications, are always a fun way to spend an evening. For example, projects range from diagnosing unhealthy cells from microscopy images to automating the production of sterilised insects for pest control."
]

const CambridgeAIHighlight = () => {
    const isDesktop = useIsDesktop()


    return (
        <>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
<img src="/camAI/camAI.webp"/>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
<img src="/camAI/camAI.webp"/>
                </HighlightMobileLayout>
            }
        </>
    )
}

export default CambridgeAIHighlight
