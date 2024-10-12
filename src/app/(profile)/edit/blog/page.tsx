"use client";

import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { useState } from "react";
import { DUMMY_BLOG_DATA } from "../../_constants/constants";
import DOMPurify from "isomorphic-dompurify";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useTiptapStore } from "@/app/stores";

export default function EditBlogPage() {
  // 변경 사항 취소를 위한 초기값 저장
  const initialData = DUMMY_BLOG_DATA;
  const [data, setData] = useState(DUMMY_BLOG_DATA);
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const { content, setContent } = useTiptapStore();

  return (
    <div className="w-full flex flex-col gap-8 px-6 pt-2 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <span className="edit-title">블로그 소개글</span>
        <div
          className={`w-full h-[400px] overflow-y-auto ${
            !isIntroEditing && "border border-border-2 rounded-2xl px-6 py-4"
          }`}
        >
          {!isIntroEditing ? (
            <div
              className="prose"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(String(data.intro)),
              }}
            />
          ) : (
            <TiptapEditor />
          )}
        </div>
        <EditBtn
          isEditing={isIntroEditing}
          onEditClick={() => {
            setContent(data.intro);
            setIsIntroEditing((prev) => !prev);
          }}
          onCancelClick={() => {
            setIsIntroEditing((prev) => !prev);
          }}
          onSubmit={() => {
            if (content !== "<p></p>") {
              setData({ intro: content });
              setIsIntroEditing((prev) => !prev);
            }
          }}
        />
      </div>
    </div>
  );
}
