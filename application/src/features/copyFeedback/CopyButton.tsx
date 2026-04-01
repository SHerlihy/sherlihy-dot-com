import { useState } from "react";
import { CopyIcon } from "../../shared/icons";

function CopyButton({ content }: { content: string }) {
    const [feedbackColor, setFeedbackColor] = useState('')

    function updateClipboard() {
        navigator.clipboard.writeText(content).then(
            () => {
                setFeedbackColor('fill-lime-500')
                /* clipboard successfully set */
            },
            () => {
                setFeedbackColor('fill-red-500')
                /* clipboard write failed */
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
${feedbackColor}
 `}
            />
        </button>
    )
}

export default CopyButton
