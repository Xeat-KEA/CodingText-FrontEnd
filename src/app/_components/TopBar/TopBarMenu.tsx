import {
  DEFAULT_BUTTON_VARIANTS,
  TOP_BAR_MENU,
} from "@/app/_constants/constants";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TopBarMenu({
  token,
  blogId,
}: {
  token: string;
  blogId: number | null;
}) {
  return (
    <>
      {TOP_BAR_MENU.map((el, index) => {
        if (token) {
          // 로그인 했을 시 모든 메뉴 표시
          return (
            <motion.div
              key={index}
              variants={DEFAULT_BUTTON_VARIANTS}
              initial="initial"
              whileHover="hover"
              transition={{ duration: 0.2 }}
              className="top-bar-menu-btn"
            >
              <Link
                key={index}
                href={el.url === "/blog" ? `/blog/${blogId}` : el.url}
                scroll={false}
                className="flex items-center w-full h-full px-2 max-lg:px-12"
              >
                {el.content}
              </Link>
            </motion.div>
          );
        } else {
          // 로그인 하지 않을 시 첫 번째 메뉴만 표시
          if (index === 0) {
            return (
              <motion.div
                key={index}
                variants={DEFAULT_BUTTON_VARIANTS}
                initial="initial"
                whileHover="hover"
                className="top-bar-menu-btn"
              >
                <Link
                  key={index}
                  href={el.url}
                  scroll={false}
                  className="flex items-center w-full h-full  px-2 max-lg:px-12"
                >
                  {el.content}
                </Link>
              </motion.div>
            );
          }
        }
      })}
    </>
  );
}
