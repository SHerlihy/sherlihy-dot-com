import { Link, useLocation } from "@tanstack/react-router"
import { ReactNode } from "react"
import { AllQueryOptions, Route } from "../../routes"

function NavButton(props: {
    children: ReactNode
    className?: string
    queryParam?: AllQueryOptions
    pathname?: string
}) {
    const { highlight } = Route.useSearch()
    const location = useLocation()
    return (
        <Link
            className={`flex justify-center items-center ${props.className}`}
            to={props.pathname ? props.pathname : location.pathname}
            search={() => ({ highlight: props.queryParam })}
        >
            <p className={`
hover:underline
hover:duration-500
hover:text-purple-500
${highlight === props.queryParam ? 'underline text-purple-500' : ''}`}>
                {props.children}
            </p>
        </Link>
    )
}

export default NavButton
