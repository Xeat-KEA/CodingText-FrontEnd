import Link from "next/link";
import { MainMenuBtnProps } from "../_interfaces/interfaces";
import { motion } from "framer-motion";
import { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { useRouter } from "next/navigation";

export default function MainMenuBtn({ icon, title, url }: MainMenuBtnProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <motion.div
        className="w-[96px] h-[96px] rounded-xl"
        initial={{ backgroundColor: "rgb(255, 255, 255)" }}
        whileHover={{ backgroundColor: "rgb(247, 247, 247)" }}
        transition={{ duration: 0.2, type: "tween" }}
      >
        {/* 메인 메뉴 아이콘 */}
        <Link
          onClick={() => {
            if (!url) {
              setIsDialogOpen((prev) => !prev);
            }
          }}
          href={url}
          className="w-full h-full flex-center flex-col gap-1"
        >
          {icon}
          <span className="text-sm font-semibold text-body">{title}</span>
        </Link>
      </motion.div>
      {isDialogOpen && (
        <Dialog
          title={"로그인 후\n사용할 수 있어요"}
          backBtn="확인"
          onBackBtnClick={() => setIsDialogOpen((prev) => !prev)}
          primaryBtn="로그인"
          onBtnClick={() => router.push("/sign-in")}
        />
      )}
    </>
  );
}
