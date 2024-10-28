import Dialog from "@/app/_components/Dialog";
import { DialogCheckIcon } from "@/app/_components/Icons";
import PostEditor from "@/app/_components/PostEditor/PostEditor";
import { Post } from "@/app/_interfaces/interfaces";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NewPostContainer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id } = useParams();

    const [newPost, setNewPost] = useState<Post>();
    const [newPostId, setNewPostId] = useState<number>();

    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [isPostedDialogOpen, setIsPostedDialogOpen] = useState(false);

    const isEditing = searchParams.get("isEditing") === "true";


    return (
        <>
            <div className="top-container">
                <div className="max-w-1000 h-screen py-20">
                    <PostEditor
                        onBtnClick={(data) => {
                            // 작성된 글 validation 후 POST 필요
                            console.log(data);
                            // post 후 새 게시글 id 반환
                            setNewPost(data);
                            setNewPostId(10);

                            setIsPostedDialogOpen((prev) => !prev);
                        }}
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
                    title="게시글이 수정되었어요!"
                    content="수정된 게시글을 확인해보세요"
                    backBtn="내 블로그 홈으로"
                    onBackBtnClick={() => router.push(`/blog/${id}`, { scroll: false })}
                    primaryBtn="게시글 페이지로"
                    onBtnClick={() => router.push(`/blog/${id}/post/10`, { scroll: false })}
                    blockOutsideClick
                />
            )}
        </>
    );
}