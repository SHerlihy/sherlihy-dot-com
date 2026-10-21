import { type ReactNode, useEffect, useRef } from "react";

type Props = {
  chat: string[];
  intro: ReactNode;
};

function ChatView({ chat, intro }: Props) {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatBox = chatBoxRef.current;

    if (!chatBox) {
      return;
    }

    const answers = chatBox.children;

    if (answers.length < 1) {
      return;
    }

    const currentAnswer = answers.item(answers.length - 1);

    currentAnswer?.scrollIntoView();
  });

  return (
    <div
      ref={chatBoxRef}
      className="min-h-full whitespace-pre-line flex flex-col justify-center align-center"
    >
      {intro}
      <ul>
        {chat.map((utter, i) => (
          <div key={i}>
            &nbsp;
            <hr />
            &nbsp;
            <li
              className={`
                        ${i % 2 === 0 && "text-right"}
                    `}
            >
              {utter}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ChatView;
