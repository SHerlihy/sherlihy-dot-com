import { StandardSchemaV1Issue } from "@tanstack/react-form"

type Props = {
    name: string,
    state: string,
    handleChange: (e: string) => void,
    onSubmit: () => void,
    errors?: StandardSchemaV1Issue[],
}
    & React.ComponentProps<"div">

function Field({
    name,
    state,
    handleChange,
    onSubmit,
    errors,
    ...props
}: Props) {
    return (
        <div
            {...props}
        >
            <input
                type="text"
                placeholder="What would you like to know?"
                className={`
                    ${"firefox"===true && "field-sizing-content"}
                    h-full w-full
                    outline-double
                `}
                name={name}
                value={state}
                onChange={(e) => handleChange(e.target.value)}
                onSubmit={onSubmit}
                
            />
            <p>
                {errors && errors.length > 0 ? (
                    errors.map((fErr) => (fErr.message))
                ) : <>
                    &nbsp;
                </>
                }
            </p>
        </div>
    )
}

export default Field
