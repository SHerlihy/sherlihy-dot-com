import React from "react"
import highlightCss from "./HighlightFeatureMobile.module.css"
import { ReactNode } from "react"

const HighlightFeatureMobile = (props: {
    children: ReactNode
}) => {
    return (
        <div className={`${highlightCss.feature_container}`}>
            {props.children}
        </div>
    )
}

export default HighlightFeatureMobile
