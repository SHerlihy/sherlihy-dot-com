import { useContext } from "react";
import { CopyIcon } from "../../shared/icons";
import { CopyFeedbackContext } from "./CopyFeedbackContext.tsx";

function CopyButton({ id, content, className = "" }: { id: string, content: string, className: string }) {
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
${className}
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
