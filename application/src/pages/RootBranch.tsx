import HomeHighlight from "../highlights/HomeHighlight"
import { Link, ReactNode, useLocation } from "@tanstack/react-router"
import PageLayout from "../shared/layouts/PageLayout"
import { AllQueryOptions } from "../routes"
import { Route } from "../routes"
import DayOfCodeHighlight from "../highlights/events/DayOfCodeHighlight"
import TechWeekHighlight from "../highlights/events/TechWeekHighlight"
import CambridgeAIHighlight from "../highlights/events/CambridgeAIHighlight"
import VelmaModeHighlight from "../highlights/projects/VelmaModeHighlight"
import I2GroupHighlight from "../highlights/projects/I2GroupHighlight"
import AuthServiceHighlight from "../highlights/projects/AuthService"
import AWSCertsHighlight from "../highlights/projects/AWSCertsHighlight"
import SoftwareCraftersHighlight from "../highlights/events/SoftwareCraftersHighlight"

function NavButton(props: {
    children: ReactNode
    className?: string
    queryParam?: AllQueryOptions
    pathname?: string
}) {
    const location = useLocation()
    return (
        <Link
            className={`flex justify-center items-center ${props.className}`}
            to={props.pathname ? props.pathname : location.pathname}
            search={() => ({ highlight: props.queryParam })}
        >
            {props.children}
        </Link>
    )
}

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
                className={`col-start-1 col-end-6 row-start-18 row-end-21`}
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
