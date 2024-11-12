import { usePathname, useRouter } from "next/navigation";
import { Notice } from "../_interfaces/interfaces";
import Link from "next/link";
import { PageMoveIcon } from "./Icons";

export default function NoticeCard({
    noticeId,
    noticeTitle,
    noticeContent,
    noticedAt
}: Notice) {
    const router = useRouter();
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');

    const onClickReport = () => {
        if(!isAdmin) {
            router.push(`/notice/${noticeId}`);
        }
    }
    return (
        <div
            onClick={onClickReport}
            className="w-full p-4 flex justify-between items-center cursor-pointer"
        >
            {isAdmin ? (
                <>
                    <div className="flex gap-4 items-center">
                        <div className="w-20 text-xs text-body font-regular">{noticedAt}</div>
                        <div className="text-sm text-black font-regular">{noticeTitle}</div>
                    </div>
                    <Link
                        href={`/admin/notice/${noticeId}`}
                        className="flex items-center gap-2 text-xs text-primary font-semibold">
                        {"해당 공지사항 표시"}
                        <PageMoveIcon />
                    </Link>
                </>
            ) : (
                <>
                    <span className="text-sm text-black font-regular">{noticeTitle}</span>
                    <span className="text-xs text-body font-regular">{noticedAt}</span>
                </>
            )
            }
        </div>
    )
}