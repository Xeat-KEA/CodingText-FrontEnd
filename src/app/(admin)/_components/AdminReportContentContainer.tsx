import PostHeader from "@/app/(blog)/_components/Post/PostHeader";
import BackBtn from "@/app/_components/BackBtn";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Report } from "../_interfaces/interfaces";
import { Post_Dummy_Data, Report_Dummy_Data } from "../_constants/constants";
import PostContent from "@/app/(blog)/_components/Post/PostContent";
import ReportAction from "./ReportAction";
import CommentContainer from "@/app/(blog)/_components/PostComment/CommentContainer";
import { useBlogStore } from "@/app/stores";


export default function AdminReportContentContainer() {
    const router = useRouter();
    const params = useParams();

    const reportPost = Report_Dummy_Data.find((report) => report.reportId === Number(params.id))
    const currentPost = Post_Dummy_Data.find((post) => post.blogId === reportPost?.reportedBlogId && post.postId === reportPost.reportedPostId)
    
    return (
        <div className="top-container">
            <div className="max-w-800 min-h-screen flex flex-col gap-6">
                {/* 신고 내역으로 버튼*/}
                <div className="w-full">
                    <BackBtn
                        title="신고 내역으로"
                        onClick={() => router.push("/admin/report")}
                    />
                </div>

                {/* 게시물 헤더 */}
                <div className="w-full">
                    {currentPost ? (
                        <PostHeader
                            currentPost={currentPost}
                        />
                    ) : (
                        <p>게시물을 불러오는 중입니다.</p>
                    )}
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 게시물 내용 */}
                <div className="w-full">
                    {currentPost && <PostContent currentPost={currentPost} />}
                </div>

                {/* 게시물 처리 버튼 */}
                <div className="w-full h-5">
                    <ReportAction />
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

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
        </div >
    )
}