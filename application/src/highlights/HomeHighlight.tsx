import HighlightDesktopImage from "../shared/components/HighlightDesktopImage"
import HighlightMobileContent from "../shared/components/HighlightMobileContent"
import HighlightMobileImage from "../shared/components/HighlightMobileImage"
import useIsDesktop from "../shared/hooks/useIsDesktop"
import SherlihyImage from "./SherlihyImage"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import QueryModel from "../features/query/QueryModel"
import QueryControl from "../features/query/QueryControl"

import QueryView from "../features/query/QueryView"

import {catchError} from "../lib/async.ts"

const queryClient = new QueryClient()

const QUERY_URL = "https://rtuard82z7.execute-api.us-east-1.amazonaws.com/prod/query/"

const { postQuery, demarshall, abortQuery } = new QueryControl(QUERY_URL)

const HomeHighlight = () => {
    const handlePostQuery = async (query: string) => {
        const [error, response] = await catchError(postQuery(query))

        if (error) {
            throw error
        }

        const answer = await demarshall(response)

        console.log(answer)
        return answer
    }

    return (
        <QueryClientProvider client={queryClient}>
            <QueryModel
                postQuery={handlePostQuery}
                abortQuery={abortQuery}
            />
        </QueryClientProvider>
    )
}

const Content = () => {
    return (
        <>
            <p>
                Welcome to my website!
            </p>
            &nbsp;
            <p>
                Here you’ll find events, projects and hobbies that I enjoy so you can get to know me better.
            </p>
            &nbsp;
            <p>
                I spend the majority of my time helping Amazon improve their Alexa AI model but I also find time to practice my web development skills.
            </p>
            &nbsp;
            <p>
                I’m currently studying for my AWS DevOps Professional certification and examples of my DevOps work can be found here &nbsp;
                <a
                    href={"https://github.com/SHerlihy/cantrill-devops"}>
                    cantrill-devops
                </a>.
            </p>
        </>
    )
}

export default HomeHighlight
