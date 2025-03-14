import { ReactNode } from 'react'
import useIsDesktop from '../hooks/useIsDesktop'

const FlexDirectionOnDesktop = ({
    reverse,
    children
}: {
    reverse?: boolean,
    children: ReactNode
}) => {
    const isDesktop = useIsDesktop()

    return (
        <div className={`
w-full h-full
${+isDesktop ^ +!!reverse ?
                "" :
                "flex flex-col justify-center items-center"}
`}>{children}</div>
    )
}

export default FlexDirectionOnDesktop
