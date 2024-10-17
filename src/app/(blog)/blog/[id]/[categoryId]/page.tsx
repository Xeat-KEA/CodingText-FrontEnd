"use client";

import { DUMMY_BLOG_POST_DATA } from "@/app/(blog)/_constants/constants";
import PostCard from "@/app/_components/PostCard";
import SearchBar from "@/app/_components/SearchBar";
import { TAB_BAR_ORDER_FILTER } from "@/app/_constants/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogAllListPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("ACCURACY");
  useEffect(() => {
    // filter 변경 시 다시 GET 하는 로직 필요
  }, [filter]);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword !== null) {
      // keyword 변화 시 감지 후 다시 GET하는 로직 필요
      console.log(keyword);
    }
  }, [searchParams]);

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-1000 min-h-screen flex flex-col gap-6 py-12">
        <SearchBar baseURL={pathname} />
        {/* 필터링 */}
        <div className="w-full h-[52px] flex justify-end items-center border-b border-border-2">
          <div className="flex gap-3 items-center">
            {TAB_BAR_ORDER_FILTER.map((el) => (
              <button
                key={el.state}
                onClick={() => setFilter(el.state)}
                className={`text-xs ${
                  filter === el.state
                    ? "text-primary font-semibold"
                    : "text-disabled"
                }`}
              >
                {el.content}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border-2">
          {DUMMY_BLOG_POST_DATA.map((el, index) => (
            <PostCard
              key={index}
              category={el.category}
              title={el.title}
              content={el.content}
              createAt={el.createdAt}
              likes={el.likes}
              comments={el.comments}
              views={el.views}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
