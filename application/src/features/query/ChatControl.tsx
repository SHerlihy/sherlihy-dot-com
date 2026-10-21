import { type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { catchError } from "@/lib/async.ts";

import ChatModel from "./ChatModel.ts";

import ChatView from "./ChatView.tsx";
import FormControl from "./form/FormControl.tsx";

const queryClient = new QueryClient();

const { postQuery, demarshall, abortQuery } = new ChatModel();

type Props = {
  intro: ReactNode;
};

function ChatControl({ intro }: Props) {
  const [chat, setChat] = useState<string[]>([]);

  const handlePostQuery = async (query: string) => {
    const [error, response] = await catchError(postQuery(query));

    if (error) {
      throw error;
    }

    const answer = await demarshall(response);

    setChat((prev) => [...prev, query, answer]);
  };

  return (
    <article className="h-full p-4 flex flex-col justify-between">
      <div className="flex-1 overflow-scroll p-4 scroll-p-20">
        <ChatView chat={chat} intro={intro} />
      </div>
      <div className="py-4">
        <hr className="pb-4" />
        <QueryClientProvider client={queryClient}>
          <FormControl postQuery={handlePostQuery} abortQuery={abortQuery} />
        </QueryClientProvider>
      </div>
    </article>
  );
}

export default ChatControl;
