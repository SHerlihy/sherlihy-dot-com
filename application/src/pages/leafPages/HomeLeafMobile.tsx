import { PanelCol, PanelLeaf, PanelRow, PanelLayout } from "../../panels/Panel"
import SherlihyDotComContent from "../../shared/panels/SherlihyDotComContent"
import I2Content from "../../shared/panels/I2Content"
import AuthServiceContent from "../../shared/panels/AuthService"
import VelmaModeContent from "../../shared/panels/VelmaModeContent"

import { Route } from "../../routes/index"
import VelmaModeHighlight from "../../highlights/VelmaModeHighlight"
import I2GroupHighlight from "../../highlights/I2GroupHighlight"
import AuthServiceHighlight from "../../highlights/AuthService"
import HomeHighlight from "../../highlights/HomeHighlight"
import ComingSoonHighlight from "../../highlights/ComingSoonHighlight"
import AwsCertContent from "../../shared/panels/AwsCertContent"
import AWSCertsHighlight from "../../highlights/AWSCertsHighlight"
import useIsDesktop from "../../shared/hooks/useIsDesktop"


function HomeLeaf() {
    const { highlight } = Route.useSearch()
    const isDesktop = useIsDesktop()

    return (
        <main className="fixed w-full h-full grid grid-cols-18 grid-rows-32 gap-2">
            <PanelLeaf
                gridPos={isDesktop ? 
                    {
                        rowStart:2,
                        rowEnd:5,
                        colStart:2,
                        colEnd:9
                    }
                    :
                    {
                        rowStart:1,
                        rowEnd:5,
                        colStart:1,
                        colEnd:6
                    }
                }
                queryParam="highlight"
            >
                <article>
                    <p>
                        Reset
                    </p>
                </article>
            </PanelLeaf>

            <PanelLayout
                gridPos={isDesktop ? 
                    {
                        rowStart:2,
                        rowEnd:5,
                        colStart:25,
                        colEnd:32
                    }
                    :
                    {
                        rowStart:1,
                        rowEnd:5,
                        colStart:6,
                        colEnd:19
                    }
                }
            >
                <section className="w-full h-full">
                    <PanelCol>
                        <div className="text-center">
                            <p>+44 73544 30588</p>
                            <hr />
                            <p>steven_herlihy@yahoo.com</p>
                        </div>
                    </PanelCol>
                    <PanelCol>
                        <div className="text-center">
                            <p>+44 73544 30588</p>
                            <hr />
                            <p>steven_herlihy@yahoo.com</p>
                        </div>
                    </PanelCol>
                </section>
            </PanelLayout>

            <PanelLayout
                gridPos={isDesktop ? 
                    {
                        rowStart:2,
                        rowEnd:15,
                        colStart:9,
                        colEnd:25
                    }
                    :
                    {
                        rowStart:5,
                        rowEnd:25,
                        colStart:1,
                        colEnd:19
                    }
                }
            >
                <PanelCol>
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
                                case "highlight":
                                    return <HomeHighlight />
                                default:
                                    return <ComingSoonHighlight />
                            }
                        }
                    )()}
                </PanelCol>
            </PanelLayout>

            <PanelLeaf
                gridPos={isDesktop ? 
                    {
                        rowStart:5,
                        rowEnd:11,
                        colStart:2,
                        colEnd:9
                    }
                    :
                    {
                        rowStart:25,
                        rowEnd:29,
                        colStart:1,
                        colEnd:7
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
                        rowStart:11,
                        rowEnd:15,
                        colStart:2,
                        colEnd:9
                    }
                    :
                    {
                        rowStart:25,
                        rowEnd:29,
                        colStart:13,
                        colEnd:19
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
                        rowStart:5,
                        rowEnd:10,
                        colStart:25,
                        colEnd:32
                    }
                    :
                    {
                        rowStart:25,
                        rowEnd:29,
                        colStart:7,
                        colEnd:13
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
                        rowStart:15,
                        rowEnd:18,
                        colStart:2,
                        colEnd:18
                    }
                    :
                    {
                        rowStart:29,
                        rowEnd:33,
                        colStart:1,
                        colEnd:12
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
                        rowStart:15,
                        rowEnd:18,
                        colStart:18,
                        colEnd:32
                    }
                    :
                    {
                        rowStart:29,
                        rowEnd:33,
                        colStart:12,
                        colEnd:19
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

export default HomeLeaf
