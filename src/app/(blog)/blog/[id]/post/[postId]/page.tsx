"use client"
import PostAction from "@/app/(blog)/_components/Post/PostAction";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import { Blog_Post_Data, Board_Categories } from "@/app/(blog)/_constants/constants";
import BackBtn from "@/app/_components/BackBtn";
import { useBlogStore } from "@/app/stores";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostPage() {
    //  전역변수
    const {
        params,
        boardCategories,
    } = useBlogStore();
    const router = useRouter();

    const currentPost = Blog_Post_Data.find(post =>
        post.postId === Number(params?.postId) &&
        post.blogId === Number(params?.id)
    );
    const currentCategory = boardCategories.find(category => category.id === Number(currentPost?.categoryId));
    const currentSubCategory = currentCategory?.subCategories?.find(sub => sub.id === Number(currentPost?.subCategoryId));
    const setCategoryId = useBlogStore((state) => state.setCategoryId);
    const setSubCategoryId = useBlogStore((state) => state.setSubCategoryId);

    // // 비밀번호 상태
    // const [password, setPassword] = useState(currentPost?.isSecret);
    // const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    // const correctPassword = currentPost?.password;

    // const passwordSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     if (password === correctPassword) {
    //         setIsPasswordCorrect(true);
    //     } else {
    //         alert("비밀번호가 틀립니다.");
    //     }
    // };
    
    useEffect(() => {
        // sidebar 현재 서브카테고리 bold 처리 위함
        setCategoryId(Number(currentCategory?.id))
        setSubCategoryId(Number(currentSubCategory?.id))
    }, [currentPost])

    return (
        <div className="flex w-full justify-center">
            <div className="max-w-800 min-h-screen flex flex-col gap-6 py-12">
                {/* 목록으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() => router.push(`/blog/${params?.id}/${currentCategory?.id}/${currentSubCategory?.id}`)}
                    />
                </div>

                {/* 게시물 헤더 */}
                <div className="w-full">
                    <PostHeader
                        currentPost={currentPost}
                        currentCategory={currentCategory}
                        currentSubCategory={currentSubCategory}
                    />
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 게시물 내용 */}
                <div className="w-full">
                    <PostContent
                        currentPost={currentPost}
                    />
                </div>

                {/* 게시물 버튼 - PostAction */}
                <div className="w-full h-5">
                    <PostAction
                        currentPost={currentPost}
                    />
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 댓글  - Comment */}
                <div className="w-full h-[871px]">
                    댓글 내용
                </div>

                {/* 목록으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() => router.push(`/blog/${params?.id}/${params?.categoryId}/${params?.subCategoryId}`)}
                    />
                </div>
            </div>
        </div>
    )
}