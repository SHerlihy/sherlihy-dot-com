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
    "Here I get hands on working with a wide range of other developers to improve in every area of software engineering. It's really fun meeting other developers and finding out how diverse our skillsets and perspectives are."
]

const SoftwareCraftersHighlight = () => {
    const isDesktop = useIsDesktop()


    // return (
    //     <>
    //         {isDesktop &&
    //             <HighlightDesktopLayout paragraphs={paragraphs}>
    //                 <span />
    //             </HighlightDesktopLayout>
    //         }
    //         {!isDesktop &&
    //             <HighlightMobileLayout paragraphs={paragraphs}>
    //                 <span />
    //             </HighlightMobileLayout>
    //         }
    //     </>
    // )
    return (
        <>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <SCCImage/>
                    </div>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <div className="h-30 w-full relative">
                        <SCCImage/>
                    </div>
                </HighlightMobileLayout>
            }
        </>
    )
}

export default SoftwareCraftersHighlight
