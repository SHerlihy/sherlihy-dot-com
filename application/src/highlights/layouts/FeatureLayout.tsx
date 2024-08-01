import { ReactNode } from "react"
import useIsDesktop from "../../shared/hooks/useIsDesktop"
import highlightCss from "../Highlight.module.css"

function FeatureLayout (props: {
    children: ReactNode
}) {
    const isDesktop = useIsDesktop();

    return (
    <>
        {isDesktop &&
            <div className={`${highlightCss.hide_overflow, highlightCss.container_standout_desktop}`}>
                {props.children}
            </div>
        }
        {!isDesktop &&
            <div className={`${highlightCss.hide_overflow, highlightCss.container_standout_mobile}`}>
                {props.children}
            </div>
        }
    </>
    )
}

export default FeatureLayout;
