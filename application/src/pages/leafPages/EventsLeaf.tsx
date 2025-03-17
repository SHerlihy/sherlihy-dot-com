import { PanelCol, PanelLeaf, PanelRow, PanelLayout } from "../../panels/Panel"

import { Route } from "../../routes/index"
import useIsDesktop from "../../shared/hooks/useIsDesktop"
import LeafCommon from "../../shared/layouts/LeafCommon"

function EventsLeaf() {
    // const { highlight } = Route.useSearch()
    const isDesktop = useIsDesktop()

    const gridMobileStyles = "grid-cols-18 grid-rows-32"
    const gridDeskStyles = "grid-cols-32 grid-rows-18"

    return (
        <main className={`
            fixed w-full h-full grid gap-4
            ${isDesktop ?
                gridDeskStyles : gridMobileStyles
            }`}>
            <LeafCommon>
                <p>highlight</p>
            </LeafCommon>
        </main>
    )
}

export default EventsLeaf
