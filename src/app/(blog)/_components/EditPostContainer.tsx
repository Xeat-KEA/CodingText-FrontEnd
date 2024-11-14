import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { Post } from "@/app/_interfaces/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/app/_api/config";
import { useBlogStore } from "@/app/stores";
import { PostProps } from "../_interfaces/interfaces";

const EditPostContainer: React.FC<PostProps> = ({ currentPost }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id, postId } = useParams();
  const [post, setPost] = useState<Post>(); // 현재 게시글 상태
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isPostedDialogOpen, setIsPostedDialogOpen] = useState(false);

  const handlePostUpdate = (data: Post) => {
    setPost(data);
  };

  useEffect(() => {
    // api.get(`/article/${postId}`).then((res) => {
    //     const data = res.data.data
    //     setPost(data);
    // })
  });

  return (
    <>
      <div className="top-container">
        <div className="max-w-1000 h-screen py-20">
          <PostEditor
            initialData={post} // 초기 데이터로 현재 게시글 정보 전달
            onBtnClick={(data) => {
              // 작성된 글 validation 후 POST 필요
              handlePostUpdate(data);
              console.log(data);
              // post 후 새 게시글 id 반환
              setIsPostedDialogOpen((prev) => !prev);
            }}
            onCancelClick={() => setIsCancelDialogOpen((prev) => !prev)}
            isEditing={true}
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
          onBackBtnClick={() => router.push(`/blog/${id}`, { scroll: false })}
          primaryBtn="게시글 페이지로"
          onBtnClick={() =>
            router.push(`/blog/${id}/post/10`, { scroll: false })
          }
          blockOutsideClick
        />
      )}
    </>
  );
};

export default EditPostContainer;
