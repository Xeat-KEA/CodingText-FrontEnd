import PostAction from "@/app/(blog)/_components/Post/PostAction";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import CommentContainer from "./PostComment/CommentContainer";
import BackBtn from "@/app/_components/BackBtn";
import {
  useBlogStore,
  useCategoryStore,
  usePostStore,
  useTokenStore,
} from "@/app/stores";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogPost } from "@/app/(blog)/_interfaces/interfaces";
import api from "@/app/_api/config";
import { Post_Dummy_Data } from "@/app/(admin)/_constants/constants";
import { useQuery } from "@tanstack/react-query";

export default function PostContainer() {
  const { accessToken, isTokenSet } = useTokenStore();

  //  전역변수
  const { userBlogId, currentBlogId } = useBlogStore();
  const { boardCategories } = useCategoryStore();
  const { currentPost } = usePostStore();
  const params = useParams();
  const router = useRouter();

  const setCurrentBlogId = useBlogStore((state) => state.setCurrentBlogId);
  const setCurrentPost = usePostStore((post) => post.setCurrentPost);
  const setIsCodingPost = usePostStore((state) => state.setIsCodinPost);

  const setCategoryId = useCategoryStore((state) => state.setCategoryId);
  const setChildCategoryId = useCategoryStore(
    (state) => state.setChildCategoryId
  );

  // 블라인드 게시물
  const [isBlind, setIsBlind] = useState(false);

  // 비밀글
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState<string>("");
  // 비밀번호 입력 dialog 추가

  // 게시글 내용 api 연결
  const fetchPostData = async () => {
   if(accessToken){
    try {
      const response = await api.get(
        `/blog-service/blog/board/${params.postId}`,
        {
          headers: { Authorization: accessToken },
        }
      );
      const postData = response.data.data;
      if (postData) {
        setCurrentBlogId(postData.blogId);
        setChildCategoryId(postData.childCategoryId);
        setIsCodingPost(postData.codeId !== undefined);
        const mappedPostData = {
          ...postData,
          postId: postData.articleId,
        };
        setCurrentPost(mappedPostData);
      }
      return currentPost;
    } catch (error) {
      console.error("게시글 내용 반환 오류: ", error);
      return null;
    }
   }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postContent", params.postId],
    queryFn: fetchPostData,
    enabled: isTokenSet && !!accessToken,
  });

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
                  router.push(`/category/${currentPost.childCategoryId}`, {
                    scroll: false,
                  })
                }
              />
            </div>

            {/* 게시물 헤더 */}
            <div className="w-full">
              {currentPost ? (
                <PostHeader />
              ) : (
                <p>게시물을 불러오는 중입니다.</p>
              )}
            </div>

            {/* 구분선 */}
            <hr className="w-full border-t-1 border-border2" />

            {/* 게시물 내용 */}
            <div className="w-full">{currentPost && <PostContent />}</div>

            {/* 게시물 버튼 - PostAction */}
            <div className="w-full h-5">{currentPost && <PostAction />}</div>

            {/* 구분선 */}
            <hr className="w-full border-t-1 border-border2" />

            {/* 댓글  - Comment */}
            <CommentContainer />

            {/* 목록으로 버튼*/}
            <div className="w-full">
              <BackBtn
                title="목록으로"
                onClick={() =>
                  router.push(`/category/${currentPost.childCategoryId}`, {
                    scroll: false,
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
