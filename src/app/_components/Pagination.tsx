import { usePaginationStore } from "../stores";
import { NextIcon, PrevIcon, SkipNextIcon, SkipPrevIcon } from "./Icons";

export default function Pagination() {
  const { page, setPage, lastPage } = usePaginationStore();
  // 5 단위로 나눈 페이지의 첫 페이지
  const startPage = Math.floor(page / 5) * 5 + 1;
  // 5 단위로 나눈 페이지의 마지막 페이지
  const endPage = Math.min(startPage + 4, lastPage + 1);
  // 현재 표시될 5개의 페이지 목록 계산
  const pagesList = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesList.push(i);
  }

  return (
    page >= 0 &&
    lastPage >= 0 && (
      <div className="flex items-center gap-2 self-center">
        <button
          onClick={() => {
            const prevLastPage = Math.floor(page / 5) * 5 - 1;
            setPage(prevLastPage > 0 ? prevLastPage : 0);
          }}
        >
          <SkipPrevIcon />
        </button>
        <button
          onClick={() => {
            setPage(page - 1 > 0 ? page - 1 : 0);
          }}
        >
          <PrevIcon />
        </button>
        {pagesList.map((el) => {
          if (el) {
            return (
              <button
                key={el}
                onClick={() => {
                  setPage(el - 1);
                }}
                className={`w-[18px] h-[18px] flex-center text-xs ${
                  el === page + 1 ? "font-bold text-black" : "text-disabled"
                }`}
              >
                {el}
              </button>
            );
          }
        })}
        <button
          onClick={() => {
            setPage(page + 1 <= lastPage ? page + 1 : lastPage);
          }}
        >
          <NextIcon />
        </button>
        <button
          onClick={() => {
            const nextStartPage = Math.floor(page / 5) * 5 + 5;
            setPage(nextStartPage <= lastPage ? nextStartPage : lastPage);
          }}
        >
          <SkipNextIcon />
        </button>
      </div>
    )
  );
}
