import { useState } from "react"
import HighlightDesktopImage from "../shared/components/HighlightDesktopImage"
import HighlightMobileContent from "../shared/components/HighlightMobileContent"
import HighlightMobileImage from "../shared/components/HighlightMobileImage"
import useIsDesktop from "../shared/hooks/useIsDesktop"
import SherlihyImage from "./SherlihyImage"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import QueryModel from "../features/query/QueryModel"
import QueryControl from "../features/query/QueryControl"

import { catchError } from "../lib/async.ts"

const queryClient = new QueryClient()

const QUERY_URL = "https://rtuard82z7.execute-api.us-east-1.amazonaws.com/prod/query/"

const { postQuery, demarshall, abortQuery } = new QueryControl(QUERY_URL)

const HomeHighlight = () => {
    const [chat, setChat] = useState<string[]>([])

    const handlePostQuery = async (query: string) => {
        const [error, response] = await catchError(postQuery(query))

        if (error) {
            throw error
        }

        const answer = await demarshall(response)

        setChat((prev) => [...prev, query, answer])
    }

    return (
        <article className="h-full flex flex-col justify-between">
            <div
                className="flex-1 overflow-scroll scroll-smooth"
            >
                <div className="min-h-full whitespace-pre-line flex flex-col justify-center align-center">
                    <Intro />
                    {chat.map((utter, i) => <div key={i}>
                        &nbsp;
                        <hr />
                        &nbsp;
                        <p
                            className={`
                        ${i % 2 === 0 && "text-right"}
                    `}
                        >
                            {utter}
                        </p>
                    </div>
                    )}
                </div>
            </div>
            <div className="py-4">
                <hr className="pb-4" />
                <QueryClientProvider client={queryClient}>
                    <QueryModel
                        postQuery={handlePostQuery}
                        abortQuery={abortQuery}
                    />
                </QueryClientProvider>
            </div>
        </article>
    )
}

const introText = "\
    Welcome to my website!\
    \n \
    \n \
    Here you’ll find events, projects and hobbies that I enjoy so you can get to know me better.\
    \n \
    I spend the majority of my time helping Amazon improve their Alexa AI model but I also find time to practice my web development skills.\
    \n \
"

const Intro = () => {
    const isDesktop = useIsDesktop()

    if (isDesktop) {
        return (
            <div className="flex justify-center">
                <HighlightDesktopImage>
                    <SherlihyImage />
                </HighlightDesktopImage>
                <p className="inline-block">
                    {introText}
                </p>
            </div>
        )
    }

    return (
        <>
            <HighlightMobileImage>
                <SherlihyImage />
            </HighlightMobileImage>
            <span className='pb-4' />
            <HighlightMobileContent>
                {introText}
            </HighlightMobileContent>
        </>
    )
}

export default HomeHighlight
