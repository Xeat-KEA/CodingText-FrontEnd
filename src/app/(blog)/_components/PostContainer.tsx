import PostAction from "@/app/(blog)/_components/Post/PostAction";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import CommentContainer from "./PostComment/CommentContainer";
import BackBtn from "@/app/_components/BackBtn";
import { useBlogStore } from "@/app/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CompleteArticle } from "@/app/(blog)/_interfaces/interfaces";
import api from "@/app/_api/config";

export default function PostContainer() {
    //  전역변수
    const { blogId, params, boardCategories, categoryId, subCategoryId } = useBlogStore();
    const router = useRouter();
    const articleId = Number(params?.postId || 0);
    const [blogUserId, setBlogUserId] = useState(1);

    const [currentPost, setCurrentPost] = useState<CompleteArticle | null>(null);

    // 현재 게시물의 상/하위 게시판 정보 -> 전역 저장
    const currentCategory = boardCategories.find(
        (category) => category.id === Number(currentPost?.categoryId)
    );
    const currentSubCategory = currentCategory?.subCategories?.find(
        (sub) => sub.id === Number(currentPost?.subCategoryId)
    );
    const setCategoryId = useBlogStore((state) => state.setCategoryId);
    const setSubCategoryId = useBlogStore((state) => state.setSubCategoryId);

    // 비밀글
    const [isSecret, setIsSecret] = useState(false);
    const [password, setPassword] = useState<string>("");
    // 비밀번호 입력 dialog 추가

    useEffect(() => {
        if (articleId === 3) {
            setCategoryId(1);
            setSubCategoryId(1);
            setBlogUserId(2);
        } else if (articleId === 1) {
            setCategoryId(2);
            setSubCategoryId(2);
            setBlogUserId(1);
        } else {
            setCategoryId(0);
            setSubCategoryId(0);
            setBlogUserId(3);
        }

        // 프로토타입 더미 데이터 GET
        api.get(`/article/${articleId}`).then((res) => {
            const data = res.data.data
            if (data) {
                // api 분리 후 수정 필요
                const completeArticle: CompleteArticle = {
                    postId: articleId,
                    blogId: blogUserId,
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    language: "java",
                    title: data.title,
                    content: data.content,
                    viewCount: 15,
                    reportCount: 0,
                    codeContent: data.codeContent,
                    codeId: data.codeId,
                    createAt: data.createAt,
                    likeCount: data.likeCount,
                    nickName: data.nickName,
                    commentCount: data.replyCount,
                    writtenCode: data.writtenCode,
                    createdAt: "2024-01-15 10:00",
                    modifiedAt: "2024-01-15 12:00",
                }
                setCurrentPost(completeArticle);
            } else {
                setCurrentPost(null);
            }

        })
    }, [currentPost, params]);

    return (
        <div className="top-container">
            <div className="max-w-800 min-h-screen flex flex-col gap-6 py-12">
                {/* 목록으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() =>
                            router.push(
                                `/blog/${params?.id}/${currentCategory?.id}/${currentSubCategory?.id}`,
                                { scroll: false }
                            )
                        }
                    />
                </div>

                {/* 게시물 헤더 */}
                <div className="w-full">
                    {currentPost ? (
                        <PostHeader
                            currentPost={currentPost}
                            currentCategory={currentCategory}
                            currentSubCategory={currentSubCategory}
                        />
                    ) : (
                        <p>게시물을 불러오는 중입니다.</p>
                    )}
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 게시물 내용 */}
                <div className="w-full">
                    {currentPost && <PostContent currentPost={currentPost} />}
                </div>

                {/* 게시물 버튼 - PostAction */}
                <div className="w-full h-5">
                    {currentPost && <PostAction currentPost={currentPost} />}
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 댓글  - Comment */}
                <CommentContainer />

                {/* 목록으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() =>
                            router.push(
                                `/blog/${params?.id}/${params?.categoryId}/${params?.subCategoryId}`
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
}