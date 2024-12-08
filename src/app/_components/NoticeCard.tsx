import { usePathname, useRouter } from "next/navigation";
import { Notice } from "../_interfaces/interfaces";
import Link from "next/link";
import { PageMoveIcon } from "./Icons";

export default function NoticeCard({
    announceId,
    title,
    createdDate
}: Notice) {
    const router = useRouter();
    const pathname = usePathname();
    const isAdmin = pathname.includes('/admin');

    const onClickReport = () => {
        if(!isAdmin) {
            router.push(`/notice/${announceId}`);
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
                        <div className="w-20 text-xs text-body font-regular">{createdDate}</div>
                        <div className="text-sm text-black font-regular">{title}</div>
                    </div>
                    <Link
                        href={`/admin/notice/${announceId}`}
                        className="flex items-center gap-2 text-xs text-primary font-semibold">
                        {"해당 공지사항 표시"}
                        <PageMoveIcon />
                    </Link>
                </>
            ) : (
                <>
                    <span className="text-sm text-black font-regular">{title}</span>
                    <span className="text-xs text-body font-regular">{createdDate}</span>
                </>
            )
            }
        </div>
    )
}