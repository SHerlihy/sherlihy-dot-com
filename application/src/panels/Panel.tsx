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
            overflow-hidden h-full w-full rounded-md bg-gray-400/30
            flex justify-center items-center
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
                className={`
                    ${panelCss.link}
                    w-full h-full flex justify-center items-center
                `}
            >
                <div className='w-full h-full p-6'>
                    {props.children}
                </div>
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
        <>
            {props.title &&
                <div className='flex justify-center items-center'>
                    <h2 className='text-center'>{props.title}</h2>
                </div>
            }
            <span className='p-4' />
            {isDesktop &&
                <div className='w-full h-full p-4'>
                    <ul className="w-full h-full flex flex-col flex-wrap">
                        {props.items.map((item) => {
                            return <p key={item}>{item}</p>
                        })}
                    </ul>
                </div>
            }
        </>
    )
}

export const PanelRow = (props: {
    children: ReactNode
}) => {
    return (
        <div className="w-full h-full flex flex-row">
            {props.children}
        </div>
    )
}

export const PanelCol = (props: {
    children: ReactNode
}) => {
    return (
        <div className="w-full h-full flex flex-col">
            {props.children}
        </div>
    )
}
