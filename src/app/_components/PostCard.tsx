import { Post } from "../_interfaces/interfaces";
import { CommentCountIcon, LikeCountIcon, ReportIcon } from "./Icons";
import { useCalculateDate } from "../_hooks/useCalculateDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBase64 } from "../_hooks/useBase64";
import DOMPurify from "isomorphic-dompurify";
import { useBlogStore } from "../stores";
import ProfileImgContainer from "./ProfileImgContainer";
import Image from "next/image";

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();

  const date = useCalculateDate(post.createdDate);

  const decodedContent = useBase64("decode", post.content);

  const { blogId } = useBlogStore();

  return (
    <Link
      href={`/blog/${blogId}/post/${post.articleId}`} // 블로그 Id 수정 필요
      className="w-full flex flex-col gap-2 py-6 cursor-pointer"
    >
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
              className="post-card-profile-container"
            >
              <ProfileImgContainer
                width={24}
                height={24}
                src={post.profileUrl}
              />
              <span className="post-card-nickname">{post.nickName}</span>
            </div>
          </>
        )}
        {post.category && (
          <>
            {/* 위치하는 하위 게시판*/}
            <span className="text-xs font-semibold text-body">
              {post.category}
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
          <span className="post-card-title">
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
                className="post-card-code-number"
              >
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
        {post.thumbnailImageUrl && (
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
    </Link>
  );
}
