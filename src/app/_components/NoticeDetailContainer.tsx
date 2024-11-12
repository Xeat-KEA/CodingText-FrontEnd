import BackBtn from "@/app/_components/BackBtn";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Notice_Dummy_Data } from "@/app/_constants/constants";
import DOMPurify from "isomorphic-dompurify";
import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { useBase64 } from "@/app/_hooks/useBase64";

export default function NoticeDetailContainer() {
    const router = useRouter();
    const params = useParams();

    const currentNotice = Notice_Dummy_Data.find(notice => notice.noticeId === Number(params.id));
    const contentDe = currentNotice && useBase64("decode", currentNotice.noticeContent);

    return (
        <div className="top-container">
            <div className="flex flex-col max-w-1000 p-12 gap-6">
                {/* 목록으로 버튼 */}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() =>
                            router.push(
                                '/notice',
                                { scroll: false }
                            )
                        }
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="w-full text-sm text-body font-regular flex justify-between">
                        <span>공지사항</span>
                        <span>{useCalculateDate(currentNotice?.noticedAt || "")}</span>
                    </div>

                    <div className="flex w-full text-xl font-semibold">
                        <p className="text-black line-clamp-2">
                            {currentNotice?.noticeTitle}
                        </p>
                    </div>
                </div>

                {/* 구분선 */}
                <hr className="w-full border-t-1 border-border2" />

                {/* 공지사항 내용 */}
                <div className="w-full text-black border border-border2 rounded-xl p-4">
                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(String(contentDe)),
                        }}
                    />
                </div>
                
                {/* 목록으로 버튼 */}
                <div className="w-full">
                    <BackBtn
                        title="목록으로"
                        onClick={() =>
                            router.push(
                                '/notice',
                                { scroll: false }
                            )
                        }
                    />
                </div>
            </div>
        </div >
    )
}