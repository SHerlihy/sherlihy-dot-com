import { PanelCol, PanelLeaf, PanelRow } from "../../panels/Panel"
import SherlihyDotComContent from "../../shared/panels/SherlihyDotComContent"
import I2Content from "../../shared/panels/I2Content"
import AuthServiceContent from "../../shared/panels/AuthService"
import VelmaModeContent from "../../shared/panels/VelmaModeContent"

import useIsDesktop from "../../shared/hooks/useIsDesktop"

import LeafCommon from "../../shared/layouts/LeafCommon"
import VelmaModeHighlight from "../../highlights/projects/VelmaModeHighlight"
import I2GroupHighlight from "../../highlights/projects/I2GroupHighlight"
import AuthServiceHighlight from "../../highlights/projects/AuthService"
import AWSCertsHighlight from "../../highlights/projects/AWSCertsHighlight"
import SherlihyHighlight from "../../highlights/projects/SherlihyHighlight"
import AwsCertContent from "../../shared/panels/AwsCertContent"
import { Route } from "../../routes/projects"

function ProjectsLeaf() {
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
                            case "velma":
                                return <VelmaModeHighlight />
                            case "i2":
                                return <I2GroupHighlight />
                            case "authService":
                                return <AuthServiceHighlight />
                            case "awsCert":
                                return <AWSCertsHighlight />
                            default:
                                return <SherlihyHighlight />
                        }
                    }
                )()}
            </LeafCommon>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 5,
                        rowEnd: 11,
                        colStart: 2,
                        colEnd: 9
                    }
                    :
                    {
                        rowStart: 24,
                        rowEnd: 29,
                        colStart: 1,
                        colEnd: 7
                    }
                }
                queryParam="velma"
            >
                <PanelCol>
                    <VelmaModeContent />
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
                        rowStart: 24,
                        rowEnd: 29,
                        colStart: 13,
                        colEnd: 19
                    }
                }
                queryParam="awsCert"
            >
                <PanelCol>
                    <AwsCertContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 5,
                        rowEnd: 15,
                        colStart: 25,
                        colEnd: 32
                    }
                    :
                    {
                        rowStart: 24,
                        rowEnd: 29,
                        colStart: 7,
                        colEnd: 13
                    }
                }
                queryParam="authService"
            >
                <PanelCol>
                    <AuthServiceContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 15,
                        rowEnd: 18,
                        colStart: 2,
                        colEnd: 18
                    }
                    :
                    {
                        rowStart: 29,
                        rowEnd: 33,
                        colStart: 1,
                        colEnd: 11
                    }
                }
                queryParam="sherlihyDotCom"
            >
                <PanelRow>
                    <SherlihyDotComContent />
                </PanelRow>
            </PanelLeaf>

            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 15,
                        rowEnd: 18,
                        colStart: 18,
                        colEnd: 32
                    }
                    :
                    {
                        rowStart: 29,
                        rowEnd: 33,
                        colStart: 11,
                        colEnd: 19
                    }
                }
                queryParam="i2"
            >
                <PanelRow>
                    <I2Content />
                </PanelRow>
            </PanelLeaf>
        </main>
    )
}

export default ProjectsLeaf
