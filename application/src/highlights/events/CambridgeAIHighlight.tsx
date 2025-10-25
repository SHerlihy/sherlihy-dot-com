import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const paragraphs = [
    "I find Cambridge AI a fun event to attend because I enjoy learning what people are using AI to achieve and discussing the challenges in providing value with the technologies available.",
    "With my background I\'m enjoy considering how users will interact with AI applications, focusing on how the user can retain their existing authority when provided AI tools that can be used as a source of authority."
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
