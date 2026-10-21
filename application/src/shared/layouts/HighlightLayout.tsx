import {type ReactNode} from 'react'

import HighlightDesktopLayout from "./highlight/HighlightDesktopLayout"
import HighlightMobileLayout from "./highlight/HighlightMobileLayout"
import useIsDesktop from "@/shared/hooks/useIsDesktop"

type Props = {
  image: ReactNode,
  content: ReactNode
}

const HighlightLayout = (
  {
    image,
    content
  }: Props
) => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <HighlightDesktopLayout
                image={image}
                content={content}
            />
        )
    }

    return (
        <HighlightMobileLayout
                image={image}
                content={content}
        />
    )
}

export default HighlightLayout
