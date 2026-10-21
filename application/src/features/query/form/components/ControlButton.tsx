export type Status = "idle" | "pending" | "success" | "error";

export type Props = {
  status: Status;
  onClick: () => void;
} & React.ComponentProps<"button">;

const ControlButton = ({ status, onClick, ...props }: Props) => {
  return (
    <button
      className={`
                w-full
${(() => {
  switch (status) {
    case "error":
      return "hover:bg-red-400 bg-red-500";
    case "pending":
      return "hover:bg-yellow-400 bg-yellow-500";
    case "success":
      return "hover:bg-lime-400 bg-lime-500";
    case "idle":
      return "cursor-pointer hover:bg-[rgba(127,127,127,0.7)] bg-[rgba(127,127,127,0.5)]";
  }
})()}
            `}
      onClick={onClick}
      {...props}
    >
      {(() => {
        switch (status) {
          case "error":
            return <p>retry?</p>;
          case "pending":
            return <p>cancel?</p>;
          case "idle":
          case "success":
            return <p>submit</p>;
          default:
            return null;
        }
      })()}
    </button>
  );
};

export default ControlButton;
