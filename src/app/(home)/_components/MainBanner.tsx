import { MouseEvent, useEffect, useState } from "react";
import { SliderNextIcon, SliderPrevIcon } from "./Icons";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useWindowSizeStore } from "@/app/stores";
import { handleWindowResize } from "@/app/utils";
import { BANNER_IMG_LIST } from "../_constants/constants";

export default function MainBanner() {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [isBack, setIsBack] = useState(false);

  // 버튼 클릭 시 페이지 이동 및 isBack 설정
  const [isMoving, setIsMoving] = useState(false);
  const onPrevClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isMoving) {
      setIsMoving(true);
      setIsBack(true);
      setPage((prev) =>
        prev - 1 >= 0 ? prev - 1 : BANNER_IMG_LIST.length - 1
      );
    }
  };
  const onNextClick = (e?: MouseEvent) => {
    e && e.stopPropagation();
    if (!isMoving) {
      setIsMoving(true);
      setIsBack(false);
      setPage((prev) =>
        prev + 1 <= BANNER_IMG_LIST.length - 1 ? prev + 1 : 0
      );
    }
  };

  // 배너 이미지 이동 애니메이션
  const bannerVariants = {
    hidden: (isBack: boolean) => ({
      x: !isBack ? windowSize - 50 : -windowSize + 50,
    }),
    visible: {
      x: 0,
    },
    exit: (isBack: boolean) => ({
      x: !isBack ? -windowSize + 50 : windowSize - 50,
    }),
  };

  // 화면 크기 변경 시 state 변경
  const { windowSize } = useWindowSizeStore();
  handleWindowResize();

  // 배너 자동 전환 (다른 탭으로 이동 등 웹 페이지에서 벗어날 경우 애니메이션 비활성화)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    // 현재 해당 탭에 위치하고 있을 때에만 타이머 활성화
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        interval = setInterval(() => {
          setIsBack(false);
          setPage((prev) =>
            prev + 1 <= BANNER_IMG_LIST.length - 1 ? prev + 1 : 0
          );
        }, 3500);
      } else {
        clearInterval(interval);
      }
    };

    handleVisibilityChange();

    // visibilitychange 감지 시 handleVisibilityChange 함수 재실행
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [page]);

  return (
    <div className="top-container h-[320px] relative">
      {/* 이전 / 다음 버튼 */}
      <motion.button
        initial={{ color: "rgb(200, 200, 200)" }}
        whileHover={{ color: "rgb(255, 255, 255)" }}
        onClick={(e) => onPrevClick(e)}
        className="main-slider-btn left-0"
        style={{
          paddingLeft: `calc(16px + ${Math.max((windowSize - 1200) / 2, 0)}px)`,
        }}
      >
        <SliderPrevIcon />
      </motion.button>
      <motion.button
        initial={{ color: "rgb(200, 200, 200)" }}
        whileHover={{ color: "rgb(255, 255, 255)" }}
        onClick={(e) => onNextClick(e)}
        className="main-slider-btn right-0"
        style={{
          paddingRight: `calc(16px + ${Math.max(
            (windowSize - 1200) / 2,
            0
          )}px)`,
        }}
      >
        <SliderNextIcon />
      </motion.button>
      {/* 페이지네이션 */}
      <div className="absolute flex gap-3 left-1/2 -translate-x-1/2 bottom-4 z-20">
        {BANNER_IMG_LIST.map((el, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              if (!isMoving) {
                setIsMoving(true);
                if (index > page) {
                  setIsBack(false);
                } else {
                  setIsBack(true);
                }
                setPage(index);
              }
            }}
            className={`w-2 h-2 rounded-full ${
              index === page ? "bg-primary-1" : "bg-white"
            }`}
          ></button>
        ))}
      </div>
      {/* 배너 이미지 공간 */}
      <div className="w-full relative">
        <AnimatePresence
          custom={isBack}
          initial={false}
          onExitComplete={() => setIsMoving(false)}
        >
          <motion.div
            className="absolute w-full h-full top-0 left-0"
            key={page}
            custom={isBack}
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
          >
            {windowSize !== 0 && (
              <Image
                onClick={() => {
                  if (BANNER_IMG_LIST[page].url) {
                    router.push(BANNER_IMG_LIST[page].url);
                  }
                }}
                fill
                sizes="100%"
                src={
                  windowSize > 640
                    ? BANNER_IMG_LIST[page].lgImg
                    : BANNER_IMG_LIST[page].smImg
                }
                alt={BANNER_IMG_LIST[page].url}
                priority
                className="object-cover cursor-pointer"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
