import { ReactElement, ReactNode, Ref, useEffect, useRef, useState } from "react"
import HighlightDesktopImage from "../shared/components/HighlightDesktopImage"
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
    const chatBoxRef = useRef<HTMLDivElement>(null)

    const handlePostQuery = async (query: string) => {
        const [error, response] = await catchError(postQuery(query))

        if (error) {
            throw error
        }

        const answer = await demarshall(response)

        setChat((prev) => [...prev, query, answer])
    }

    useEffect(() => {
        const chatBox = chatBoxRef.current

        if(!chatBox){return}

        const answers = chatBox.children

        if(answers.length < 1){return}

        const currentAnswer = answers.item(answers.length-1)

        currentAnswer?.scrollIntoView()
    })

    return (
        <article className="h-full p-4 flex flex-col justify-between">
            <div
                className="flex-1 overflow-scroll p-4 scroll-p-20"
            >
                <div
                    ref={chatBoxRef}
                    className="min-h-full whitespace-pre-line flex flex-col justify-center align-center">
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
                <p className="inline-block">
                    <HighlightDesktopImage>
                        <SherlihyImage />
                    </HighlightDesktopImage>
                    {introText}
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-center">
                <SherlihyImage />
            </div>
            <p className="pt-4 inline-block">
                {introText}
            </p>
        </>
    )
}

export default HomeHighlight
