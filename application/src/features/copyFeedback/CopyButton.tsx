import { useContext } from "react";
import { CopyIcon } from "../../shared/icons";
import { CopyFeedbackContext } from "./CopyFeedbackContext.tsx";

function CopyButton({ id, content }: { id: string, content: string }) {
    const { elementFeedback, handleSetElementFeedback } = useContext(CopyFeedbackContext)

    function updateClipboard() {
        navigator.clipboard.writeText(content).then(
            () => {
                handleSetElementFeedback(id, 'fill-lime-500')
            },
            () => {
                handleSetElementFeedback(id, 'fill-red-500')
            },
        );
    }

    return (
        <button className={`
cursor-pointer
`}
            onClick={() => updateClipboard()}
        >
            <CopyIcon
                className={`
${id === elementFeedback.elementId && elementFeedback.feedbackColor}
 `}
            />
        </button>
    )
}

export default CopyButton
