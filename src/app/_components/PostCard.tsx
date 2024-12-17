import { Post } from "../_interfaces/interfaces";
import {
  BlindIcon,
  CommentCountIcon,
  LikeCountIcon,
  SecretPostIcon,
} from "./Icons";
import { useCalculateDate } from "../_hooks/useCalculateDate";
import { usePathname, useRouter } from "next/navigation";
import { useBase64 } from "../_hooks/useBase64";
import DOMPurify from "isomorphic-dompurify";
import { useTokenStore } from "../stores";
import ProfileImgContainer from "./ProfileImgContainer";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PostCard({ post }: { post: Post }) {
  const pathname = usePathname();
  const router = useRouter();
  const isSearchPage = pathname.includes("/search");

  const date = useCalculateDate(post.createdDate);

  const decodedContent = post.isBlind
    ? "블라인드 처리된 게시글입니다."
    : post.isSecret
    ? "비밀번호를 입력하여 게시글을 확인하세요."
    : isSearchPage
    ? post.content
    : useBase64("decode", post.content);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        onClick={() => router.push(`/post/${post.articleId}`)}
        className="w-full flex flex-col gap-2 py-6 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
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
              className={`post-card-content ${isHovered && "underline"}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(decodedContent),
              }}
            />
          </div>
          {/* 썸네일 */}
          {!post.isSecret && post.thumbnailImageUrl && (
            <div className="rounded-lg shrink-0 border border-border-1 overflow-hidden">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ type: "tween", duration: 0.2 }}>
                <Image
                  src={post.thumbnailImageUrl}
                  width={160}
                  height={120}
                  alt={`thumbnail/${post.blogId}`}
                  style={{ width: 160, height: 120 }}
                  className="object-cover"
                />
              </motion.div>
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
    </>
  );
}
