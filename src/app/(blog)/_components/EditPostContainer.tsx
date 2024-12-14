import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { Post, PostForm } from "@/app/_interfaces/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/_api/config";
import {
  useBlogStore,
  usePostStore,
  useTiptapStore,
  useTokenStore,
} from "@/app/stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useBase64 } from "@/app/_hooks/useBase64";
import BackBtn from "@/app/_components/BackBtn";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

export default function EditPostContainer() {
  const { accessToken, isTokenSet } = useTokenStore();
  const { content, setContent } = useTiptapStore();

  const queryClient = useQueryClient();

  const params = useParams();
  const router = useRouter();
  // const [post, setPost] = useState<PostForm>(); // 현재 게시글 상태
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPostedDialogOpen, setIsPostedDialogOpen] = useState(false);

  const { userBlogId, currentBlogId } = useBlogStore();
  const setCurrentBlogId = useBlogStore((state) => state.setCurrentBlogId);

  // 현재 블로그 ID 조회
  useEffect(() => {
    if (userBlogId !== -1) {
      setCurrentBlogId(userBlogId);
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });
    }
  }, [accessToken, userBlogId]);

  // 게시글 수정 내용 반환
  const fetchEditPostData = async () => {
    try {
      const response = await api.get(
        `/blog-service/blog/board/article/edit/${params.postId}`
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editPostContent", isTokenSet, params.postId],
    queryFn: fetchEditPostData,
    enabled: isTokenSet && !!accessToken,
  });

  const handlePostUpdate = async (data: PostForm) => {
    const contentDe = data.content ? useBase64("encode", data.content) : "";
    const updatedData = {
      ...data,
      content: contentDe,
    };
    try {
      const response = await api.put(
        `/blog-service/blog/board/article/${params.postId}`,
        updatedData,
        {
          headers: { Authorization: accessToken },
        }
      );
      if (response.data.statusCode === 200) {
        // post 후 새 게시글 id 반환
        setIsPostedDialogOpen((prev) => !prev);
      } else {
      }
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="w-full h-80 flex-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      {accessToken && (
        <div className="top-container h-screen">
          <div className="max-w-1000 py-6 h-full flex flex-col">
            {/* 목록으로 버튼*/}
            <div className="w-full mb-4">
              <BackBtn
                title="홈으로"
                onClick={() =>
                  router.push(`/blog/${userBlogId}`, {
                    scroll: false,
                  })
                }
              />
            </div>
            {data && (
              <div className="grow overflow-y-auto">
                <PostEditor
                  initialData={data} // 초기 데이터로 현재 게시글 정보 전달
                  onBtnClick={(data) => {
                    // 작성된 글 validation 후 POST 필요
                    handlePostUpdate(data);
                  }}
                  onCancelClick={() => setIsCancelDialogOpen((prev) => !prev)}
                  isEditing={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {isCancelDialogOpen && (
        <Dialog
          title={"게시글 작성을\n그만두시겠어요?"}
          content={"작성하던 게시글은 저장되지 않으며\n이전 페이지로 이동해요"}
          isWarning
          backBtn="돌아가기"
          onBackBtnClick={() => setIsCancelDialogOpen((prev) => !prev)}
          redBtn="게시글 작성 취소"
          onBtnClick={() => router.back()}
        />
      )}
      {isPostedDialogOpen && (
        <Dialog
          icon={<DialogCheckIcon />}
          title="게시글이 수정되었어요!"
          content="수정된 게시글을 확인해보세요"
          backBtn="내 블로그 홈으로"
          onBackBtnClick={() =>
            router.replace(`/blog/${userBlogId}`, { scroll: false })
          }
          primaryBtn="게시글 페이지로"
          onBtnClick={() =>
            router.replace(`/post/${params.postId}`, { scroll: false })
          }
          blockOutsideClick
        />
      )}
    </>
  );
}
