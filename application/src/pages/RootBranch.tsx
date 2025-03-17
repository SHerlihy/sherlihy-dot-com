import useIsDesktop from "../shared/hooks/useIsDesktop"

import { PanelCol, PanelContent, PanelLeaf } from "../panels/Panel"

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
                        rowStart: 5,
                        rowEnd: 8,
                        colStart: 2,
                        colEnd: 9
                    }
                    :
                    {
                        rowStart: 26,
                        rowEnd: 31,
                        colStart: 10,
                        colEnd: 19
                    }
                }
                pathname="/events"
            >
                <PanelCol>
                    <PanelContent title="Events" items={[]} />
                </PanelCol>
            </PanelLeaf>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 5,
                        rowEnd: 8,
                        colStart: 25,
                        colEnd: 32
                    }
                    :
                    {
                        rowStart: 26,
                        rowEnd: 31,
                        colStart: 1,
                        colEnd: 10
                    }
                }
                pathname="/projects"
            >
                <PanelCol>
                    <PanelContent title="Projects" items={[]} />
                </PanelCol>
            </PanelLeaf>
        </main>
    )
}

export default RootBranch
