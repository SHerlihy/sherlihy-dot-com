import { useMutation } from "@tanstack/react-query";

import FormView from "./FormView.tsx";

type Props = {
  postQuery: (story: string) => Promise<void>;
  abortQuery: (reason?: unknown) => void;
};

function FormControl({ postQuery, abortQuery }: Props) {
  const { status, mutateAsync } = useMutation({
    mutationFn: postQuery,
  });

  const handleSubmit = async (query: string) => {
    switch (status) {
      case "pending":
        abortQuery();
        break;
      case "error":
      case "idle":
      case "success":
        await mutateAsync(query);
        break;
      default:
        throw new TypeError("status not correct");
    }
  };


  return (
    <FormView
      status={status}
      defaultValues={{ query: "" }}
      handleSubmit={handleSubmit}
    />
  );
}

export default FormControl;
