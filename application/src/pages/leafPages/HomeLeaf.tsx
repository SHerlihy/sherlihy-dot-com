import { Panel, PanelCol, PanelLeaf, PanelInfo, PanelRow } from "../../panels/Panel"
import SherlihyDotComContent from "../../shared/panels/SherlihyDotComContent"
import I2Content from "../../shared/panels/I2Content"
import ResumeGraderContent from "../../shared/panels/ResumeGrader"
import AuthServiceContent from "../../shared/panels/AuthService"
import VelmaModeContent from "../../shared/panels/VelmaModeContent"

import appStyles from "../../shared/styles/app.module.css"
import bentoStyles from "../../shared/styles/bentoStyles.module.css"
import containers from "../../shared/styles/containers.module.css"
import { Route } from "../../routes/index"
import VelmaModeHighlight from "../../highlights/VelmaModeHighlight"
import I2GroupHighlight from "../../highlights/I2GroupHighlight"
import AuthServiceHighlight from "../../highlights/AuthService"
import HomeHighlight from "../../highlights/HomeHighlight"
import ComingSoonHighlight from "../../highlights/ComingSoonHighlight"
import CertifiedPractionerHighlight from "../../highlights/CertifiedPractionerHighlight"
import AwsCertContent from "../../shared/panels/AwsCertContent"

function HomeLeaf() {
    const { highlight } = Route.useSearch()

    return (
        <main className={`${bentoStyles.grid_mobile} ${appStyles}`}>
            <PanelLeaf
                rowBegin={1}
                rowEnd={5}
                colBegin={1}
                colEnd={6}
                queryParam="highlight"
            >
                <article>
                    <p>
                        Reset
                    </p>
                </article>
            </PanelLeaf>

            <PanelInfo
                rowBegin={1}
                rowEnd={5}
                colBegin={6}
                colEnd={19}
            >
                <PanelCol>
                    <div className={`${containers.centerUnflex}`}>
                        <p>+44 73544 30588</p>
                        <hr />
                        <p>steven_herlihy@yahoo.com</p>
                    </div>
                </PanelCol>
            </PanelInfo>


            <Panel
                rowBegin={5}
                rowEnd={25}
                colBegin={1}
                colEnd={19}
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
                                    return <CertifiedPractionerHighlight />
                                case "highlight":
                                    return <HomeHighlight />
                                default:
                                    return <ComingSoonHighlight />
                            }
                        }
                    )()}
                </PanelCol>
            </Panel>

            <PanelLeaf
                rowBegin={25}
                rowEnd={29}
                colBegin={1}
                colEnd={7}
                queryParam="velma"
            >
                <PanelCol>
                    <VelmaModeContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                rowBegin={25}
                rowEnd={29}
                colBegin={13}
                colEnd={19}
                queryParam="awsCert"
            >
                <PanelCol>
                    <AwsCertContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                rowBegin={25}
                rowEnd={29}
                colBegin={7}
                colEnd={13}
                queryParam="authService"
            >
                <PanelCol>
                    <AuthServiceContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                rowBegin={29}
                rowEnd={33}
                colBegin={1}
                colEnd={12}
                queryParam="sherlihyDotCom"
            >
                <PanelRow>
                    <SherlihyDotComContent />
                </PanelRow>
            </PanelLeaf>

            <PanelLeaf
                rowBegin={29}
                rowEnd={33}
                colBegin={12}
                colEnd={19}
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
