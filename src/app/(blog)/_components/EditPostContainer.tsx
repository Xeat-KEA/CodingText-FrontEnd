import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { Post } from "@/app/_interfaces/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/_api/config";
import { useBlogStore, useTiptapStore } from "@/app/stores";
import { PostProps } from "../_interfaces/interfaces";
import { Post_Dummy_Data } from "@/app/(admin)/_constants/constants";

export default function EditPostContainer() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id, postId } = useParams();
  const [post, setPost] = useState<Post>(); // 현재 게시글 상태
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPostedDialogOpen, setIsPostedDialogOpen] = useState(false);
  const { content, setContent } = useTiptapStore();
  const { userBlogId } = useBlogStore();


  const handlePostUpdate = (data: Post) => {
    setPost(data);
    setContent(data?.content);
  };

  useEffect(() => {
    // api.get(`/article/${postId}`).then((res) =>
    //     const data = res.data.data
    //     setPost(data);
    // })

    const data = Post_Dummy_Data.find(
      (post) => post.postId === Number(params.postId)
    );
    if (data) {
      setPost(data);
    }
  }, []);

  return (
    <>
      <div className="top-container">
        <div className="max-w-1000 h-screen py-20">
         {post && (
           <PostEditor
           initialData={post} // 초기 데이터로 현재 게시글 정보 전달
           onBtnClick={(data) => {
             // 작성된 글 validation 후 POST 필요
             handlePostUpdate(data);
             // post 후 새 게시글 id 반환
             setIsPostedDialogOpen((prev) => !prev);
           }}
           onCancelClick={() => setIsCancelDialogOpen((prev) => !prev)}
           isEditing={true}
         />
         )}
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
          title="게시글이 수정되었어요!"
          content="수정된 게시글을 확인해보세요"
          backBtn="내 블로그 홈으로"
          onBackBtnClick={() =>
            router.push(`/blog/${userBlogId}`, { scroll: false })
          }
          primaryBtn="게시글 페이지로"
          onBtnClick={() =>
            router.push(`/post/${params.postId}`, { scroll: false })
          }
          blockOutsideClick
        />
      )}
    </>
  );
}
