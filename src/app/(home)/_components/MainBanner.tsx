import { useState } from "react";
import { SliderNextIcon, SliderPrevIcon } from "./Icons";

export default function MainBanner() {
  const [page, setPage] = useState(1);
  const dummyBannerList = [
    { img: "", url: "/" },
    { img: "", url: "/" },
    { img: "", url: "/" },
  ];

  return (
    <div className="top-container h-[320px] relative">
      {/* 기본 레이아웃 (버튼, 페이지네이션) */}
      <div className="max-w-1200 h-full absolute top-0 left-1/2 -translate-x-1/2">
        {/* 이전 / 다음 버튼 */}
        <button
          onClick={() =>
            setPage((prev) =>
              prev - 1 >= 1 ? prev - 1 : dummyBannerList.length
            )
          }
          className="main-slider-btn left-4"
        >
          <SliderPrevIcon />
        </button>
        <button
          onClick={() =>
            setPage((prev) =>
              prev + 1 <= dummyBannerList.length ? prev + 1 : 1
            )
          }
          className="main-slider-btn right-4"
        >
          <SliderNextIcon />
        </button>
        {/* 현재 페이지 표시 */}
        <div className="absolute flex gap-3 left-1/2 -translate-x-1/2 bottom-4">
          {dummyBannerList.map((el, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-2 h-2 rounded-full ${
                index + 1 === page ? "bg-primary-1" : "bg-white"
              }`}
            ></button>
          ))}
        </div>
      </div>
      {/* 배너 이미지 공간 */}
      <div className="w-full bg-bg-1"></div>
    </div>
  );
}
