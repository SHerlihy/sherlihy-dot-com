import {Link} from '@tanstack/react-router'

import { ReactNode } from "react"
import panelCss from "./panel.module.css"
import { HomeQueryOptions } from '../routes'

export const Panel = (props: {
    rowBegin: number
    rowEnd: number
    colBegin: number
    colEnd: number
    children: ReactNode
}) => {
    const gridStyle = {
        gridRow: `${props.rowBegin}/${props.rowEnd}`,
        gridColumn: `${props.colBegin}/${props.colEnd}`
    }

    return (
        <section style={gridStyle}>
            <div className={`${panelCss.card}`}>
                        {props.children}
            </div>
        </section>
    )
}

//change hardcoded to later
export const PanelLeaf = (props: {
    rowBegin: number
    rowEnd: number
    colBegin: number
    colEnd: number
    queryParam: HomeQueryOptions
    children: ReactNode
}) => {
    const gridStyle = {
        gridRow: `${props.rowBegin}/${props.rowEnd}`,
        gridColumn: `${props.colBegin}/${props.colEnd}`
    }

    return (
        <section style={gridStyle}>
            <div className={`${panelCss.card}`}>
                    <Link to='/' search={()=>({highlight: props.queryParam})} className={`${panelCss.link}`}>
                        {props.children}
                    </Link>
            </div>
        </section>
    )
}

export const PanelInfo = (props: {
    rowBegin: number
    rowEnd: number
    colBegin: number
    colEnd: number
    children: ReactNode
}) => {
    const gridStyle = {
        gridRow: `${props.rowBegin}/${props.rowEnd}`,
        gridColumn: `${props.colBegin}/${props.colEnd}`
    }

    return (
        <section style={gridStyle}>
            <div className={`${panelCss.card}`}>
                        {props.children}
            </div>
        </section>
    )
}

export const PanelContent = (props : {
    items: string[]
    title?: string
}) => {
    return (
        <>
            {props.title && 
                <div className={`${panelCss.title}`}>
                    <h2>{props.title}</h2>
                </div>
            }
            <div className={`${panelCss.points}`}>
            <ul className={`${panelCss.list_flex}`}>
            {props.items.map((item)=>{
                return <li key={item}>{item}</li>
            })}
            </ul>
            </div>
        </>
    )
}

export const PanelRow = (props: {
    children: ReactNode
    }) => {
    return (
        <article className={`${panelCss.panel_row}`}>
            {props.children}
        </article>
    )
}

export const PanelCol = (props: {
    children: ReactNode
    }) => {
    return (
        <article className={`${panelCss.panel_col}`}>
            {props.children}
        </article>
    )
}
