import HighlightDesktopLayout from "../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../shared/components/HighlightMobileLayout"
import useIsDesktop from "../shared/hooks/useIsDesktop"
import highlightCss from "./Highlight.module.css"
import i2HighlightCss from "./I2GroupHighlight.module.css"

const I2Images = () => {
    return (
        <>
            <img src="/i2/spiderweb.png" className={`${highlightCss.img}`} />
            <img src="/i2/crimes1.png" className={`${highlightCss.img} ${i2HighlightCss.drop_bounce1}`} />
            <img src="/i2/crimes2.png" className={`${highlightCss.img} ${i2HighlightCss.drop_bounce2}`} />
            <img src="/i2/crimes3.png" className={`${highlightCss.img} ${i2HighlightCss.drop_bounce3}`} />
        </>
    )
}

const I2GroupHighlight = () => {
    const isDesktop = useIsDesktop()

    const paragraphs = [
        "Imagine that scene from Minority Report where Tom Cruise is looking at footage of 'future crimes' but instead of it being a 3D hologram it's 2D, on a browser and shows text.",
        "The application was able to chart up to 500,000 nodes and edges. Performance was a key concern and as a front end developer I was responsible for designing and implementing performant optimistic changes on the chart nodes and edges.",
        "Due to performance being a key concern much of the codebase was highly mutable and we made extensive use of Typescript to help manage the added complexity of the mutable data structures."
    ]

    return (
        <div className={`
p-6
${!isDesktop && 'w-full h-full flex flex-col'}
`}>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <I2Images />
                    </div>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <I2Images />
                    </div>
                </HighlightMobileLayout>
            }
        </div>
    )
    return (
        <>
            <div className={`${highlightCss.container_standout}`}>
                <div className={`${highlightCss.container_image}`}>
                    <img src="/i2/spiderweb.png" className={`${highlightCss.img}`} />
                    <img src="/i2/crimes1.png" className={`${highlightCss.img} ${i2HighlightCss.drop_bounce1}`} />
                    <img src="/i2/crimes2.png" className={`${highlightCss.img} ${i2HighlightCss.drop_bounce2}`} />
                    <img src="/i2/crimes3.png" className={`${highlightCss.img} ${i2HighlightCss.drop_bounce3}`} />
                </div>
            </div>
            <div className={`${highlightCss.container_content}`}>
                <p>
                    Imagine that scene from Minority Report where Tom Cruise is looking at footage of "future crimes" but instead of it being a 3D hologram it's 2D, on a browser and shows text.
                </p>
                &nbsp;
                <p>
                    The application was able to chart up to 500,000 nodes and edges. Performance was a key concern and as a front end developer I was responsible for designing and implementing performant optimistic changes on the chart nodes and edges.
                </p>
                &nbsp;
                <p>
                    Due to performance being a key concern much of the codebase was highly mutable and we made extensive use of Typescript to help manage the added complexity of the mutable data structures.
                </p>
            </div>
        </>
    )
}

export default I2GroupHighlight
