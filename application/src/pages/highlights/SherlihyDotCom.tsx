import SherlihyImage from "@/shared/images/sherlihy/SherlihyImage"

import HighlightLayout from "@/shared/layouts/HighlightLayout"

function SherlihyDotCom() {
  return <HighlightLayout
  image={<SherlihyImage/>}
  content={<Content/>}
  />
}

function Content (){
    return (
        <>
            <p>
                As my personal website is a project that will be in continuous development, I decided to create a continuous deployment pipeline.
            </p>
            &nbsp;
            <p>
                What excites me the most about my website is the diagrams as code approach to understanding the deployment design. I quickly found that even for a basic design the details were difficult to memorise; so I commited to recording the design as diagrams. Initially, I was concerned with exposing design details from a security aspect, however, it is best practice to prioritise feedback over obfuscation.
            </p>
        </>
    )
}

export default SherlihyDotCom
