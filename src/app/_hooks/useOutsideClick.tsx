import { useEffect, useRef } from "react";

// const ref = useOutsideClick(() => { 원하는 작업 })으로 선언한 뒤
// 원하는 div에 <div ref={ref}>로 지정하여 사용해주세요

export const useOutsideClick = (
  onClick: () => void,
  // hook 적용 예외 엘리먼트 지정
  targetRef?: React.RefObject<any>
): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (!targetRef || !targetRef.current.contains(event.target as Node))
      ) {
        // 영역 밖이 클릭되었을 때의 행동 (props로 전달)
        onClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  return ref;
};
