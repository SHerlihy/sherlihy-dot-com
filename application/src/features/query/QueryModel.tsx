import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import z from 'zod'
import { useForm } from '@tanstack/react-form'
import ControlButton, { Phase } from './components/ControlButton'
import Field from './components/Field'

const schema = z.object({
    query: z.string()
})

type FormSchema = z.infer<typeof schema>
export const formDefaults: FormSchema = {
    query: ""
}

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
    const [query, setQuery] = useState("")
    const [feedback, setFeedback] = useState(FEEDBACK_READY)
    const [phase, setPhase] = useState<Phase>("ready")

    const { data, mutateAsync, isError, isPending, isSuccess } = useMutation({
        mutationFn: postQuery
    })

    useEffect(() => {

        if (isSuccess) {
            setPhase("ready")
            setFeedback(FEEDBACK_READY)
            setQuery("")
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

    const handlePhase = (handleQuery: () => void) => {
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

    const form = useForm({
        defaultValues: formDefaults,
        validators: {
            onChange: schema,
            onMount: schema,
        },
        onSubmit: async ({ value }) => {
            handlePhase(
                async () => { await mutateAsync(value.query) }
            )
        }
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onChange={(e) => {
                e.preventDefault()
                e.stopPropagation()
            }}
        >
            <form.Field
                name="query"
                children={(field) => (
                    <Field
                        name={field.name}
                        value={query}
                        handleChange={(e) => {
                            field.handleChange(e)
                            setQuery(e)
                        }}
                        onSubmit={form.handleSubmit}
                        errors={field.state.meta.errorMap.onChange}
                        className="w-full"
                    />
                )}
            />
            <ControlButton
                feedback={feedback}
                phase={phase}
                onClick={form.handleSubmit}
            />
        </form >
    )
}

export default QueryModel
