import CambridgeAIHighlight from "../../highlights/events/CambridgeAIHighlight"
import DayOfCodeHighlight from "../../highlights/events/DayOfCodeHighlight"
import SoftwareCraftersHighlight from "../../highlights/events/SoftwareCraftersHighlight"
import TechWeekHighlight from "../../highlights/events/TechWeekHighlight"
import { PanelCol, PanelLeaf, PanelRow } from "../../panels/Panel"
import { Route } from "../../routes/events"

import useIsDesktop from "../../shared/hooks/useIsDesktop"
import LeafCommon from "../../shared/layouts/LeafCommon"
import CamAIContent from "../../shared/panels/events/CamAIContent"
import CamTechWeekContent from "../../shared/panels/events/CamTechWeekContent"
import DayOfCodeContent from "../../shared/panels/events/DayOfCodeContent"
import SoftwareCraftersCambridgeContent from "../../shared/panels/events/SoftwareCraftersCambridge"

function EventsLeaf() {
    const { highlight } = Route.useSearch()
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
                {(
                    () => {
                        switch (highlight) {
                            case 'DoC':
                                return <DayOfCodeHighlight />
                            case 'TechWeek':
                                return <TechWeekHighlight />
                            case 'CamAI':
                                return <CambridgeAIHighlight />
                            default:
                                return <SoftwareCraftersHighlight />
                        }
                    }
                )()}
            </LeafCommon>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 5,
                        rowEnd: 10,
                        colStart: 2,
                        colEnd: 9
                    }
                    :
                    {
                        rowStart: 24,
                        rowEnd: 28,
                        colStart: 1,
                        colEnd: 19
                    }
                }
                queryParam="SCC"
            >
                <PanelCol>
                    <SoftwareCraftersCambridgeContent />
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
                        colEnd: 6
                    }
                }
                queryParam="CamAI"
            >
                <PanelCol>
                    <CamAIContent />
                </PanelCol>
            </PanelLeaf>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 15,
                        rowEnd: 19,
                        colStart: 2,
                        colEnd: 19
                    }
                    :
                    {
                        rowStart: 28,
                        rowEnd: 33,
                        colStart: 11,
                        colEnd: 19
                    }
                }
                queryParam="DoC"
            >
                <PanelRow>
                    <DayOfCodeContent />
                </PanelRow>
            </PanelLeaf>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 9,
                        rowEnd: 15,
                        colStart: 25,
                        colEnd: 32
                    }
                    :
                    {
                        rowStart: 28,
                        rowEnd: 33,
                        colStart: 6,
                        colEnd: 11
                    }
                }
                queryParam="TechWeek"
            >
                <PanelCol>
                    <CamTechWeekContent />
                </PanelCol>
            </PanelLeaf>
        </main>
    )
}

// <PanelLayout
//     gridPos={isDesktop ?
//         {
//             rowStart: 2,
//             rowEnd: 15,
//             colStart: 9,
//             colEnd: 25
//         }
//         :
//         {
//             rowStart: 5,
//             rowEnd: 24,
//             colStart: 1,
//             colEnd: 19
//         }
//     }
// >
//     {children}
// </PanelLayout>

export default EventsLeaf
