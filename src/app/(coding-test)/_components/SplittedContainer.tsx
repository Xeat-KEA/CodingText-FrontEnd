import { Splitter, SplitterPanel } from "primereact/splitter";
import ChattingPanel from "./ChattingPanel";
import ChatInput from "./ChatInput";
import CodeEditPanel from "./CodeEditPanel";
import NewPostPanel from "./NewPostPanel";
import { useChatStore, useCodingTestStore, useTokenStore } from "@/app/stores";
import { ContainerProps } from "../_interface/interfaces";
import { useEffect, useState } from "react";
import CodeContentPanel from "./CodeContentPanel";

export default function SplittedContainer({
  content,
  historyId,
  difficulty,
}: ContainerProps) {
  const { isPosting } = useCodingTestStore();
  const { accessToken } = useTokenStore();

  const [panelSize, setPanelSize] = useState([50, 50]);
  const { isLoading, newChats } = useChatStore();

  const [stateKey, setStateKey] = useState(0);
  useEffect(() => {
    if (isLoading) {
      setStateKey((prev) => prev + 1);
      setPanelSize([50, 50]);
    }
  }, [isLoading]);

  return (
    <Splitter gutterSize={10} className="w-full h-screen pt-16 flex">
      {/* 채팅창 공간 */}
      <SplitterPanel>
        {accessToken ? (
          <div className="flex flex-col w-full h-full">
            <div className="h-[calc(100%-96px)]">
              <Splitter
                key={stateKey + ""}
                layout="vertical"
                gutterSize={10}
                className="flex flex-col w-full h-full"
              >
                <SplitterPanel className="flex" size={panelSize[0]}>
                  <CodeContentPanel content={content} />
                </SplitterPanel>
                <SplitterPanel
                  className="flex overflow-hidden"
                  size={panelSize[1]}
                >
                  <ChattingPanel historyId={historyId} newChats={newChats} />
                </SplitterPanel>
              </Splitter>
            </div>
            <ChatInput historyId={historyId} />
          </div>
        ) : (
          <div className="h-full">
            <CodeContentPanel content={content} />
          </div>
        )}
      </SplitterPanel>
      {/* 작성 관련 공간 */}
      <SplitterPanel className="flex">
        {!isPosting ? (
          <CodeEditPanel />
        ) : (
          <NewPostPanel difficulty={difficulty} />
        )}
      </SplitterPanel>
    </Splitter>
  );
}
