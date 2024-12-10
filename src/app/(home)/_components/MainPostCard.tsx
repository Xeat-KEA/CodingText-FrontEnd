import { CommentCountIcon, LikeCountIcon } from "@/app/_components/Icons";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import Medal from "./Medal";
import { MainPostCardProps } from "../_interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DOMPurify from "isomorphic-dompurify";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";

export default function MainPostCard({ post, ranking }: MainPostCardProps) {
  const router = useRouter();
  const decodedContent = useBase64("decode", post.content);

  return (
    <motion.div
      className="bg-primary-2 rounded-xl"
      initial={{ scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.25)" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Link
        href={`/post/${post.articleId}`}
        className="main-post-card"
        scroll={false}
      >
        {/* 상단 컨테이너 */}
        <div className="post-card-top-container">
          <div className="post-card-profile-container">
            <ProfileImgContainer width={24} height={24} src={post.profileUrl} />
            <span className="post-card-nickname">{post.nickName}</span>
          </div>
          {ranking && <Medal ranking={ranking} />}
          {!ranking && post.createdDate && (
            <span className="post-card-created-at">
              {useCalculateDate(post.createdDate)}
            </span>
          )}
        </div>
        {/* 중단 컨테이너 */}
        <div className="post-card-middle-container">
          <div className="post-card-content-container">
            {/* (코드번호) 제목 */}
            <span className="post-card-title">
              {post.codeId && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        `/search?keyword=${post.codeId}&category=CODE`,
                        {
                          scroll: false,
                        }
                      );
                    }}
                    className="post-card-code-number"
                  >
                    #{post.codeId}
                  </button>
                  &nbsp;
                </>
              )}
              {post.title}
            </span>
            {/* 게시글 내용 */}
            {post.content && (
              <div
                className="post-card-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(decodedContent),
                }}
              />
            )}
          </div>
        </div>
        {/* 하단 컨테이너 */}
        <div className="post-card-bottom-container">
          {/* 좋아요 / 댓글 개수 */}
          <div className="post-card-counts-container">
            <div className="post-card-counts">
              <LikeCountIcon />
              <span className="post-card-counts-number">
                {post.likeCount.toLocaleString()}
              </span>
            </div>
            <div className="post-card-counts">
              <CommentCountIcon />
              <span className="post-card-counts-number">
                {post.replyCount.toLocaleString()}
              </span>
            </div>
          </div>
          {/* 조회수 */}
          <span className="post-card-views">
            조회수
            <span className="post-card-views-number">
              {post.viewCount.toLocaleString()}
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
