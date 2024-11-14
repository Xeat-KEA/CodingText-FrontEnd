import Link from "next/link";
import {
  Profile_Dummy_Data,
  Post_Dummy_Data,
  Comment_Dummy_Data,
} from "../_constants/constants";
import { PageMoveIcon } from "@/app/_components/Icons";
import { Report } from "../_interfaces/interfaces";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useTabStore } from "@/app/stores";

export default function ReportCard({
  reportId,
  reportUserId,
  reportedBlogId,
  reportedPostId,
  reportedAt,
  reportedCommentId,
  reportReason,
  directReason,
}: Report) {
  const { tab } = useTabStore();

  const reporterNickName = Profile_Dummy_Data.find(
    (profile) => profile.userId === reportUserId
  )?.nickName;
  const reportedBlogName = Profile_Dummy_Data.find(
    (profile) => profile.userId === reportedBlogId
  )?.nickName;

  // 디코딩 처리
  const encodedPostContent = Post_Dummy_Data.find(
    (post) => post.postId === reportedPostId
  )?.content;
  const reportedPostContent = encodedPostContent
    ? useBase64("decode", encodedPostContent)
    : "";
  const reportedCommentContent = Comment_Dummy_Data.find(
    (comment) =>
      comment.postId === reportedPostId && comment.replyId === reportedCommentId
  )?.content;

  return (
    <div className="w-full px-2 py-3 flex justify-between items-center gap-0.5 cursor-pointer">
      <div className="flex flex-col gap-2 text-xs text-black font-regular">
        <div className="flex gap-2 justify-between items-center">
          <span className="w-20 flex justify-center text-body">
            {reportedAt}
          </span>
          <span className="w-[100px] flex justify-center font-bold">
            {reporterNickName}
          </span>
          <span className="flex justify-center">
            {reportedCommentId !== undefined
            ? reportedCommentContent
            : reportedPostId !== undefined
            ? reportedPostContent
            : reportedBlogName
          }
          </span>
        </div>

        <div className="flex w-full gap-1 px-2">
          <span className="font-bold">{"신고 사유:"}</span>
          <span>
            {reportReason}{" "}
            {reportReason === "직접 입력" &&
              directReason &&
              `(${directReason})`}
          </span>
        </div>
      </div>
      <Link
        href={
          tab === "블로그"
            ? `/admin/user/${reportId}` // 추후 수정
            : `/admin/report/${reportId}`
        }
        className="flex items-center gap-2 text-xs text-primary-1 font-semibold">
        {tab === "블로그" ? "해당 블로그 표시" : "해당 게시글 표시"}
        <PageMoveIcon />
      </Link>
    </div>
  );
}
