import { Link, useLocation } from "@tanstack/react-router"
import { useContext, type ReactNode } from "react"
import { NavContext } from "../context/NavContext"

function NavButton(props: {
    children: ReactNode
    pathname: string
    className?: string
}) {
    const { toggleIsNav } = useContext(NavContext)
    const location = useLocation()

    return (
            <Link
                style={{ color: 'inherit' }}
                className={`flex justify-center items-center ${props.className}`}
                to={props.pathname}
                onClick={() => toggleIsNav()}
            >
                <p className={`
hover:underline
hover:duration-500
hover:text-purple-500
${location.pathname == props.pathname && 'underline text-purple-500'}
`}
      >
                    {props.children}
                </p>
            </Link>
    )
}

export default NavButton
