export type Phase = "idle" | "pending" | "ready" | "confirm" | "error"

export type Props = {
    phase: Phase,
    feedback: string,
}
    & React.ComponentProps<"button">

const ControlButton = ({
    phase,
    feedback,
    onClick,
}: Props) => {
    return (
        <button
            className={`
                w-full
                ${phase !== "idle" && "cursor-pointer hover:bg-[rgba(127,127,127,0.7)] bg-[rgba(127,127,127,0.5)]"}
                ${phase === "pending" && "hover:bg-yellow-400 bg-yellow-500"}
                ${phase === "confirm" && "hover:bg-lime-400 bg-lime-500"}
                ${phase === "error" && "hover:bg-red-400 bg-red-500"}
            `}
            disabled={phase === "idle"}
            onClick={onClick}
        >
            {feedback}
        </button>
    )
}

export default ControlButton
