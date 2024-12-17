import { ToggleBtnProps } from "../_interfaces/interfaces";
import { motion } from "framer-motion";

export default function ToggleBtn({ content, state, onClick }: ToggleBtnProps) {
  return (
    <div className="flex gap-4 items-center">
      <span className="text-xs text-black">{content}</span>
      <div
        onClick={onClick}
        className={`w-10 h-5 rounded-full flex items-center px-[3px] cursor-pointer ${
          state ? "bg-green" : "bg-disabled"
        }`}
      >
        <motion.div
          animate={{ x: state ? 20 : 0 }}
          transition={{ duration: 0.1, type: "tween" }}
          className="w-[14px] h-[14px] rounded-full bg-white"
        />
      </div>
    </div>
  );
}
