import { ComponentType } from "react"

import useIsDesktop from "../hooks/useIsDesktop"

const CoupleContainer = (props: {
    TlImg: ComponentType,
    BrImg: ComponentType
}) => {
    const TopLeftImg = props.TlImg
    const BottomRightImg = props.BrImg

    const isDesktop = useIsDesktop()
    return (
        <div className={`
w-full h-full
${isDesktop && "grid grid-cols-9 grid-rows-9"}
${!isDesktop && "flex flex-row-reverse justify-center items-center"}
`}>
            <div className={`
h-full 
${isDesktop && "col-start-4 col-end-9 row-start-4 row-end-9"}
`} >
                <BottomRightImg />
            </div>
            <div className={`
h-full 
${isDesktop && "col-start-1 col-end-7 row-start-1 row-end-7"}
`}>
                <TopLeftImg />
            </div>
        </div>
    )
}

export default CoupleContainer
