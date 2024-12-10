"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";

import {
  SbGotestIcon,
  SbHiddenIcon,
  SbHomeIcon,
  SbMyblogIcon,
  SbNewpostIcon,
} from "./Icons";
import { LogoIcon } from "@/app/_components/Icons";
import {
  useBlogStore,
  useCategoryStore,
  useWindowSizeStore,
} from "@/app/stores";
import Board from "./Sidebar-Board/Board";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import { handleWindowResize } from "@/app/utils";

export default function SideBar() {
  handleWindowResize();

  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useCheckToken();

  // 전역 변수
  const { userBlogId, currentBlogId, isOwnBlog } = useBlogStore();
  const params = useParams();
  const pathname = usePathname();
  const setUserBlogId = useBlogStore((state) => state.setUserBlogId);
  const setIsOwnBlog = useBlogStore((state) => state.setIsOwnBlog);
  const [sideUserName, setSideUserName] = useState("");
  const setBoardCategories = useCategoryStore(
    (state) => state.setBoardCategories
  );
  const setActiveCategories = useCategoryStore(
    (state) => state.setActiveCategories
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setIsHovered(false);
  };
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // 화면 사이즈 감지 후 사이드 바 닫기
  const { windowSize } = useWindowSizeStore();

  useEffect(() => {
    if (windowSize < 1000) {
      setIsCollapsed(true);
    }
  }, [windowSize]);

  // 토큰 값으로 조회한 사용자 블로그 아이디
  const fetchUserBlogId = async () => {
    if (accessToken) {
      const response = await api.get(`/blog-service/blog`, {
        headers: { Authorization: accessToken },
      });
      const { blogId } = response.data.data;
      if (blogId && blogId !== -1 && blogId !== userBlogId) {
        setUserBlogId(blogId);
      }
      return response.data.data;
    } else {
      setUserBlogId(-1);
      return null;
    }
  };

  const { data: userBlogIdData } = useQuery({
    queryKey: ["userBlogIdData", isTokenSet],
    queryFn: fetchUserBlogId,
  });

  // 블로그 소유 여부
  useEffect(() => {
    if (accessToken && userBlogId !== -1 && currentBlogId !== -1) {
      setIsOwnBlog(userBlogId === currentBlogId);
    }
  }, [userBlogId, currentBlogId]);

  // 게시판 목록 api 연결
  const fetchBoardCategories = async () => {
    const response = await api.get(
      `/blog-service/blog/board/list/${currentBlogId}`
    );

    const boardData = response.data.data.categoryList;
    setSideUserName(response.data.data.userName);

    setBoardCategories([]);

    // 데이터 형식 변환
    const transformedCategories = boardData.map((category: any) => ({
      id: category.parentCategoryId,
      title: category.parentName,
      createDate: category.createdDate,
      childCategories: category.childCategories.map((child: any) => ({
        id: child.childCategoryId,
        title: child.childName,
        createDate: child.createdDate,
        parentCategoryId: category.parentCategoryId,
      })),
    }));
    setBoardCategories(transformedCategories);
    return boardData;
  };

  const { data: boardCategories } = useQuery({
    queryKey: ["boardCategories", isTokenSet, currentBlogId],
    queryFn: fetchBoardCategories,
    enabled: currentBlogId !== -1,
  });

  // 사이드바 페이지 이동 컴포넌트
  const SidebarLink = ({
    href,
    label,
    Icon,
  }: {
    href: string;
    label: string;
    Icon: React.FC;
  }) => (
    <Link
      href={href}
      className="flex items-center h-6 py-6 text-black justify-between w-60 pl-6 pr-2">
      <p className="text-xs">{label}</p>
      <Icon />
    </Link>
  );

  return (
    <motion.nav
      initial={{ x: -200 }}
      animate={{
        x: !isCollapsed || isHovered ? "0px" : "-200px",
      }}
      transition={{ type: "tween" }}
      className={`fixed top-0 left-0 h-screen bg-white border-r shadow-xl z-20 ${
        isHovered && isCollapsed ? "rounded-r-3xl" : ""
      }`}
      onMouseEnter={isHovered ? handleMouseEnter : undefined}
      onMouseLeave={isHovered ? handleMouseLeave : undefined}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("button, a")) {
          setIsCollapsed(false);
        }
      }}>
      {/* 사이드바 상단 요소 */}
      <div
        className="flex items-center h-8 mt-5 mb-3 justify-between w-60 pl-6 pr-2"
        onMouseEnter={!isHovered ? handleMouseEnter : undefined}
        onMouseLeave={!isHovered ? handleMouseLeave : undefined}>
        <Link href="/">
          <LogoIcon />
        </Link>
        {(isCollapsed && !isHovered) || !isCollapsed ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar();
            }}
            className={`focus:outline-none ${
              // !isCollapsed || (isCollapsed && isHovered) ? "rotate-180" : ""
              isCollapsed ? "" : "rotate-180"
            }`}>
            <SbHiddenIcon />
          </button>
        ) : null}
      </div>

      <SidebarLink
        href={`/blog/${currentBlogId}`}
        label={isOwnBlog ? "나의 블로그 홈" : `${sideUserName}의 블로그 홈`}
        Icon={SbHomeIcon}
      />
      {/* 게시판 목록 */}
      <div
        className={`flex-1 overflow-y-auto`}
        style={{ maxHeight: "calc(100vh - 252px)" }}>
        <div className="relative overflow-x-hidden">
          <Board />
        </div>
      </div>

      {/* 하단 요소 */}
      <div
        className={`absolute bottom-2 w-full bg-white z-10 ${
          !isCollapsed || isHovered ? "rounded-br-3xl" : ""
        }`}>
        <SidebarLink href="/code/list" label="문제 풀러 가기" Icon={SbGotestIcon} />
        {isOwnBlog ? (
          <SidebarLink
            href={`/new-post`}
            label="새 게시글"
            Icon={SbNewpostIcon}
          />
        ) : (
          <SidebarLink
            href={!accessToken ? `/sign-in` : `/blog/${userBlogId}`}
            label={
              !accessToken ? "로그인 후 블로그 홈으로 이동" : "내 블로그로"
            }
            Icon={SbMyblogIcon}
          />
        )}
      </div>
    </motion.nav>
  );
}
