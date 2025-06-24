import HomeHighlight from "../highlights/HomeHighlight"
import PageLayout from "../shared/layouts/PageLayout"
import { Route } from "../routes"

import DayOfCodeHighlight from "../highlights/events/DayOfCodeHighlight"
import TechWeekHighlight from "../highlights/events/TechWeekHighlight"
import CambridgeAIHighlight from "../highlights/events/CambridgeAIHighlight"
import SoftwareCraftersHighlight from "../highlights/events/SoftwareCraftersHighlight"

import VelmaModeHighlight from "../highlights/projects/VelmaModeHighlight"
import I2GroupHighlight from "../highlights/projects/I2GroupHighlight"
import AuthServiceHighlight from "../highlights/projects/AuthService"
import AWSCertsHighlight from "../highlights/projects/AWSCertsHighlight"
import SherlihyHighlight from "../highlights/projects/SherlihyHighlight"

import NavButton from "../shared/components/NavButton"

function HomeNav() {
    return (
        <div className={`flex-grow grid grid-cols-5 grid-rows-20`}>
            <NavButton
                className={`col-start-1 col-end-6 row-start-1 row-end-2`}
                queryParam="i2"
                pathname="/"
            >
                Professional
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-2 row-end-3`}
                queryParam="awsCert"
                pathname="/"
            >
                AWS
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-3 row-end-4`}
                queryParam="sherlihyDotCom"
                pathname="/"
            >
                sherlihy.com
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-4 row-end-5`}
                queryParam="SCC"
                pathname="/"
            >
                Craftsmanship
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-5 row-end-6`}
                queryParam="velma"
                pathname="/"
            >
                Accessable Text
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-6 row-end-7`}
                queryParam="DoC"
                pathname="/"
            >
                Day of Code
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-7 row-end-8`}
                queryParam="CamAI"
                pathname="/"
            >
                AI
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-8 row-end-9`}
                queryParam="TechWeek"
                pathname="/"
            >
                2024 Tech Week
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-9 row-end-10`}
                queryParam="authService"
                pathname="/"
            >
                Go App
            </NavButton>
            <NavButton
                className={`col-start-1 col-end-6 row-start-18 row-end-21`}
                queryParam=""
                pathname="/"
            >
                Home
            </NavButton>
        </div>
    )
}

function CurrentHighlight() {
    const { highlight } = Route.useSearch()
    return (
        <>
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
                        case 'DoC':
                            return <DayOfCodeHighlight />
                        case 'TechWeek':
                            return <TechWeekHighlight />
                        case 'CamAI':
                            return <CambridgeAIHighlight />
                        case 'SCC':
                            return <SoftwareCraftersHighlight />
                        case 'sherlihyDotCom':
                            return <SherlihyHighlight />

                        default:
                            return <HomeHighlight />
                    }
                }
            )()}
        </>
    )
}

function RootBranch() {
    return (
        <PageLayout
            content={<CurrentHighlight />}
            navigate={<HomeNav />}
        />
    )
}

export default RootBranch
