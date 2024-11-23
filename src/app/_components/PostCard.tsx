import { PostCardProps } from "../_interfaces/interfaces";
import { CommentCountIcon, LikeCountIcon, ReportIcon } from "./Icons";
import { useCalculateDate } from "../_hooks/useCalculateDate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBase64 } from "../_hooks/useBase64";
import DOMPurify from "isomorphic-dompurify";
import { useBlogStore } from "../stores";
import ProfileImgContainer from "./ProfileImgContainer";

export default function PostCard({
  articleId,
  profileImg,
  nickName,
  category,
  createAt,
  title,
  content,
  thumbnail,
  likes,
  comments,
  views,
  codeId,
}: PostCardProps) {
  const router = useRouter();

  const date = useCalculateDate(createAt);

  const decodedContent = useBase64("decode", content);

  const { blogId } = useBlogStore();

  return (
    <Link
      href={`/blog/${blogId}/post/${articleId}`} // 블로그 Id 수정 필요
      className="w-full flex flex-col gap-2 py-6 cursor-pointer"
    >
      <div className="post-card-top-container">
        {nickName && profileImg && (
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
              <ProfileImgContainer width={24} height={24} src={profileImg} />
              <span className="post-card-nickname">{nickName}</span>
            </div>
          </>
        )}
        {category && (
          <>
            {/* 위치하는 하위 게시판*/}
            <span className="text-xs font-semibold text-body">{category}</span>
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
            {codeId && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(
                    `/search?keyword=${codeId}&tab=POST&category=CODE&order=ACCURACY`,
                    { scroll: false }
                  );
                }}
                className="post-card-code-number"
              >
                #{codeId}&nbsp;
              </button>
            )}
            {title}
          </span>
          <div
            className="post-card-content"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(decodedContent),
            }}
          />
        </div>
        {/* 썸네일 (수정 필요) */}
        {thumbnail && (
          <div className="w-[160px] h-[120px] rounded-lg bg-disabled shrink-0"></div>
        )}
      </div>
      <div className="post-card-bottom-container">
        {/* 좋아요 / 댓글 개수 */}
        <div className="post-card-counts-container">
          <div className="post-card-counts">
            <LikeCountIcon />
            <span className="post-card-counts-number">{likes}</span>
          </div>
          <div className="post-card-counts">
            <CommentCountIcon />
            <span className="post-card-counts-number">{comments}</span>
          </div>
        </div>
        {/* 조회수 */}
        <span className="post-card-views">조회수 {views}</span>
      </div>
    </Link>
  );
}
