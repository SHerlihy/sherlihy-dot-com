import { StandardSchemaV1Issue } from "@tanstack/react-form"

type Props = {
    name: string,
    state: string,
    handleChange: (e: string) => void,
    errors?: StandardSchemaV1Issue[],
}
    & React.ComponentProps<"div">

function Field({
    name,
    state,
    handleChange,
    errors,
    ...props
}: Props) {
    return (
        <div
            {...props}
        >
            <textarea
                // ref={(textarea) => {
                //     if (textarea) {
                //         textarea.style.height = "0px";
                //         textarea.style.height = textarea.scrollHeight + "px";
                //     }
                // }}
                placeholder="What would you like to know?"
//                 style={{
// height: "attr(style.scrollHeight px)"
// }}
                className={`
${"firefox"===true && "field-sizing-content"}
h-full w-full
`}
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
        </div>
    )
}

export default Field
