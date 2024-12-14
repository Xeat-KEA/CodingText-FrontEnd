import { useTokenStore } from "@/app/stores";
import { MAIN_MENU_LIST, POSTS_LIST } from "../_constants/constants";
import MainMenuBtn from "./MainMenuBtn";
import MainProfileCard from "./MainProfileCard";
import MainNotices from "./MainNotices";
import MainHistories from "./MainHistories";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/_api/config";
import { Statistics } from "@/app/_interfaces/interfaces";

export default function MainMenu() {
  const { accessToken, isTokenSet } = useTokenStore();

  // 사용자 분석 정보 API 호출
  const fetchStatistics = async () => {
    const response = await api.get("/user-service/users/statistics", {
      headers: { Authorization: accessToken },
    });
    return response.data;
  };
  const { data: statistics } = useQuery<Statistics>({
    queryKey: ["statistics", isTokenSet],
    queryFn: fetchStatistics,
    enabled: !!accessToken,
  });

  // 공지사항 목록 API 호출
  const fetchNoticeList = async () => {
    const response = await api.get("/user-service/users/announce");
    return response.data;
  };
  const { data: noticeList } = useQuery({
    queryKey: ["noticeList"],
    queryFn: fetchNoticeList,
    select: (data) => data.content.slice(0, 5),
  });

  // 문제 풀이 기록 API 호출
  const fetchHistoryList = async () => {
    if (accessToken) {
      const response = await api.get("/code-bank-service/code/history/user", {
        headers: { Authorization: accessToken },
        params: { sortBy: "compiledAt" },
      });
      return response.data;
    } else {
      return null;
    }
  };
  const { data: historyList } = useQuery({
    queryKey: ["historyList", isTokenSet],
    queryFn: fetchHistoryList,
    select: (data) => data.content.slice(0, 5),
  });

  return (
    <>
      {isTokenSet && (
        <>
          {!accessToken ? (
            <div className="grid grid-cols-2 gap-12 sm:flex">
              {MAIN_MENU_LIST.map((el, index) => (
                <MainMenuBtn
                  key={index}
                  icon={el.icon}
                  title={el.title}
                  url={el.url}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-12">
              <div className="w-full flex max-lg:flex-col lg:flex-row-reverse gap-12 overflow-hidden">
                {statistics !== undefined ? (
                  <MainProfileCard statistics={statistics} />
                ) : (
                  // 스켈레톤 UI 제작 예정
                  <></>
                )}
                <MainNotices
                  title={POSTS_LIST[4].title}
                  url={POSTS_LIST[4].url!}
                  sliderList={noticeList}
                />
              </div>
              <MainHistories
                title={POSTS_LIST[5].title}
                url={POSTS_LIST[5].url!}
                sliderList={historyList}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
