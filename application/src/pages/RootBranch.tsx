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
        <div className={`flex-grow flex flex-col justify-evenly`}>
            <NavButton
                queryParam=""
                pathname="/"
            >
                Home
            </NavButton>
            <NavButton
                queryParam="i2"
                pathname="/"
            >
                i2 Group
            </NavButton>
            <NavButton
                queryParam="awsCert"
                pathname="/"
            >
                AWS
            </NavButton>
            <NavButton
                queryParam="sherlihyDotCom"
                pathname="/"
            >
                sherlihy.com
            </NavButton>
            <NavButton
                queryParam="SCC"
                pathname="/"
            >
                Craftsmanship
            </NavButton>
            <NavButton
                queryParam="velma"
                pathname="/"
            >
                Accessable Text
            </NavButton>
            <NavButton
                queryParam="DoC"
                pathname="/"
            >
                Day of Code
            </NavButton>
            <NavButton
                queryParam="CamAI"
                pathname="/"
            >
                AI
            </NavButton>
            <NavButton
                queryParam="TechWeek"
                pathname="/"
            >
                2024 Tech Week
            </NavButton>
            <NavButton
                queryParam="authService"
                pathname="/"
            >
                Go App
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
