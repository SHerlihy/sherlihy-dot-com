import HomeLeafMobile from "./HomeLeafMobile.tsx"
import HomeLeafDesktop from "./HomeLeafDesktop.tsx"
import useIsDesktop from "../../shared/hooks/useIsDesktop.tsx";

function HomeLeaf() {
    const isDesktop = useIsDesktop();

  return (
    <>
        {isDesktop && <HomeLeafDesktop/>}
        {!isDesktop && <HomeLeafMobile/>}
    </>
  )
}

export default HomeLeaf
