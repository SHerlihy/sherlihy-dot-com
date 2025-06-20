import useIsDesktop from "../shared/hooks/useIsDesktop"

import { PanelCol, PanelContent, PanelLeaf, PanelRow } from "../panels/Panel"

import LeafCommon from "../shared/layouts/LeafCommon"
import HomeHighlight from "../highlights/HomeHighlight"
import VelmaModeContent from "../shared/panels/VelmaModeContent"
import SoftwareCraftersCambridgeContent from "../shared/panels/events/SoftwareCraftersCambridge"
import DayOfCodeContent from "../shared/panels/events/DayOfCodeContent"
import I2Content from "../shared/panels/I2Content"
import { ReactNode } from "@tanstack/react-router"
import PageLayout from "../shared/layouts/PageLayout"

function RootBranch() {
    return (
        <PageLayout
            content={<HomeHighlight/>}
            navigate={<p>Navigate</p>}
        />
    )

    return (
        <main className={`
            fixed w-full h-full grid gap-4
            ${isDesktop ?
                gridDeskStyles : gridMobileStyles
            }`}>

            <PageLayout
                content={<HomeHighlight />}
                navigate={<HomeNav />}
            />

            <LeafCommon>
                <HomeHighlight />
            </LeafCommon>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 3,
                        rowEnd: 5,
                        colStart: 25,
                        colEnd: 32
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
                        rowEnd: 7,
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
                            rowStart: 7,
                            rowEnd: 10,
                            colStart: 25,
                            colEnd: 32
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
                            rowStart: 10,
                            rowEnd: 13,
                            colStart: 25,
                            colEnd: 32
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
                            rowStart: 13,
                            rowEnd: 16,
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
                            rowStart: 16,
                            rowEnd: 19,
                            colStart: 25,
                            colEnd: 32
                        }
                    }
                    pathname="/projects"
                    queryParam="i2"
                >
                    <PanelRow>
                        <div className='flex justify-center items-center'>
                            <h2 className='text-center'>Employment</h2>
                        </div>
                    </PanelRow>
                </PanelLeaf>
            </>}
        </main>
    )
}

export default RootBranch
