import { useCodingTestStore, useTokenStore } from "@/app/stores";
import CodeChatPanel from "./CodeChatPanel";
import ChattingPanel from "./ChattingPanel";
import ChatInput from "./ChatInput";
import CodeEditPanel from "./CodeEditPanel";
import NewPostPanel from "./NewPostPanel";
import { ContainerProps } from "../_interface/interfaces";

export default function UnsplittedContainer({
  content,
  chats,
}: ContainerProps) {
  const { isPosting } = useCodingTestStore();
  const { accessToken } = useTokenStore();
  return (
    <div className="w-full pt-16 flex flex-col">
      <CodeChatPanel content={content} />
      {accessToken && <ChattingPanel chats={chats} />}
      <ChatInput onSubmit={() => {}} />
      {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
    </div>
  );
}
