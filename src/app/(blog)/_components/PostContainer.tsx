import BlogLayout from "../blog/[id]/layout";
import PostAction from "@/app/(blog)/_components/Post/PostAction";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import CommentContainer from "./PostComment/CommentContainer";
import BackBtn from "@/app/_components/BackBtn";
import { useBlogStore } from "@/app/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogPost, CompleteArticle } from "@/app/(blog)/_interfaces/interfaces";
import api from "@/app/_api/config";
import BlindPostContainer from "./BlindPostContainer";
import { Post_Dummy_Data } from "@/app/(admin)/_constants/constants";
import { usePathValue } from "@/app/_hooks/usePathValue";

export default function PostContainer() {
  //  전역변수
  const { blogId, params, boardCategories, categoryId, subCategoryId } =
    useBlogStore();
  const router = useRouter();
  const articleId = Number(params?.postId || 0);
  const [blogUserId, setBlogUserId] = useState(1);

  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // 현재 게시물의 상/하위 게시판 정보 -> 전역 저장
  const currentCategory = boardCategories.find(
    (category) => category.id === Number(currentPost?.categoryId)
  );
  const currentSubCategory = currentCategory?.subCategories?.find(
    (sub) => sub.id === Number(currentPost?.subCategoryId)
  );
  const setCategoryId = useBlogStore((state) => state.setCategoryId);
  const setSubCategoryId = useBlogStore((state) => state.setSubCategoryId);

  // 블라인드 게시물
  const [isBlind, setIsBlind] = useState(false);

  // 비밀글
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState<string>("");
  // 비밀번호 입력 dialog 추가

  useEffect(() => {
    // 프로토타입 더미 데이터 GET
    // api.get(`/article/${articleId}`).then((res) => {
    //     const data = res.data.data
    //     if (data) {
    //         // api 분리 후 수정 필요

    //     } else {
    //         setCurrentPost(null);
    //     }

    // })

    // 더미
    const findedPost = Post_Dummy_Data.find(
      (post) =>
        post.blogId === Number(params?.id) &&
        post.postId === Number(params?.postId)
    );
    setCurrentPost(findedPost || null);
    setIsBlind(findedPost?.isBlind ?? false);
    setCategoryId(Number(findedPost?.categoryId));
    setSubCategoryId(Number(findedPost?.subCategoryId));
  }, [params]);

  useEffect(() => {
    if (isBlind) {
      router.push("/blind");
    }
  }, [isBlind, router]);

  return (
    <>
      {!isBlind && (
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
      )}
    </>
  );
}
