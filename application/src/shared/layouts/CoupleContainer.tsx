import React, { ComponentType, ReactNode } from "react"

import containerCss  from "./CoupleContainer.module.css"

const CoupleContainer = (props: {
    TlImg: ComponentType,
    BrImg: ComponentType
}) => {
    const TopLeftImg = props.TlImg
    const BottomRightImg = props.BrImg
    return (
        <div className={`${containerCss.container} ${containerCss.imageDefaults}`}>
            <div className={`${containerCss.br}`} >
                <BottomRightImg/>
            </div>
            <div className={`${containerCss.tl}`} >
                <TopLeftImg/>
            </div>
        </div>
    )
}

export default CoupleContainer
