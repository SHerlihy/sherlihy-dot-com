import HighlightDesktopLayout from "../../shared/components/HighlightDesktopLayout"
import HighlightMobileLayout from "../../shared/components/HighlightMobileLayout"
import useIsDesktop from "../../shared/hooks/useIsDesktop"

const PractitionerImg = () => {
    return (
        <a href="https://www.credly.com/badges/64a19493-6171-4c41-9b45-fe86e31d16f6/public_url">
            <img
                src="/awsCerts/aws-certified-cloud-practitioner.png"
            />
        </a>
    )
}

const ArchitectImg = () => {
    return (
        <a href="https://www.credly.com/badges/ee291c64-d1af-4b2c-9757-e0768efb4575/public_url">
            <img
                src="/awsCerts/aws-certified-solutions-architect-associate.png"
            />
        </a>
    )
}

const paragraphs = [
    "I had a lot of fun meeting a wide range of developers and getting to code together under a range of working constraints.",
    'Through the day we would spend roughly an hour developing a "Game of Life" simulation with a new coding contraint and new co-developer. The initial hour was spent with no constraint, however, as the day progressed contraints such as "make a test case succeed in 5 minutes or reset" and "loops are banned" had to be adhered to.',
    'Although I learned a lot technically, the most impactful moment I had was when my partner and I were working through a constraint that I felt unsure I was able to work well with. My partner said "Let\'s play the game." as a throw away remark and it shifted my perspective to realise I could have fun with the constraint which led to me having a lot of fun working through the challange with them.'
]

const DayOfCodeHighlight = () => {
    const isDesktop = useIsDesktop()


    return (
        <div className={`
p-6
${!isDesktop && 'w-full h-full flex flex-col'}
`}>
            {isDesktop &&
                <HighlightDesktopLayout paragraphs={paragraphs}>
                    <div className="h-30 w-30 relative">
                        <p>GDoC img</p>
                    </div>
                </HighlightDesktopLayout>
            }
            {!isDesktop &&
                <HighlightMobileLayout paragraphs={paragraphs}>
                    <div className="h-30 w-full relative">
                        <p>GDoC img</p>
                    </div>
                </HighlightMobileLayout>
            }
        </div>
    )
}

export default DayOfCodeHighlight
