import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import Field from './components/Field'
import ControlButton, { Props as PropsControlButton } from './components/ControlButton'

const schema = z.object({
    query: z.string()
})

type FormSchema = z.infer<typeof schema>
export const formDefaults: FormSchema = {
    query: ""
}

type Props = {
    defaultValues?: FormSchema,
    handleQuery: (query: string) => Promise<void>,
    handleClick: (submit: () => Promise<void>) => void,
}
    & PropsControlButton

function QueryView({
    defaultValues = formDefaults,
    feedback,
    phase,
    handleQuery,
    handleClick
}: Props) {

    const form = useForm({
        defaultValues,
        validators: {
            onChange: schema,
            onMount: schema,
        },
        onSubmit: async ({ value }) => { await handleQuery(value.query) }
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
                        state={field.state.value}
                        handleChange={field.handleChange}
                        onSubmit={() => { handleClick(form.handleSubmit) }}
                        errors={field.state.meta.errorMap.onChange}
                        className="w-full"
                    />
                )}
            />
            <ControlButton
                feedback={feedback}
                phase={phase}
                onClick={() => { handleClick(form.handleSubmit) }}
            />
        </form >
    )
}

export default QueryView
