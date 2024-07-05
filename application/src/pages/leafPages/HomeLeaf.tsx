import { Panel, PanelCol, PanelLeaf, PanelRow } from "../../panels/Panel"
import SherlihyDotComContent from "../../shared/panels/SherlihyDotComContent"
import I2Content from "../../shared/panels/I2Content"
import ResumeGraderContent from "../../shared/panels/ResumeGrader"
import AuthServiceContent from "../../shared/panels/AuthService"
import VelmaModeContent from "../../shared/panels/VelmaModeContent"

import bentoStyles from "../../shared/styles/bentoStyles.module.css"
import { Route } from "../../routes/index"
import VelmaModeHighlight from "../../highlights/VelmaModeHighlight"
import I2GroupHighlight from "../../highlights/I2GroupHighlight"
import AuthServiceHighlight from "../../highlights/AuthService"
import HomeHighlight from "../../highlights/HomeHighlight"
import ComingSoonHighlight from "../../highlights/ComingSoonHighlight"
import CertifiedPractionerHighlight from "../../highlights/CertifiedPractionerHighlight"

function HomeLeaf() {
    const { highlight } = Route.useSearch()

  return (
        <main className={`${bentoStyles.grid}`}>
                <PanelLeaf 
                    rowBegin={2}
                    rowEnd={5}
                    colBegin={2}
                    colEnd={9}
                    queryParam="highlight"
                >
                    <article>
                        <p>
                            Reset
                        </p>
                    </article>
                </PanelLeaf>

                <Panel rowBegin={2} rowEnd={15} colBegin={9} colEnd={25}>
                    <PanelRow>
                        {(
                            ()=>{
                            switch (highlight) {
                                case "velma":
                                return <VelmaModeHighlight/>
                                case "i2":
                                return <I2GroupHighlight/>
                                case "authService":
                                return <AuthServiceHighlight/>
                                case "highlight":
                                return <CertifiedPractionerHighlight/>
                                // return <HomeHighlight/>
                                default:
                                return <ComingSoonHighlight/>
                            }
                            }
                        )()}
                    </PanelRow>
                </Panel>

                <PanelLeaf 
                    rowBegin={5} 
                    rowEnd={15} 
                    colBegin={2} 
                    colEnd={9} 
                    queryParam="velma"
                >
                    <PanelCol>
                        <VelmaModeContent/>
                    </PanelCol>
                </PanelLeaf>

                <PanelLeaf
                    rowBegin={15} 
                    rowEnd={18} 
                    colBegin={2} 
                    colEnd={18} 
                    queryParam="sherlihyDotCom"
                >
                    <PanelRow>
                        <SherlihyDotComContent/>
                    </PanelRow>
                </PanelLeaf>

                <PanelLeaf 
                    rowBegin={15} 
                    rowEnd={18} 
                    colBegin={18} 
                    colEnd={32}
                    queryParam="i2"
                >
                    <PanelRow>
                        <I2Content/>
                    </PanelRow>
                </PanelLeaf>

                <PanelLeaf 
                    rowBegin={8} 
                    rowEnd={15} 
                    colBegin={25} 
                    colEnd={32}
                    queryParam="resumeGrader"
                >
                    <PanelCol>
                        <ResumeGraderContent/>
                    </PanelCol>
                </PanelLeaf>

                <PanelLeaf
                    rowBegin={2} 
                    rowEnd={8} 
                    colBegin={25} 
                    colEnd={32}
                    queryParam="authService"
                >
                    <PanelCol>
                        <AuthServiceContent/>
                    </PanelCol>
                </PanelLeaf>
        </main>
  )
}

export default HomeLeaf
