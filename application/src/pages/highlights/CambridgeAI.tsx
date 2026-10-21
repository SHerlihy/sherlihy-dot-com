import HighlightLayout from "@/shared/layouts/HighlightLayout"

function CambridgeAI() {
  return <HighlightLayout
  image={<Image/>}
  content={<Content/>}
  />
}

function Image(){
  return <img src="/camAI/camAI.webp" />
}

function Content () {
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

export default CambridgeAI
