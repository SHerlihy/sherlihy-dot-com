import i2HighlightCss from "./I2Group.module.css"

import HighlightLayout from "@/shared/layouts/HighlightLayout"

function I2Group() {
  return <HighlightLayout
  image={<Image/>}
  content={<Content/>}
  />
}

function Image () {
    return (
        <span className="grid grid-cols-1 grid-rows-1">
            <img src="/i2/spiderweb.png" className="col-span-full row-span-full" />
            <img src="/i2/crimes1.png" className={`col-span-full row-span-full ${i2HighlightCss.drop_bounce1}`} />
            <img src="/i2/crimes2.png" className={`col-span-full row-span-full ${i2HighlightCss.drop_bounce2}`} />
            <img src="/i2/crimes3.png" className={`col-span-full row-span-full ${i2HighlightCss.drop_bounce3}`} />
        </span>
    )
}

function Content () {
    return (
        <>
            <p>
                Imagine that scene from Minority Report where Tom Cruise is looking at footage of 'future crimes' but instead of it being a 3D hologram it's 2D, on a browser and shows text.
            </p>
            &nbsp;
            <p>
                The application was able to chart up to 500,000 nodes and edges. Performance was a key concern and as a front end developer I was responsible for designing and implementing performant optimistic changes on the chart nodes and edges.
            </p>
            &nbsp;
            <p>
                Due to performance being a key concern much of the codebase was highly mutable and we made extensive use of Typescript to help manage the added complexity of the mutable data structures.
            </p>
        </>
    )
}

export default I2Group
