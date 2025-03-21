import { ReactNode } from "react"
import { PanelLayout, PanelLeaf } from "../../panels/Panel"
import useIsDesktop from "../hooks/useIsDesktop"

function LeafCommon({ children }: { children: ReactNode }) {
    const isDesktop = useIsDesktop()

    return (
        <>
            <PanelLeaf
                gridPos={isDesktop ?
                    {
                        rowStart: 2,
                        rowEnd: 5,
                        colStart: 2,
                        colEnd: 9
                    }
                    :
                    {
                        rowStart: 1,
                        rowEnd: 5,
                        colStart: 1,
                        colEnd: 6
                    }
                }
                queryParam="highlight"
                pathname="/"
            >
                <div className='w-full h-full flex justify-center items-center'>
                    <h2>
                        Home
                    </h2>
                </div>
            </PanelLeaf>

            <PanelLayout
                gridPos={isDesktop ?
                    {
                        rowStart: 2,
                        rowEnd: 5,
                        colStart: 25,
                        colEnd: 32
                    }
                    :
                    {
                        rowStart: 1,
                        rowEnd: 5,
                        colStart: 6,
                        colEnd: 19
                    }
                }
            >
                <section className="w-full h-full">
                    <article className="text-center">
                        <p>+44 73544 30588</p>
                        <hr />
                        <p>steven_herlihy@yahoo.com</p>
                    </article>
                </section>
            </PanelLayout>
            <PanelLayout
                gridPos={isDesktop ?
                    {
                        rowStart: 2,
                        rowEnd: 15,
                        colStart: 9,
                        colEnd: 25
                    }
                    :
                    {
                        rowStart: 5,
                        rowEnd: 24,
                        colStart: 1,
                        colEnd: 19
                    }
                }
            >
                {children}
            </PanelLayout>
        </>
    )
}

export default LeafCommon
