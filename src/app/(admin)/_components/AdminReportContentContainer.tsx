import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import BackBtn from "@/app/_components/BackBtn";
import { useParams, useRouter } from "next/navigation";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import ReportAction from "./ReportAction";
import CommentContainer from "@/app/(blog)/_components/PostComment/CommentContainer";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { usePostStore } from "@/app/stores";
import { useState } from "react";

export default function AdminReportContentContainer() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const router = useRouter();
  const params = useParams();

  const setCurrentPost = usePostStore((post) => post.setCurrentPost);
  const setReportPostId = usePostStore((reportId) => reportId.setReportPostId);
  const setReportReplyId = usePostStore(
    (reportId) => reportId.setReportReplyId
  );

  const [isLoaded, setIsLoaded] = useState(true);

  const fetchReportData = async () => {
    const response = await api.get(
      `/blog-service/admin/userReport/info/${params.id}`,
      {
        headers: { Authorization: accessToken },
      }
    );
    console.log(response.data.data);

    setReportPostId(response.data.data.articleId);
    if (response.data.data.replyId) {
      setReportReplyId(response.data.data.replyId);
    }
    return response.data.data;
  };

  const { data: reportData } = useQuery({
    queryKey: ["reportData", isTokenSet],
    queryFn: fetchReportData,
    enabled: !!accessToken,
  });

  // 신고된 게시글 내용 fetch - 비회원 게시글 조회 사용
  const fetchPostData = async () => {
    const response = await api.get(
      `/blog-service/blog/board/nonUser/${reportData.articleId}`
    );
    const postData = response.data.data;
    if (postData) {
      setCurrentPost(postData);
      setIsLoaded(false);
    }
    return postData;
  };

  const { data: reportPostData } = useQuery({
    queryKey: ["reportPostContent", isTokenSet],
    queryFn: fetchPostData,
  });

  if (isLoaded) return null;

  return (
    <div className="top-container">
      <div className="w-full max-w-[800px] min-h-screen flex flex-col gap-6">
        {/* 신고 내역으로 버튼*/}
        <div className="w-full">
          <BackBtn
            title="신고 내역으로"
            onClick={() => router.push("/admin/report")}
          />
        </div>

        {/* 게시물 헤더 */}
        <div className="w-full">{reportPostData && <PostHeader />}</div>

        {/* 구분선 */}
        <hr className="division" />

        {/* 게시물 내용 */}
        <div className="w-full">{reportPostData && <PostContent />}</div>

        {/* 게시물 처리 버튼 */}
        <div className="w-full h-5">
          <ReportAction />
        </div>

        {/* 구분선 */}
        <hr className="w-full border-t-1 border-border-2" />

        {/* 댓글  - Comment */}
        <CommentContainer />

        {/* 신고 내역으로 버튼*/}
        <div className="w-full">
          <BackBtn
            title="신고 내역으로"
            onClick={() => router.push("/admin/report")}
          />
        </div>
      </div>
    </div>
  );
}
