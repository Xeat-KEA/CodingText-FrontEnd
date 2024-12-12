import api from "@/app/_api/config";
import EditBtn from "@/app/_components/TipTapEditor/EditBtn";
import TiptapEditor from "@/app/_components/TipTapEditor/TiptapEditor";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useTiptapStore, useTokenStore } from "@/app/stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DOMPurify from "isomorphic-dompurify";
import { useEffect, useState } from "react";

export default function EditBlogInfo() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useTokenStore();
  const { content, setContent } = useTiptapStore();

  const queryClient = useQueryClient();

  // API 호출
  const fetchBlogData = async () => {
    if (accessToken) {
      try {
        const response = await api.get(`/blog-service/blog/home`, {
          headers: { Authorization: accessToken },
        });

        return {
          mainContent: useBase64("decode", response.data.data.mainContent),
          originalImageList: response.data.data.originalImageList || [],
        };
      } catch (error) {
        return "";
      }
    }
    return "";
  };
  const { data, isLoading } = useQuery({
    queryKey: ["mainContent", isTokenSet],
    queryFn: fetchBlogData,
    enabled: isTokenSet && !!accessToken,
  });

  useEffect(() => {
    if (data) {
      setBlogData(data);
    }
  }, [data]);

  // 변경 사항 취소를 위한 초기값
  const [blogData, setBlogData] = useState({
    mainContent: "",
    originalImageList: [],
  });
  const [isIntroEditing, setIsIntroEditing] = useState(false);

  const updateBlogContent = async () => {
    try {
      const encodedContent = useBase64("encode", content);
      const response = await api.put(
        `/blog-service/blog/home`,
        {
          mainContent: encodedContent,
          originalImageList: blogData.originalImageList,
        },
        {
          headers: { Authorization: accessToken },
        }
      );
      queryClient.invalidateQueries({ queryKey: ["mainContent"] });
    } catch (error) {
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="edit-title">블로그 소개글</span>
      <div
        className={`w-full min-h-[400px] overflow-y-auto ${
          !isIntroEditing && "border border-border-2 rounded-2xl px-6 py-4"
        }`}>
        {!isIntroEditing ? (
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blogData.mainContent),
            }}
          />
        ) : (
          <TiptapEditor />
        )}
      </div>
      <EditBtn
        isEditing={isIntroEditing}
        onEditClick={() => {
          setContent(blogData.mainContent);
          setIsIntroEditing((prev) => !prev);
        }}
        onCancelClick={() => {
          setIsIntroEditing((prev) => !prev);
        }}
        onSubmit={() => {
          if (content !== "<p></p>") {
            updateBlogContent();
            setIsIntroEditing((prev) => !prev);
          }
        }}
      />
    </div>
  );
}
