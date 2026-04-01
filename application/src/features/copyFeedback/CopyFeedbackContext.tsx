import { createContext, ReactNode, useState } from 'react';

type ElementFeedback = {
    elementId: string,
    feedbackColor: string
}

export const CopyFeedbackContext = createContext({
    elementFeedback: {
        elementId: "",
        feedbackColor: ""
    },
    handleSetElementFeedback: (elementId: string, feedbackColor: string) => { }
});

export function CopyFeedbackProvider({ children }: { children: ReactNode }) {
    const [elementFeedback, setElementFeedback] = useState<ElementFeedback>({
        elementId: "",
        feedbackColor: ""
    });

    const handleSetElementFeedback = (elementId: string, feedbackColor: string) => {
        setElementFeedback({
            elementId: elementId,
            feedbackColor: feedbackColor
        })
    }

    return (
        <CopyFeedbackContext value={{ elementFeedback, handleSetElementFeedback }}>
            {children}
        </CopyFeedbackContext>
    )
}
