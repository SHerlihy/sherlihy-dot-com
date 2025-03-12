import { Link } from '@tanstack/react-router'

import { ReactNode } from "react"
import panelCss from "./panel.module.css"
import { HomeQueryOptions } from '../routes'
import useIsDesktop from '../shared/hooks/useIsDesktop'

type GridPos = {
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number
}

    //background-color: rgba(133, 133, 155, 0.3);
export const PanelLayout = (props: {
    gridPos: GridPos,
    children: ReactNode
}) => {
    const { gridPos } = props
    const gridStyle = {
        gridRow: `${gridPos.rowStart}/${gridPos.rowEnd}`,
        gridColumn: `${gridPos.colStart}/${gridPos.colEnd}`
    }
    return (
        <div
            className={`
            overflow-hidden h-full w-full p-1 rounded-md bg-gray-400/30
            hover:shadow-[0_0_0.5rem_0.1rem] hover:shadow-current
            `}
            style={gridStyle}
        >
            {props.children}
        </div>
    )
}

export const PanelLeaf = (props: {
    gridPos: GridPos,
    queryParam: HomeQueryOptions
    children: ReactNode
}) => {
    return (
        <PanelLayout {...props}>
            <Link
                to='/'
                search={() => ({ highlight: props.queryParam })}
                className={`${panelCss.link}`}
            >
                {props.children}
            </Link>
        </PanelLayout>
    )
}

export const PanelContent = (props: {
    items: string[]
    title?: string
}) => {
    const isDesktop = useIsDesktop()
    return (
        <div>
            {props.title &&
                <div className="p-1">
                    <h2>{props.title}</h2>
                </div>
            }
            {isDesktop &&
                <div className={`${panelCss.points}`}>
                    <ul className={`${panelCss.list_flex}`}>
                        {props.items.map((item) => {
                            return <li key={item}>{item}</li>
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}

export const PanelRow = (props: {
    children: ReactNode
}) => {
    return (
        <div className="flex flex-row space-evenly">
            {props.children}
        </div>
    )
}

export const PanelCol = (props: {
    children: ReactNode
}) => {
    return (
        <div className="flex flex-col space-evenly">
            {props.children}
        </div>
    )
}
