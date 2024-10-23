"use client";

import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useTiptapStore } from "@/app/stores";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import api from "@/app/_api/config";
import { useBase64 } from "@/app/_hooks/useBase64";

export default function EditBlogPage() {
  // 로그인 여부 확인
  const {} = useCheckToken(true);

  // 프로토타입 API 블로그 정보 GET
  useEffect(() => {
    api.get("/blog/1").then((res) => {
      const blogProfile = res.data.data.blogProfile;
      console.log(blogProfile);
      const decodedContent = useBase64("decode", blogProfile);
      setData(decodedContent);
    });
  }, []);

  // 변경 사항 취소를 위한 초기값 저장
  const [data, setData] = useState("");
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
                __html: DOMPurify.sanitize(data),
              }}
            />
          ) : (
            <TiptapEditor />
          )}
        </div>
        <EditBtn
          isEditing={isIntroEditing}
          onEditClick={() => {
            setContent(data);
            setIsIntroEditing((prev) => !prev);
          }}
          onCancelClick={() => {
            setIsIntroEditing((prev) => !prev);
          }}
          onSubmit={() => {
            if (content !== "<p></p>") {
              setData(content);
              setIsIntroEditing((prev) => !prev);
            }
          }}
        />
      </div>
    </div>
  );
}
