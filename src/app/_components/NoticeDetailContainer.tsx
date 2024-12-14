import BackBtn from "@/app/_components/BackBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { useBase64 } from "@/app/_hooks/useBase64";
import { useCheckToken } from "../_hooks/useCheckToken";
import api from "../_api/config";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Notice } from "../_interfaces/interfaces";

export default function NoticeDetailContainer() {
  const { accessToken, isTokenSet } = useCheckToken();
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);

  const router = useRouter();
  const params = useParams();

  // API 호출
  const fetchNoticeData = async () => {
    const response = await api.get(`/user-service/users/announce/${params.id}`);
    setCurrentNotice(response.data);
    return response.data.content;
  };
  const { data: userNoticData } = useQuery({
    queryKey: ["userNoticeData"],
    queryFn: fetchNoticeData,
  });

  // 기존 공지사항 내용 디코딩 결과 -> 현재 인코딩 안된 상태로 전달됨
  const contentDe =
    currentNotice && useBase64("decode", currentNotice.content || "");

  const [noticeData, setNoticeData] = useState("");
  useEffect(() => {
    if (contentDe) {
      setNoticeData(contentDe);
    }
  }, [currentNotice]);

  return (
    <div className="top-container">
      <div className="flex flex-col max-w-1000 p-12 gap-6">
        {/* 목록으로 버튼 */}
        <div className="w-full">
          <BackBtn
            title="목록으로"
            onClick={() => router.push("/notice", { scroll: false })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full text-sm text-body font-regular flex justify-between">
            <span>공지사항</span>
            <span>{useCalculateDate(currentNotice?.createdDate || "")}</span>
          </div>

          <div className="flex w-full text-xl font-semibold">
            <p className="text-black line-clamp-2">{currentNotice?.title}</p>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="w-full border-t-1 border-border-2" />

        {/* 공지사항 내용 */}
        <div className="w-full text-black border border-border-2 rounded-xl p-4 min-h-[400px]">
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(String(noticeData)),
            }}
          />
        </div>

        {/* 목록으로 버튼 */}
        <div className="w-full">
          <BackBtn
            title="목록으로"
            onClick={() => router.push("/notice", { scroll: false })}
          />
        </div>
      </div>
    </div>
  );
}
