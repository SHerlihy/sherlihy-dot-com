import { stringLineBreaksToBreakLine } from "../../lib/strings"
import { config } from "../../config.ts";

const QUERY_URL = new URL(config.queryUrl);

type QueryResponse = Response

interface IQueryControl {
    postQuery: (query: string) => Promise<QueryResponse>
    demarshall: (res: QueryResponse) => Promise<string>
    abortQuery: (reason?: unknown) => void
}

class QueryControl implements IQueryControl {
    controller = new AbortController()

    constructor() {}

    postQuery = async (query: string): Promise<QueryResponse> => {

        this.controller = new AbortController()

        const response = await this.queryRequest(query)

        if (response.status !== 200) {
            throw Error(`Query status: ${response.status}`)
        }

        return response
    }

    demarshall = async (queryRes: QueryResponse) => {
        return stringLineBreaksToBreakLine(
            await queryRes.text()
        )
    }

    abortQuery = (reason?: unknown) => {
        this.controller.abort(reason)
    }

    queryRequest = async (query: string) => {
        return await fetch(QUERY_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "X-API-Key": config.queryApiKey,
            },
            mode: "cors",
            signal: this.controller.signal,
            body: query
        })
    }
}

export default QueryControl
