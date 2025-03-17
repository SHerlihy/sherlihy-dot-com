import useIsDesktop from "../shared/hooks/useIsDesktop"

import { PanelCol, PanelLeaf } from "../panels/Panel"

import LeafCommon from "../shared/layouts/LeafCommon"
import HomeHighlight from "../highlights/HomeHighlight"

function RootBranch() {
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
                <HomeHighlight />
            </LeafCommon>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 11,
                        rowEnd: 15,
                        colStart: 2,
                        colEnd: 9
                    }
                    :
                    {
                        rowStart: 28,
                        rowEnd: 33,
                        colStart: 10,
                        colEnd: 19
                    }
                }
                pathname="/events"
            >
                <PanelCol>
                    <p>events</p>
                </PanelCol>
            </PanelLeaf>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 11,
                        rowEnd: 15,
                        colStart: 2,
                        colEnd: 9
                    }
                    :
                    {
                        rowStart: 28,
                        rowEnd: 33,
                        colStart: 1,
                        colEnd: 10
                    }
                }
                pathname="/projects"
            >
                <PanelCol>
                    <p>projects</p>
                </PanelCol>
            </PanelLeaf>
        </main>
    )
}

export default RootBranch
