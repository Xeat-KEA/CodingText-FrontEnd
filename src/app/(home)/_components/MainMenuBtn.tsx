import Link from "next/link";
import { MainMenuBtnProps } from "../_interfaces/interfaces";
import { motion } from "framer-motion";

export default function MainMenuBtn({ icon, title, url }: MainMenuBtnProps) {
  return (
    <motion.div
      className="w-[96px] h-[96px] rounded-xl"
      initial={{ backgroundColor: "rgb(255, 255, 255)" }}
      whileHover={{ backgroundColor: "rgb(247, 247, 247)" }}
      transition={{ duration: 0.2 }}
    >
      {/* 메인 메뉴 아이콘 */}
      <Link href={url} className="w-full h-full flex-center flex-col gap-1">
        {icon}
        <span className="text-sm font-semibold text-body">{title}</span>
      </Link>
    </motion.div>
  );
}
