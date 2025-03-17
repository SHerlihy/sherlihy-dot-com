import useIsDesktop from "../../shared/hooks/useIsDesktop"

import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import SherlihyImage from "../SherlihyImage"

const SherlihyHighlight = () => {
    const isDesktop = useIsDesktop()

    const paragraphs = [
        "As my personal website is a project that will be in continuous development, I decided to create a continuous deployment pipeline. However, I haven't implimented a test framework or continuous integration as I argue the simplicity of the website does not yet require testing.",
        "What excites me the most about my website is the diagrams as code approach to understanding the deployment design. I quickly found that even for a basic design the details were difficult to memorise; so I commited to recording the design as diagrams. Initially, I was concerned with exposing design details from a security aspect, however, it is best practice to prioritise feedback over obfuscation."
    ]

    return (
        <div className={`
p-6
${!isDesktop && 'w-full h-full flex flex-col'}
`}>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <div className="h-40 w-40 relative">
                        <SherlihyImage />
                    </div>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <SherlihyImage />
                    </div>
                </HighlightMobileLayout>
            }
        </div>
    )
}

export default SherlihyHighlight
