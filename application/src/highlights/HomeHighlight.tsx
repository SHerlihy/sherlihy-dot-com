import useIsDesktop from "../shared/hooks/useIsDesktop"
import SherlihyImage from "./SherlihyImage"

const HomeHighlight = () => {
    const isDesktop = useIsDesktop()
    return (
        <div className={`
w-full h-full p-4 flex justify-center items-center
${isDesktop ? "flex-row" : "flex-col"}
`}>
            <SherlihyImage />
            <span className="p-4" />
            <p>
                Welcome, here I reflect on all things software engineering.
            </p>
        </div>
    )
}

export default HomeHighlight
