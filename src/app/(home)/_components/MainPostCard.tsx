import { CommentCountIcon, LikeCountIcon } from "@/app/_components/Icons";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import Medal from "./Medal";
import { useGetYMD } from "@/app/_hooks/useGetYMD";
import { MainPost } from "../_interfaces/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainPostCard({
  postId,
  profileImg,
  username,
  codeNum,
  title,
  content,
  likeCounts,
  commentCounts,
  views,
  createdAt,
  ranking,
}: MainPost) {
  const router = useRouter();
  return (
    <Link href={`/blog/${postId}`} className="main-post-card" scroll={false}>
      {/* 상단 컨테이너 */}
      <div className="post-card-top-container">
        <div className="post-card-profile-container">
          <ProfileImgContainer width={24} height={24} src={profileImg} />
          <span className="post-card-nickname">{username}</span>
        </div>
        {ranking && <Medal ranking={ranking} />}
        {!ranking && createdAt && (
          <span className="post-card-created-at">{useGetYMD(createdAt)}</span>
        )}
      </div>
      {/* 중단 컨테이너 */}
      <div className="post-card-middle-container">
        <div className="post-card-content-container">
          {/* (코드번호) 제목 */}
          <span className="post-card-title">
            {codeNum && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/search?keyword=${codeNum}&category=CODE`, {
                      scroll: false,
                    });
                  }}
                  className="post-card-code-number"
                >
                  #123
                </button>
                &nbsp;
              </>
            )}
            {title}
          </span>
          {/* 게시글 내용 */}
          <span className="post-card-content">{content}</span>
        </div>
      </div>
      {/* 하단 컨테이너 */}
      <div className="post-card-bottom-container">
        {/* 좋아요 / 댓글 개수 */}
        <div className="post-card-counts-container">
          <div className="post-card-counts">
            <LikeCountIcon />
            <span className="post-card-counts-number">
              {likeCounts.toLocaleString()}
            </span>
          </div>
          <div className="post-card-counts">
            <CommentCountIcon />
            <span className="post-card-counts-number">
              {commentCounts.toLocaleString()}
            </span>
          </div>
        </div>
        {/* 조회수 */}
        <span className="post-card-views">
          조회수
          <span className="post-card-views-number">
            {views.toLocaleString()}
          </span>
        </span>
      </div>
    </Link>
  );
}
