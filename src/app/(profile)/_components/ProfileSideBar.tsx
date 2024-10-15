"use client";

import Link from "next/link";
import { PROFILE_TAB } from "../_constants/constants";
import { usePathname } from "next/navigation";

export default function ProfileSideBar() {
  // 현재 위치 url 파악
  const pathname = usePathname();

  return (
    <div className="w-[200px] shrink-0 h-full flex flex-col border-r border-border-2">
      {PROFILE_TAB.map((el, index) => (
        <Link
          key={index}
          href={el.url}
          className={`side-bar-tab ${
            el.url === pathname
              ? "border-l-[3px] border-primary font-bold pl-[13px]"
              : "pl-4"
          }`}
          scroll={false}
        >
          {el.content}
        </Link>
      ))}
    </div>
  );
}
