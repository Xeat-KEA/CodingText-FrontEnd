import { motion } from "framer-motion";  // motion 임포트
import { BpEditIcon, SmDeleteIcon } from "../(blog)/_components/Icons";
import { IconBtnProps } from "../_interfaces/interfaces";
import { BlindIcon, ReportIcon } from "./Icons";

export default function IconBtn({ type, content, onClick }: IconBtnProps) {
  // 애니메이션 설정
  const buttonVariants = {
    rest: { scale: 1 }, // 기본 크기
    clicked: { scale: 0.95, transition: { type: "spring", stiffness: 300 } }, // 클릭 시 애니메이션
  };

  return (
    <motion.button
      onClick={onClick}
      className="flex-center gap-1"
      variants={buttonVariants} // 애니메이션 변수 추가
      initial="rest"
      whileTap="clicked" // 클릭 시 애니메이션 적용
    >
      {/* type에 따라 아이콘 세팅 */}
      {type === "edit" && <BpEditIcon />}
      {type === "delete" && <SmDeleteIcon />}
      {type === "report" && <ReportIcon />}
      {type === "blind" && <BlindIcon />}
      
      <span
        className={`text-xs font-semibold whitespace-nowrap ${
          type === "edit" ? "text-primary-1" : type === "blind" ? "text-body" : "text-red"
        }`}
      >
        {content}
      </span>
    </motion.button>
  );
}