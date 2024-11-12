import api from "@/app/_api/config";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useTiptapStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import { useState } from "react";

export default function EditBlogInfo() {
  // API 호출
  const fetchBlogData = async () => {
    const response = await api.get("/blog");
    return response.data;
  };
  const { data } = useQuery({ queryKey: ["BlogData"], queryFn: fetchBlogData });

  // 변경 사항 취소를 위한 초기값 
  const [blogData, setBlogData] = useState("");
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const { content, setContent } = useTiptapStore();

  return (
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
              __html: DOMPurify.sanitize(blogData),
            }}
          />
        ) : (
          <TiptapEditor />
        )}
      </div>
      <EditBtn
        isEditing={isIntroEditing}
        onEditClick={() => {
          setContent(blogData);
          setIsIntroEditing((prev) => !prev);
        }}
        onCancelClick={() => {
          setIsIntroEditing((prev) => !prev);
        }}
        onSubmit={() => {
          if (content !== "<p></p>") {
            setBlogData(content);
            setIsIntroEditing((prev) => !prev);
          }
        }}
      />
    </div>
  );
}
