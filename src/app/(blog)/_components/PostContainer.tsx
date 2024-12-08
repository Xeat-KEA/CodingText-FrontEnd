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
  const [password, setPassword] = useState<string>("");
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoaded, setIsLoaded] = useState(true);

  // 게시글 내용 api 연결
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
        console.log(postData);
        if (postData) {
          setCurrentBlogId(postData.blogId);
          setChildCategoryId(postData.childCategoryId);
          setIsCodingPost(postData.codeId !== undefined);
          setIsBlind(postData.isBlind);
          setIsSecret(postData.isSecret);
          const mappedPostData = {
            ...postData,
            postId: postData.articleId,
          };
          setCurrentPost(mappedPostData);
        }
        setIsLoaded(false);
        return currentPost;
      } catch (error) {
        console.error("게시글 내용 반환 오류: ", error);
        return null;
      }
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["postContent", isTokenSet, params.postId],
    queryFn: fetchPostData,
    enabled: isTokenSet && !!accessToken,
  });

  useEffect(() => {
    if (isBlind) {
      router.replace("/blind");
    }
    if (isSecret) {
      setPasswordDialog(true);
    }
  }, [isBlind, isSecret, router]);

  const checkPassword = async () => {
    try {
      const response = await api.get(
        `/blog-service/blog/board/password/${params.postId}`,
        {
          params: { password },
          headers: { Authorization: accessToken },
        }
      );
      console.log(response);
      if (response.data.statusCode === 200) {
        setPasswordDialog(false);
        setIsSecret(false);
      } else if (response.data.statusCode === 404) {
        setPassword("");
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("비밀번호 확인 오류: ", error);
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  if (isLoaded) return null;
  
  return (
    <>
      {!isBlind && !isSecret && (
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
      {passwordDialog && (
        <Dialog
          title="비밀번호를 입력해 주세요"
          content={errorMessage}
          isWarning={passwordDialog}
          backBtn="취소"
          onBackBtnClick={() => router.back()}
          redBtn="확인"
          onBtnClick={() => checkPassword()}>
          <div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={"비밀번호를 입력해주세요."}
              className="w-full border pl-4 p-2 rounded-md text-sm font-regular"
            />
          </div>
        </Dialog>
      )}
    </>
  );
}
