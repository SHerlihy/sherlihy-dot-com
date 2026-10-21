import { useForm, useSelector } from "@tanstack/react-form";
import ControlButton, { type Status } from "./components/ControlButton";
import Field from "./components/Field";

import z from "zod";

const schema = z.object({
  query: z.string(),
});

type Props = {
  status: Status;
  defaultValues: z.infer<typeof schema>;
  handleSubmit: (query: string) => Promise<void>;
};

function FormView({ status, defaultValues, handleSubmit }: Props) {
  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onChange: schema,
      onMount: schema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await handleSubmit(value.query);
      } catch (err) {
        if (err instanceof Error && err.message) {
          throw err;
        }

        throw new Error("Unable to submit");
      }
      formApi.reset();
    },
  });

  const query = useSelector(form.store, (state)=>state.values.query)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onChange={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <form.Field
        name="query"
        children={(field) => (
          <Field
            name={field.name}
            value={field.state.value}
            errors={field.state.meta.errorMap.onChange}
            className="w-full"
            onInputSubmit={form.handleSubmit}
            onInputChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      />
      <ControlButton status={status} disabled={query===""} onClick={form.handleSubmit} />
    </form>
  );
}

export default FormView;
