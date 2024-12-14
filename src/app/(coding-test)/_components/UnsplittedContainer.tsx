import { useChatStore, useCodingTestStore, useTokenStore } from "@/app/stores";
import ChattingPanel from "./ChattingPanel";
import ChatInput from "./ChatInput";
import CodeEditPanel from "./CodeEditPanel";
import NewPostPanel from "./NewPostPanel";
import { ContainerProps } from "../_interface/interfaces";
import CodeContentPanel from "./CodeContentPanel";

export default function UnsplittedContainer({
  content,
  historyId,
  difficulty,
}: ContainerProps) {
  const { isPosting } = useCodingTestStore();
  const { accessToken } = useTokenStore();

  const { newChats } = useChatStore();
  return (
    <div className="w-full pt-16 flex flex-col">
      <CodeContentPanel content={content} />
      {accessToken && (
        <>
          <ChattingPanel newChats={newChats} historyId={historyId} />
          <ChatInput historyId={historyId} />
        </>
      )}
      {!isPosting ? (
        <CodeEditPanel />
      ) : (
        <NewPostPanel difficulty={difficulty} />
      )}
    </div>
  );
}
