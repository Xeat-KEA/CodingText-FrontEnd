"use client";

import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { useState } from "react";
import { DUMMY_BLOG_DATA } from "../../_constants/constants";
import DOMPurify from "isomorphic-dompurify";

export default function EditBlogPage() {
  // 변경 사항 취소를 위한 초기값 저장
  const initialData = DUMMY_BLOG_DATA;
  const [data, setData] = useState(DUMMY_BLOG_DATA);
  const [isIntroEditing, setIsIntroEditing] = useState(false);

  return (
    <div className="w-full flex flex-col gap-8 px-6 pt-2 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <span className="edit-title">블로그 소개글</span>
        <div className="w-full h-[400px] border border-border-2 rounded-2xl px-6 py-4 overflow-y-auto">
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(String(data.intro)),
            }}
          />
        </div>
        <EditBtn
          isEditing={isIntroEditing}
          onEditClick={() => setIsIntroEditing((prev) => !prev)}
          onCancelClick={() => {
            setIsIntroEditing((prev) => !prev);
          }}
          onSubmit={() => {
            console.log("hi");
          }}
        />
      </div>
    </div>
  );
}
