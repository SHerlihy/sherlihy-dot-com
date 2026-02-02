import { useMutation } from '@tanstack/react-query'
import QueryView from './QueryView'
import { useEffect, useState } from 'react'
import { Phase } from './components/controlButton/ControlButton'

export const FEEDBACK_READY = "submit"
export const FEEDBACK_ERROR = "retry?"
export const FEEDBACK_PENDING = "cancel?"

type Props = {
    postQuery: (story: string) => Promise<void>,
    abortQuery: (reason?: any) => void
}

function QueryModel({
    postQuery,
    abortQuery
}: Props) {
    const [feedback, setFeedback] = useState(FEEDBACK_READY)
    const [phase, setPhase] = useState<Phase>("ready")

    const { data, mutateAsync, isError, isPending, isSuccess } = useMutation({
        mutationFn: postQuery
    })

    useEffect(() => {

        if (isSuccess) {
            setPhase("ready")
            setFeedback(FEEDBACK_READY)
            return
        }

        if (isError) {
            setPhase("error")
            setFeedback(FEEDBACK_ERROR)
            return
        }

        if (isPending) {
            setPhase("pending")
            setFeedback(FEEDBACK_PENDING)
            return
        }

    }, [isPending, isError, data])

    const handleClick = (handleQuery: () => void) => {
        switch (phase) {
            case "ready":
                handleQuery()
                break;
            case "pending":
                abortQuery()
                break;
            case "error":
                handleQuery()
                break;
            case 'confirm':
                setPhase("ready")
                break;
            case 'idle':
                break;

            default:
                setPhase("ready")
                break;
        }
    }

    return (
        <QueryView
            feedback={feedback}
            phase={phase}
            handleQuery={async (query) => { await mutateAsync(query) }}
            handleClick={handleClick}
        />
    )
}

export default QueryModel
