import { useOutsideClick } from "../_hooks/useOutsideClick";
import { DialogProps } from "../_interfaces/interfaces";

export default function Dialog({
  icon,
  title,
  isTitleSm,
  content,
  isWarning,
  backBtn,
  onBackBtnClick,
  subBtn,
  onSubBtnClick,
  primaryBtn,
  redBtn,
  onBtnClick,
  children, // 추가
  blockOutsideClick,
}: DialogProps) {
  const ref = !blockOutsideClick ? useOutsideClick(onBackBtnClick) : null;
  return (
    <div className="overlay">
      <div className="absolute w-full h-full px-12 flex-center">
        <div
          ref={ref}
          className="w-full max-w-[400px] flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-1"
        >
          <div className="flex flex-col items-center gap-4 py-6">
            {icon && icon}
            <div className="flex flex-col gap-2 text-center">
              <span
                className={`whitespace-pre-wrap text-black font-semibold ${
                  isTitleSm ? "text-lg" : "text-xl"
                }`}
              >
                {title}
              </span>
              <span
                className={`whitespace-pre-wrap ${
                  isWarning ? "font-bold text-red" : "text-body"
                }`}
              >
                {content}
              </span>
            </div>
          </div>
          {children}
          <div className="flex gap-4">
            {/* 뒤로가기 버튼 */}
            <button onClick={onBackBtnClick} className="btn-default w-full">
              {backBtn}
            </button>
            {/* 중간 버튼 (코딩 테스트 정답) */}
            {subBtn && (
              <button onClick={onSubBtnClick} className="btn-default w-full">
                {subBtn}
              </button>
            )}
            {/* Primary 색상 버튼 */}
            {primaryBtn && (
              <button onClick={onBtnClick} className="btn-primary w-full">
                {primaryBtn}
              </button>
            )}
            {/* Red 색상 버튼 */}
            {redBtn && (
              <button onClick={onBtnClick} className="btn-red w-full">
                {redBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
