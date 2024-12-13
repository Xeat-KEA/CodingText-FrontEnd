import { Push } from "@/app/_interfaces/interfaces";
import Link from "next/link";

export default function NoticeCard({ push }: { push: Push }) {
  const getMessage = () => {
    const { sentUserNickName, noticeCategory, reasonCategory, directCategory } =
      push;

    const userMessage = (
      <span className="text-primary-1">{sentUserNickName}</span>
    );

    const reasonMessage =
      directCategory !== null
        ? `${reasonCategory} ( ${directCategory} )`
        : reasonCategory;

    switch (noticeCategory) {
      case "댓글 알림":
        return <>{userMessage} 님이 새로운 댓글을 남겼어요</>;
      case "답글 알림":
        return <>{userMessage} 님이 새로운 답글을 남겼어요</>;
      case "언급된 사용자 알림":
        return <>{userMessage} 님이 사용자님을 언급했어요</>;
      case "팔로우 알림":
        return <>{userMessage} 님이 팔로우했어요</>;
      case "댓글 삭제 처리 알림":
        return (
          <>
            {userMessage} 님이 "{reasonMessage}"의 사유로 댓글을 삭제하였습니다.
          </>
        );
      case "삭제 처리 알림":
        return (
          <>
            {userMessage} 님이 "{reasonMessage}"의 사유로 게시글을
            삭제하였습니다.
          </>
        );
      case "블라인드 처리 알림":
        return (
          <>
            {userMessage} 님이 "{reasonMessage}"의 사유로 해당 게시글을 블라인드
            처리 하였습니다.
          </>
        );
      case "블라인드 해제 알림":
        return (
          <>
            {userMessage} 님이 "{reasonMessage}"의 사유로 해당 게시글을 블라인드
            해제 하였습니다.
          </>
        );
      case "코딩테스트 문제 등록 승인 알림":
        return <>신청하신 문제 등록이 승인되었습니다</>;
      case "코딩테스트 문제 등록 거절 알림":
        return <>신청하신 문제 등록이 거절되었습니다</>;
      default:
        return "알림 내용이 없습니다.";
    }
  };

  return (
    <Link
      href={push.repliedArticleId ? `/post/${push.repliedArticleId}` : "#"}
      className="w-full px-4 py-3 flex flex-col gap-2"
      onClick={(e) => {
        if (!push.repliedArticleId) e.preventDefault();
      }}>
      <span className="text-xs font-bold text-body">{push.noticeCategory}</span>

      <div className="flex flex-col">
        <span className="text-xs text-black">{getMessage()}</span>
        {push.content && (
          <span className="text-xs text-black">"{push.content}"</span>
        )}
      </div>
    </Link>
  );
}
