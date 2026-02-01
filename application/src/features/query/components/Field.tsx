import { StandardSchemaV1Issue } from "@tanstack/react-form"

function Field({
    name,
    state,
    handleChange,
    errors
}: {
    name: string,
    state: string,
    handleChange: (e: string)=>void,
    errors?: StandardSchemaV1Issue[],
}) {
    return (
        <>
            <textarea
                ref={(textarea) => {
                    if (textarea) {
                        textarea.style.height = "0px";
                        textarea.style.height = textarea.scrollHeight + "px";
                    }
                }}
                placeholder="What would you like to know?"
                className={"h-full overflow-hidden"}
                name={name}
                value={state}
                onChange={(e) => handleChange(e.target.value)}
            />
            <p>
                {errors && errors.length > 0 ? (
                    errors.map((fErr) => (fErr.message))
                ) : <>
                    &nbsp;
                </>
                }
            </p>
        </>
    )
}

export default Field
