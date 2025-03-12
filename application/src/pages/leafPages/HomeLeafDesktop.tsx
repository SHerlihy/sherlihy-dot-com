import { PanelCol, PanelLayout, PanelLeaf, PanelRow } from "../../panels/Panel"
import SherlihyDotComContent from "../../shared/panels/SherlihyDotComContent"
import I2Content from "../../shared/panels/I2Content"
import ResumeGraderContent from "../../shared/panels/ResumeGrader"
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

function HomeLeaf() {
    const { highlight } = Route.useSearch()

    return (
        <main className="fixed w-full h-full grid grid-cols-32 grid-rows-18 gap-2">
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

            <PanelLayout
                rowBegin={2}
                rowEnd={15}
                colBegin={9}
                colEnd={25}
            >
                <PanelRow>
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
                </PanelRow>
            </PanelLayout>

            <PanelLeaf
                rowBegin={5}
                rowEnd={11}
                colBegin={2}
                colEnd={9}
                queryParam="velma"
            >
                <PanelCol>
                    <VelmaModeContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                rowBegin={11}
                rowEnd={15}
                colBegin={2}
                colEnd={9}
                queryParam="awsCert"
            >
                <PanelCol>
                    <AwsCertContent />
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
                    <SherlihyDotComContent />
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
                    <I2Content />
                </PanelRow>
            </PanelLeaf>

            <PanelLayout
                rowBegin={2}
                rowEnd={5}
                colBegin={25}
                colEnd={32}
            >
                <PanelCol>
                    <div className="text-center">
                        <p>+44 73544 30588</p>
                        <hr />
                        <p>steven_herlihy@yahoo.com</p>
                    </div>
                </PanelCol>
            </PanelLayout>

            <PanelLeaf
                rowBegin={10}
                rowEnd={15}
                colBegin={25}
                colEnd={32}
                queryParam="resumeGrader"
            >
                <PanelCol>
                    <ResumeGraderContent />
                </PanelCol>
            </PanelLeaf>

            <PanelLeaf
                rowBegin={5}
                rowEnd={10}
                colBegin={25}
                colEnd={32}
                queryParam="authService"
            >
                <PanelCol>
                    <AuthServiceContent />
                </PanelCol>
            </PanelLeaf>
        </main>
    )
}

export default HomeLeaf
