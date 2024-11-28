import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full py-4 flex flex-col items-center gap-1 border-t border-border-2">
      <span className="text-xs text-body">
        가천대학교 SW 아카데미 5기 Xeat 팀
      </span>
      <div className="flex items-center gap-2">
        <Link className="text-xs text-body" href="/policy">
          개인정보처리방침
        </Link>
        <div className="w-[1px] h-[10px] bg-border-2" />
        <Link className="text-xs text-body" href="/terms">
          약관
        </Link>
      </div>
      <a className="text-xs text-body" href="https://storyset.com/online">
        Online illustrations by Storyset
      </a>
    </div>
  );
}
