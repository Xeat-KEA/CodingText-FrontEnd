import api from "@/app/_api/config";
import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { Post } from "@/app/_interfaces/interfaces";
import { useBlogStore } from "@/app/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// 추후 토큰값으로 접근한게 아니면 페이지 내쫓기

export default function NewPostContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { userBlogId } = useBlogStore();

  const [newPost, setNewPost] = useState<Post>();
  const [newPostId, setNewPostId] = useState<number>();

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPostedDialogOpen, setIsPostedDialogOpen] = useState(false);

  const isEditing = searchParams.get("isEditing") === "true";
  const setUserBlogId = useBlogStore((state) => state.setUserBlogId);
  const setCurrentBlogId = useBlogStore((state) => state.setCurrentBlogId);

  // 토큰 값으로 조회한 사용자 블로그 아이디
  useEffect(() => {
    api
      .get(`/blog-service/blog`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      })
      .then((res) => {
        const { blogId } = res.data.data;
        if (blogId && blogId !== -1) {
          setUserBlogId(blogId);
          setCurrentBlogId(blogId);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogId:", error);
      });
  }, [userBlogId]);

  useEffect(() => {
    // 게시판 목록 재요청
    queryClient.invalidateQueries({ queryKey: ["boardCategories"] });
  }, []);

  // 새 게시글 등록 버튼 클릭
  const onClickBtn = (data: Post) => {
    // 작성된 글 validation 후 POST 필요
    const requestBody = {
      childCategoryId: data.childCategory,
      title: data.title,
      content: data.content,
      isSecret: data.isSecret,
      password: data.password || null,
    };

    api
      .post(`/blog-service/blog/board/article`, requestBody, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
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
      <div className="top-container">
        <div className="max-w-1000 h-screen py-20">
          <PostEditor
            onBtnClick={(data) => onClickBtn(data)}
            onCancelClick={() => setIsCancelDialogOpen((prev) => !prev)}
            isEditing={isEditing}
          />
        </div>
      </div>
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
            router.push(`/blog/${userBlogId}`, { scroll: false })
          }
          primaryBtn="게시글 페이지로"
          onBtnClick={() =>
            router.push(`/post/${newPostId}`, { scroll: false })
          }
          blockOutsideClick
        />
      )}
    </>
  );
}
