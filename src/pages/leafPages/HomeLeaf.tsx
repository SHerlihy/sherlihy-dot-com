import HomeLeafMobile from "./HomeLeafMobile.tsx"
import HomeLeafDesktop from "./HomeLeafDesktop.tsx"
import useIsDesktop from "../../shared/hooks/useIsDesktop.tsx";

function HomeLeaf() {
    const isDesktop = useIsDesktop();

    return (
        <>
            <h1 className="text-blue-600 text-3xl font-bold underline">
                Hello world!
            </h1>
            {isDesktop && <HomeLeafDesktop />}
            {!isDesktop && <HomeLeafMobile />}
        </>
    )
}

export default HomeLeaf
