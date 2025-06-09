import useIsDesktop from "../shared/hooks/useIsDesktop"

import { PanelCol, PanelContent, PanelLeaf, PanelRow } from "../panels/Panel"

import LeafCommon from "../shared/layouts/LeafCommon"
import HomeHighlight from "../highlights/HomeHighlight"
import VelmaModeContent from "../shared/panels/VelmaModeContent"
import SoftwareCraftersCambridgeContent from "../shared/panels/events/SoftwareCraftersCambridge"
import DayOfCodeContent from "../shared/panels/events/DayOfCodeContent"
import I2Content from "../shared/panels/I2Content"

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
            {isDesktop && <>
                <PanelLeaf
                    gridPos={
                        {
                            rowStart: 8,
                            rowEnd: 15,
                            colStart: 2,
                            colEnd: 9
                        }
                    }
                    pathname="/events"
                    queryParam="SCC"
                >
                    <PanelCol>
                        <SoftwareCraftersCambridgeContent />
                    </PanelCol>
                </PanelLeaf>
                <PanelLeaf
                    gridPos={
                        {
                            rowStart: 15,
                            rowEnd: 18,
                            colStart: 2,
                            colEnd: 17
                        }
                    }
                    pathname="/events"
                    queryParam="DoC"
                >
                    <PanelRow>
                        <DayOfCodeContent />
                    </PanelRow>
                </PanelLeaf>
                <PanelLeaf
                    gridPos={
                        {
                            rowStart: 8,
                            rowEnd: 15,
                            colStart: 25,
                            colEnd: 32
                        }
                    }
                    pathname="/projects"
                    queryParam="velma"
                >
                    <PanelCol>
                        <VelmaModeContent />
                    </PanelCol>
                </PanelLeaf>
                <PanelLeaf
                    gridPos={
                        {
                            rowStart: 15,
                            rowEnd: 18,
                            colStart: 17,
                            colEnd: 32
                        }
                    }
                    pathname="/projects"
                    queryParam="i2"
                >
                    <PanelRow>
                        <I2Content />
                    </PanelRow>
                </PanelLeaf>
            </>}
        </main>
    )
}

export default RootBranch
