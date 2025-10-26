import { Link, useLocation } from "@tanstack/react-router"
import { useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Route, type AllQueryOptions } from "../../routes"
import { NavContext } from "../context/NavContext"
import { createPortal } from "react-dom"

function NavButton(props: {
    children: ReactNode
    className?: string
    queryParam?: AllQueryOptions
    pathname?: string
}) {
    const { toggleIsNav } = useContext(NavContext)
    const { highlight } = Route.useSearch()
    const location = useLocation()

    return (
            <Link
                style={{ color: 'inherit' }}
                className={`flex justify-center items-center ${props.className}`}
                to={props.pathname ? props.pathname : location.pathname}
                search={() => ({ highlight: props.queryParam })}
                onClick={() => toggleIsNav()}
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
