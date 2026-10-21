import { type ChangeEvent } from "react";
import { StandardSchemaV1Issue } from "@tanstack/react-form";

type Props = {
  name: string;
  value: string;
  onInputSubmit: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: StandardSchemaV1Issue[];
} & React.ComponentProps<"div">;

function Field({
  name,
  value,
  onInputSubmit,
  onInputChange,
  errors,
  ...props
}: Props) {
  return (
    <div {...props}>
      <input
        type="text"
        placeholder="What would you like to know?"
        className={`
                    ${"firefox" === true && "field-sizing-content"}
                    h-full w-full
                    outline-double
                `}
        name={name}
        value={value}
        onSubmit={onInputSubmit}
        onChange={onInputChange}
      />
      <p>
        {errors && errors.length > 0 ? (
          errors.map((fErr) => fErr.message)
        ) : (
          <>&nbsp;</>
        )}
      </p>
    </div>
  );
}

export default Field;
