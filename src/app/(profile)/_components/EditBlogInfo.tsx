import api from "@/app/_api/config";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { useBlogStore, useTiptapStore } from "@/app/stores";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import { useState } from "react";

export default function EditBlogInfo() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useCheckToken();

  // API 호출
  const fetchBlogData = async () => {
    if (accessToken) {
      const response = await api.get(`/blog-service/blog/home/mainContent`, {
        headers: { Authorization: accessToken },
      });
      return response.data.data.mainContetent;
    }
  };
  const { data } = useQuery({
    queryKey: ["BlogData", isTokenSet],
    queryFn: fetchBlogData,
    enabled: isTokenSet && !!accessToken,
  });

  const mainContentDe = data
  ? useBase64("decode", data)
  : data

  // 변경 사항 취소를 위한 초기값
  const [blogData, setBlogData] = useState(mainContentDe);
  const [isIntroEditing, setIsIntroEditing] = useState(false);
  const { content, setContent } = useTiptapStore();

  return (
    <div className="flex flex-col gap-3">
      <span className="edit-title">블로그 소개글</span>
      <div
        className={`w-full h-[400px] overflow-y-auto ${
          !isIntroEditing && "border border-border-2 rounded-2xl px-6 py-4"
        }`}>
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
