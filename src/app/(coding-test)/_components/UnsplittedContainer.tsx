import { useChatStore, useCodingTestStore, useTokenStore } from "@/app/stores";
import ChattingPanel from "./ChattingPanel";
import ChatInput from "./ChatInput";
import CodeEditPanel from "./CodeEditPanel";
import NewPostPanel from "./NewPostPanel";
import { ContainerProps } from "../_interface/interfaces";
import CodeContentPanel from "./CodeContentPanel";

export default function UnsplittedContainer({
  content,
  chats,
}: ContainerProps) {
  const { isPosting } = useCodingTestStore();
  const { accessToken } = useTokenStore();

  const { setIsLoading } = useChatStore();
  const onSubmit = () => {
    setIsLoading(true);
    // api 호출
    setIsLoading(false);
  };
  return (
    <div className="w-full pt-16 flex flex-col">
      <CodeContentPanel content={content} />
      {accessToken && (
        <>
          <ChattingPanel chats={chats} />
          <ChatInput onSubmit={(data) => {}} />
        </>
      )}
      {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
    </div>
  );
}
