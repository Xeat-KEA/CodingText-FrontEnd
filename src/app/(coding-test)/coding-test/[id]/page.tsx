"use client";

import { Splitter, SplitterPanel } from "primereact/splitter";
import { dummyChats } from "../../_constants/constants";
import ChatInput from "../../_components/ChatInput";
import CodeEditPanel from "../../_components/CodeEditPanel";
import { useCodingTestStore } from "@/app/stores";
import NewPostPanel from "../../_components/NewPostPanel";
import DOMPurify from "isomorphic-dompurify";

export default function CodingTestPage() {
  const { isPosting } = useCodingTestStore();
  return (
    <Splitter className="w-full h-screen pt-16 flex">
      {/* 채팅창 공간 */}
      <SplitterPanel className="bg-bg-1 flex flex-col">
        {/* 메세지 표시 공간 */}
        <div className="grow flex flex-col px-6 py-8 gap-6 overflow-y-auto">
          {dummyChats.map((chat, index) => (
            <div
              key={index}
              className={`bubble ${
                chat.role === "gpt"
                  ? "bg-white"
                  : "bg-primary font-bold self-end"
              }`}
              style={{ color: chat.role === "user" ? "white !important" : "" }}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(chat.content),
              }}
            />
          ))}
        </div>
        {/* 채팅 입력칸 */}
        <div className="px-6 pb-8">
          <ChatInput />
        </div>
      </SplitterPanel>
      {/* 작성 관련 공간 */}
      <SplitterPanel className="flex w-full">
        {!isPosting ? <CodeEditPanel /> : <NewPostPanel />}
      </SplitterPanel>
    </Splitter>
  );
}
