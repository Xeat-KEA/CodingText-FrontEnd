"use client";

import api from "@/app/_api/config";
import BackBtn from "@/app/_components/BackBtn";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { PostForm } from "@/app/_interfaces/interfaces";
import { useBlogStore } from "@/app/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewPostContainer() {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useCheckToken();

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
    queryClient.invalidateQueries({ queryKey: ["userBlogIdData"] });
    if (userBlogId !== -1) {
      setCurrentBlogId(userBlogId);
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });
    }
  }, [accessToken, userBlogId]);

  const onClickBtn = (data: PostForm) => {
    const contentDe = data.content && useBase64("encode", data.content);

    const requestBody = {
      childCategoryId: data.childCategoryId,
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
            <div className="grow overflow-y-auto">
              <PostEditor
                onBtnClick={(data) => onClickBtn(data)}
                onCancelClick={() => setIsCancelDialogOpen((prev) => !prev)}
                isEditing={isEditing}
              />
            </div>
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
