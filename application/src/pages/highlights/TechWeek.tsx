import HighlightLayout from "@/shared/layouts/HighlightLayout"

function TechWeek() {
  return <HighlightLayout
  image={<Image/>}
  content={<Content/>}
  />
}

function Image(){
  return <img src="/techWeek/techweek.png" />
}

function Content() {
    return (
        <>
            <p>
                Although I regularly attend AI talks the tech week AI talks not only focused on application development but also governance in the AI sector which highlighted interesting issues that were new to me. The quantum computing talks were a fun update on the state of quantum computing and the near future applications for the technology. Being educated in materials science I was previously aware of quantum computing so now being a developer and having the developer perspective on the technology was fun.
            </p>
        </>
    )
}

export default TechWeek
