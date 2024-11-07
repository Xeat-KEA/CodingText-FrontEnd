import { CommentCountIcon, LikeCountIcon } from "@/app/_components/Icons";
import ProfileImgContainer from "@/app/_components/ProfileImgContainer";
import Medal from "./Medal";
import { useGetYMD } from "@/app/_hooks/useGetYMD";
import { MainPost } from "../_interfaces/interfaces";

export default function MainPostCard({
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
  return (
    <div className="main-slider-card">
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
      <div className="post-card-middle-container">
        <div className="post-card-content-container">
          <span className="post-card-title">
            {codeNum && (
              <>
                <button className="post-card-code-number">#123</button>
                &nbsp;
              </>
            )}
            {title}
          </span>
          <span className="post-card-content">{content}</span>
        </div>
      </div>
      <div className="post-card-bottom-container">
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
        <span className="post-card-views">조회수 {views.toLocaleString()}</span>
      </div>
    </div>
  );
}
