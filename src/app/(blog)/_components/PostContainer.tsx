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
import { useQuery } from "@tanstack/react-query";
import Dialog from "@/app/_components/Dialog";

export default function PostContainer() {
  const { accessToken, isTokenSet } = useTokenStore();

  //  전역변수
  const { userBlogId, currentBlogId } = useBlogStore();
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

  const [isLoaded, setIsLoaded] = useState(true);

  // 비회원용 게시글 내용 api 연결
  const fetchNonUserPostData = async () => {
    try {
      const response = await api.get(
        `/blog-service/blog/board/nonUser/${params.postId}`
      );
      const postData = response.data.data;
      if (postData) {
        setCurrentBlogId(postData.blogId);
        setChildCategoryId(postData.childCategoryId);
        setIsCodingPost(postData.codeId !== undefined);
        setIsBlind(postData.isBlind);
        setIsSecret(postData.isSecret);
        setCurrentPost(postData);
      }
      setIsLoaded(false);
      return postData;
    } catch (error) {
      console.error("비회원 게시글 반환오류:", error);
      return null;
    }
  };
  const { data: nonUserPostData } = useQuery({
    queryKey: ["nonUserPostContent", isTokenSet, params.postId],
    queryFn: fetchNonUserPostData,
  });

  // 회원용 게시글 내용 api 연결
  const fetchPostData = async () => {
    if (accessToken) {
      // 회원 -> 추후 비회원 로직 추가
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
          setIsBlind(postData.isBlind);
          setIsSecret(postData.isSecret);
          setCurrentPost(postData);
        }
        setIsLoaded(false);
        return postData;
      } catch (error) {
        console.error("게시글 내용 반환 오류: ", error);
        return null;
      }
    }
  };

  const {
    data: postData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["postContent", isTokenSet, params.postId],
    queryFn: fetchPostData,
    enabled: isTokenSet && !!accessToken,
  });

  useEffect(() => {
    if (isBlind) {
      router.replace("/blind");
    }
    if (isSecret) {
    }
  }, [isBlind, isSecret, router]);

  if (isLoaded) return null;

  return (
    <>
      {!isBlind && (
        <div className="top-container">
          <div className="max-w-800 min-h-screen flex flex-col gap-6 py-12">
            {/* 목록으로 버튼*/}
            <div className="w-full">
              <BackBtn
                title="목록으로"
                onClick={
                  () => router.back()
                  // router.push(`/category/${currentPost.childCategoryId}`, {
                  //   scroll: false,
                  // })
                }
              />
            </div>

            {/* 게시물 헤더 */}
            <div className="w-full">
              <PostHeader />
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
