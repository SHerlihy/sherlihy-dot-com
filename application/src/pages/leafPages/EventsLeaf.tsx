import DayOfCodeHighlight from "../../highlights/events/DayOfCode"
import { PanelCol, PanelLeaf, PanelRow, PanelLayout } from "../../panels/Panel"

import { Route } from "../../routes/index"
import useIsDesktop from "../../shared/hooks/useIsDesktop"
import LeafCommon from "../../shared/layouts/LeafCommon"
import DayOfCodeContent from "../../shared/panels/events/DayOfCodeContent"

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
                <DayOfCodeHighlight />
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
                        rowStart: 24,
                        rowEnd: 29,
                        colStart: 10,
                        colEnd: 19
                    }
                }
                queryParam="DoC"
            >
                <PanelCol>
                    <DayOfCodeContent />
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
