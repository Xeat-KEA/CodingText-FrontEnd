import api from "@/app/_api/config";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { useBase64 } from "@/app/_hooks/useBase64";
import { PostForm } from "@/app/_interfaces/interfaces";
import { useBlogStore, useTokenStore } from "@/app/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPostContainer() {
  const { accessToken, isTokenSet } = useTokenStore();

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { userBlogId, currentBlogId } = useBlogStore();

  const [newPost, setNewPost] = useState<PostForm>();
  const [newPostId, setNewPostId] = useState<number>();

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPostedDialogOpen, setIsPostedDialogOpen] = useState(false);

  const [isWarnDialogOpen, setIsWarnDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const isEditing = searchParams.get("isEditing") === "true";
  const setCurrentBlogId = useBlogStore((state) => state.setCurrentBlogId);

  useEffect(() => {
    if (userBlogId !== -1) {
      setCurrentBlogId(userBlogId);
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });
    }
  }, [accessToken, userBlogId]);

  const onClickBtn = (data: PostForm) => {
    const contentDe = data.content && useBase64("encode", data.content);

    const requestBody = {
      childCategoryId: data.childCategory,
      title: data.title,
      content: contentDe,
      isSecret: data.isSecret,
      password: data.password || null,
    };

    if (
      !requestBody.childCategoryId ||
      !requestBody.title ||
      !requestBody.content
    ) {
      setDialogMessage(
        "게시글을 등록하려면\n제목, 게시판, 내용을 모두 입력해주세요."
      );
      setIsWarnDialogOpen(true);
      return;
    }

    api
      .post(`/blog-service/blog/board/article`, requestBody, {
        headers: { Authorization: accessToken },
      })
      .then((res) => {
        const { articleId } = res.data.data;
        setNewPost(data);
        setNewPostId(articleId);
        setIsPostedDialogOpen((prev) => !prev);
      })
      .catch((error) => {
        console.error("새 게시글 작성 오류 :", error);
      });
  };

  return (
    <>
      {accessToken && (
        <div className="top-container">
          <div className="max-w-1000 h-screen py-20">
            <PostEditor
              onBtnClick={(data) => onClickBtn(data)}
              onCancelClick={() => setIsCancelDialogOpen((prev) => !prev)}
              isEditing={isEditing}
            />
          </div>
        </div>
      )}
      {isWarnDialogOpen && (
        <Dialog
          title={"필수 항목을 입력해주세요"}
          content={dialogMessage}
          isWarning
          backBtn="돌아가기"
          onBackBtnClick={() => setIsWarnDialogOpen((prev) => !prev)}
        />
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
          title="게시글이 등록되었어요!"
          content="작성된 게시글을 확인해보세요"
          backBtn="내 블로그 홈으로"
          onBackBtnClick={() =>
            router.replace(`/blog/${userBlogId}`, { scroll: false })
          }
          primaryBtn="게시글 페이지로"
          onBtnClick={() =>
            router.replace(`/post/${newPostId}`, { scroll: false })
          }
          blockOutsideClick
        />
      )}
    </>
  );
}
