import { Post } from "../_interfaces/interfaces";
import {
  BlindIcon,
  CommentCountIcon,
  LikeCountIcon,
  ReportIcon,
  SecretPostIcon,
} from "./Icons";
import { useCalculateDate } from "../_hooks/useCalculateDate";
import { useRouter } from "next/navigation";
import { useBase64 } from "../_hooks/useBase64";
import DOMPurify from "isomorphic-dompurify";
import { useBlogStore, useTokenStore } from "../stores";
import ProfileImgContainer from "./ProfileImgContainer";
import Image from "next/image";
import Dialog from "./Dialog";
import { useState } from "react";
import api from "../_api/config";

export default function PostCard({ post }: { post: Post }) {
  const { accessToken, isTokenSet } = useTokenStore();

  const router = useRouter();

  const date = useCalculateDate(post.createdDate);

  const decodedContent = post.isBlind
    ? "블라인드 처리된 게시글입니다."
    : post.isSecret
    ? "비밀번호를 입력하여 게시글을 확인하세요."
    : useBase64("decode", post.content);

  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onClickPost = () => {
    if (!post.isSecret) {
      router.push(`/post/${post.articleId}`);
    } else {
      setPasswordDialog(true);
    }
  };
  const checkPassword = async () => {
    try {
      const response = await api.get(
        `/blog-service/blog/board/password/${post.articleId}`,
        {
          params: { password },
          headers: { Authorization: accessToken },
        }
      );
      if (response.data.statusCode === 200) {
        setPassword("");
        setErrorMessage("");
        setPasswordDialog(false);
        setIsSecret(false);
        router.push(`/post/${post.articleId}`);
      } else if (response.data.statusCode === 404) {
        setPassword("");
        setErrorMessage("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div
        onClick={onClickPost}
        className="w-full flex flex-col gap-2 py-6 cursor-pointer">
        <div className="post-card-top-container">
          {post.nickName && post.profileUrl && (
            <>
              {/* 사용자 정보 */}
              <div
                onClick={(e) => {
                  // 부모 요소 onClick 실행 방지
                  e.stopPropagation();
                  // 사용자 클릭 시 해당 사용자 블로그로 이동
                }}
                className="post-card-profile-container">
                <ProfileImgContainer
                  width={24}
                  height={24}
                  src={post.profileUrl}
                />
                <span className="post-card-nickname">{post.nickName}</span>
              </div>
            </>
          )}
          {post.childName && (
            <>
              {/* 위치하는 하위 게시판*/}
              <span className="text-xs font-semibold text-primary-1">
                {post.childName}
              </span>
            </>
          )}
          {/* 날짜 정보 (수정 필요) */}
          <span className="post-card-created-at">{date}</span>
        </div>
        {/* 게시글 정보 */}
        <div className="post-card-middle-container">
          {/* 게시글 내용 */}
          <div className="post-card-content-container">
            <span className="flex items-center gap-2 post-card-title">
              {!post.isBlind && post.isSecret && <SecretPostIcon />}
              {post.isBlind && <BlindIcon />}

              {post.codeId && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.push(
                      `/search?keyword=${post.codeId}&tab=POST&category=CODE&order=ACCURACY`,
                      { scroll: false }
                    );
                  }}
                  className="post-card-code-number">
                  #{post.codeId}&nbsp;
                </button>
              )}
              {post.title}
            </span>
            <div
              className="post-card-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(decodedContent),
              }}
            />
          </div>
          {/* 썸네일 */}
          {!post.isSecret && post.thumbnailImageUrl && (
            <div className="rounded-lg shrink-0">
              <Image
                src={post.thumbnailImageUrl}
                width={160}
                height={120}
                alt={`thumbnail/${post.blogId}`}
                style={{ width: 160, height: 120 }}
              />
            </div>
          )}
        </div>
        <div className="post-card-bottom-container">
          {/* 좋아요 / 댓글 개수 */}
          <div className="post-card-counts-container">
            <div className="post-card-counts">
              <LikeCountIcon />
              <span className="post-card-counts-number">{post.likeCount}</span>
            </div>
            <div className="post-card-counts">
              <CommentCountIcon />
              <span className="post-card-counts-number">{post.replyCount}</span>
            </div>
          </div>
          {/* 조회수 */}
          <span className="post-card-views">조회수 {post.viewCount}</span>
        </div>
      </div>
      {passwordDialog && (
        <Dialog
          title="비밀번호를 입력해 주세요"
          content={errorMessage}
          isWarning={passwordDialog}
          backBtn="취소"
          onBackBtnClick={() => setPasswordDialog(false)}
          redBtn="확인"
          onBtnClick={() => checkPassword()}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={"비밀번호를 입력해주세요."}
            className="w-full border pl-4 p-2 rounded-md text-sm font-regular"
          />
        </Dialog>
      )}
    </>
  );
}
