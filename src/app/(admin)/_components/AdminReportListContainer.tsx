import TabBar from "@/app/_components/TapBar/TabBar";
import { REPORT_TAP_LIST } from "../_constants/constants";
import { usePaginationStore, useTabStore } from "@/app/stores";
import ReportTopBar from "./ReportTopBar";
import ReportCard from "./ReportCard";
import { Report } from "../_interfaces/interfaces";
import Pagination from "@/app/_components/Pagination";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import { useCheckToken } from "@/app/_hooks/useCheckToken";

export default function AdminReportListContainer() {
  const { accessToken, isTokenSet } = useCheckToken("/admin/sign-in");

  const { tab } = useTabStore();

  // const [data, setData] = useState<Report[]>([]);

  // 페이지네이션
  const { page, setPage, setLastPage } = usePaginationStore();

  // 신고 목록
  const fetchReportList = async () => {
    let endpoint = "";
    if (tab === "게시글") {
      endpoint = `/blog-service/admin/article/report/list`;
    } else if (tab === "블로그") {
      endpoint = `/blog-service/admin/blog/report/list`;
    } else {
      // 댓글
      endpoint = `/blog-service/admin/reply/report/list`;
    }

    try {
      const response = await api.get(endpoint, {
        params: { page: page, size: 10 },
        headers: { Authorization: accessToken },
      });

      const { data } = response.data;

      // 페이지 정보 초기화
      const lastPage = response.data.data.pageInfo.totalPageNum - 1;
      if (page > lastPage) {
        setPage(lastPage);
      }
      setLastPage(lastPage);
      return data.reportList;
    } catch (error) {
      return null;
    }
  };

  const { data } = useQuery<Report[]>({
    queryKey: ["reportList", tab, page, isTokenSet],
    queryFn: fetchReportList,
    enabled: !!accessToken,
  });

  return (
    <div className="w-full flex flex-col">
      {/* 신고 내역 탭바 */}
      <TabBar menuList={REPORT_TAP_LIST} />

      {/* 신고 리스트 상단바 */}
      <ReportTopBar />

      {/* 신고 리스트 */}
      <div className="w-full flex flex-col mb-6 divide-y divide-border-2 border-b border-border-2">
        {data &&
          data
            .filter((el) => {
              return tab === "게시글"
                ? el.replyId === undefined && el.articleId !== undefined
                : tab === "블로그"
                ? el.articleId === undefined
                : el.replyId !== undefined;
            })
            .map((el) => <ReportCard key={el.userReportId} report={el} />)}
      </div>
      {/* 페이지네이션 */}
      <Pagination />
    </div>
  );
}
