type QueryResponse = Response

interface IQueryControl {
    postQuery: (query: string) => Promise<QueryResponse>
    demarshall: (res: QueryResponse) => Promise<string>
    abortQuery: (reason?: any) => void
}

class QueryControl implements IQueryControl {
    controller = new AbortController()

    postUrl: string;

    constructor(postUrl: string) {
        this.postUrl = postUrl
    }

    postQuery = async (query: string): Promise<QueryResponse> => {

        this.controller = new AbortController()

        const response = await this.queryRequest(query)

        if (response.status !== 200) {
            throw Error(`Query status: ${response.status}`)
        }

        return response
    }

    demarshall = async (queryRes: QueryResponse) => {
        return await queryRes.text()
    }

    abortQuery = (reason?: any) => {
        this.controller.abort(reason)
    }

    queryRequest = async (query: string) => {
        return await fetch(this.postUrl, {
            method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            mode: "cors",
            signal: this.controller.signal,
            body: query
        })
    }
}

export default QueryControl
