import { Splitter, SplitterPanel } from "primereact/splitter";
import CodeChatPanel from "./CodeChatPanel";
import ChattingPanel from "./ChattingPanel";
import ChatInput from "./ChatInput";
import CodeEditPanel from "./CodeEditPanel";
import NewPostPanel from "./NewPostPanel";
import { useCodingTestStore } from "@/app/stores";
import { ContainerProps } from "../_interface/interfaces";
import { useEffect, useState } from "react";

export default function SplittedContainer({ content, chats }: ContainerProps) {
  const { isPosting } = useCodingTestStore();

  const [panelSize, setPanelSize] = useState([99, 1]);
  const [isRunning, setIsRunning] = useState(false);
  const onSubmit = () => {
    setIsRunning(true);
    // api 호출
  };
  const [stateKey, setStateKey] = useState(0);
  useEffect(() => {
    if (isRunning) {
      setStateKey((prev) => prev + 1);
      setPanelSize([50, 50]);
    }
  }, [isRunning]);

  return (
    <Splitter gutterSize={10} className="w-full h-screen pt-16 flex">
      {/* 채팅창 공간 */}
      <SplitterPanel>
        <div className="flex flex-col w-full h-full">
          <div className="h-full grow">
            <Splitter
              key={stateKey + ""}
              layout="vertical"
              gutterSize={10}
              className="flex flex-col w-full h-full"
            >
              <SplitterPanel className="flex" size={panelSize[0]}>
                <CodeChatPanel content={content} />
              </SplitterPanel>
              <SplitterPanel
                className="flex overflow-hidden"
                size={panelSize[1]}
              >
                <ChattingPanel chats={chats} />
              </SplitterPanel>
            </Splitter>
          </div>
          <ChatInput onSubmit={onSubmit} />
        </div>
      </SplitterPanel>
      {/* 작성 관련 공간 */}
      <SplitterPanel className="flex">
        {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
      </SplitterPanel>
    </Splitter>
  );
}
