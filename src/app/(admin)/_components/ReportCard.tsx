import Link from "next/link";
import { PageMoveIcon } from "@/app/_components/Icons";
import { Report } from "../_interfaces/interfaces";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useTabStore } from "@/app/stores";
import { useGetYMD } from "@/app/_hooks/useGetYMD";

export default function ReportCard({ report }: { report: Report }) {
  const { tab } = useTabStore();

  return (
    <div className="w-full px-2 py-3 flex justify-between items-center gap-0.5 cursor-pointer">
      <div className="flex flex-col gap-2 text-xs text-black font-regular">
        <div className="flex gap-2 justify-between items-center">
          <span className="w-20 flex justify-center text-body">
            {useGetYMD(report.createdDate)}
          </span>
          <span className="w-[100px] flex justify-center font-bold">
            {report.reporterName}
          </span>
          <span className="flex justify-center">
            {report.replyId !== undefined
              ? report.content
              : report.articleId !== undefined
              ? report.title
              : report.reportedUserName}
          </span>
        </div>

        <div className="flex w-full gap-1 px-2">
          <span className="font-bold">{"신고 사유:"}</span>
          <span>
            {report.reportCategory}{" "}
            {report.reportCategory === "직접 입력" &&
              report.directCategory &&
              `(${report.directCategory})`}
          </span>
        </div>
      </div>
      <Link
        href={
          tab === "블로그"
            ? `/admin/user/${report.userId}` // 추후 수정
            : `/admin/report/${report.userReportId}`
        }
        className="flex items-center gap-2 text-xs text-primary-1 font-semibold">
        {tab === "블로그" ? "해당 블로그 표시" : "해당 게시글 표시"}
        <PageMoveIcon />
      </Link>
    </div>
  );
}
