import { usePaginationStore } from "../stores";
import { NextIcon, PrevIcon, SkipNextIcon, SkipPrevIcon } from "./Icons";

export default function Pagination() {
  const { page, setPage, lastPage } = usePaginationStore();
  const startPage = Math.floor((page - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, lastPage);
  const pagesList = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesList.push(i);
  }

  return (
    <div className="flex items-center gap-2 self-center">
      <button
        onClick={() => {
          const prevStartPage = Math.floor((page - 1) / 5) * 5;
          setPage(prevStartPage > 0 ? prevStartPage : 1);
        }}
      >
        <SkipPrevIcon />
      </button>
      <button
        onClick={() => {
          setPage(page - 1 >= 1 ? page - 1 : 1);
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
                setPage(el);
              }}
              className={`w-[18px] h-[18px] flex justify-center items-center text-xs ${
                el === page ? "font-bold text-black" : "text-disabled"
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
          const nextStartPage = Math.floor((page - 1) / 5) * 5 + 6;
          setPage(nextStartPage <= lastPage ? nextStartPage : lastPage);
        }}
      >
        <SkipNextIcon />
      </button>
    </div>
  );
}