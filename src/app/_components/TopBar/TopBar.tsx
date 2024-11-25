"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { HamburgerIcon, LogoIcon, NoticeIcon } from "../Icons";
import ProfilePopup from "../ProfilePopup";
import NoticeCard from "./NoticeCard";
import SmSearchBar from "../SmSearchBar";
import ProfileImgContainer from "../ProfileImgContainer";
import { motion } from "framer-motion";
import TopBarMenu from "./TopBarMenu";
import { useTokenStore, useWindowSizeStore } from "@/app/stores";
import api from "@/app/_api/config";
import { useQuery } from "@tanstack/react-query";
import { Push, UserInfo } from "@/app/_interfaces/interfaces";

export default function TopBar() {
  const pathname = usePathname();

  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useTokenStore();

  // 팝업 상태 관리 state
  const [isOpen, setIsOpen] = useState({
    notice: false,
    profile: false,
    menu: false,
  });

  // 알림 읽음 여부 확인
  const [hasNoticeRead, setHasNoticeRead] = useState(false);
  useEffect(() => {
    // 이후 API를 통해 새로운 알림 있는지 조건문으로 판단
    if (true) {
      setHasNoticeRead((prev) => !prev);
    }
  }, []);

  const onIconClick = (
    type: "notice" | "profile" | "menu",
    state?: boolean
  ) => {
    setIsOpen((prev) => ({ ...prev, [type]: state || !prev[type] }));
  };

  // useOutsideClick 예외 ref
  const noticeRef = useRef(null);
  const profileRef = useRef(null);

  // 바깥 영역 클릭 감지용 hook 선언
  const noticePopupRef = useOutsideClick(
    () => onIconClick("notice", false),
    noticeRef
  );
  const profilePopupRef = useOutsideClick(
    () => onIconClick("profile", false),
    profileRef
  );
  const topBarRef = useOutsideClick(() => {
    if (isOpen.menu) onIconClick("menu", false);
  });

  const { windowSize } = useWindowSizeStore();

  // 사용자 정보 API 호출
  const fetchUserInfo = async () => {
    if (accessToken) {
      const response = await api.get("/user-service/users/userInfo", {
        headers: { Authorization: accessToken },
      });

      return response.data;
    } else {
      return null;
    }
  };
  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userInfo", isTokenSet],
    queryFn: fetchUserInfo,
  });

  // 알림 목록 API 호출
  const fetchPushs = async () => {
    if (accessToken) {
      const response = await api.get("blog-service/blog/notice/list", {
        // 사용자에게 알림 더미 데이터가 없어 임시 토큰 사용 중
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` },
      });

      return response.data;
    } else {
      return null;
    }
  };
  const { data: pushs } = useQuery({
    queryKey: ["pushs", isTokenSet],
    queryFn: fetchPushs,
    select: (data) => data.data,
  });

  return (
    <div className="fixed w-full h-16 z-50">
      <motion.nav
        ref={topBarRef}
        initial={{ height: 64 }}
        animate={{ height: isOpen.menu ? "auto" : 64 }}
        transition={{ duration: 0.3, type: "tween" }}
        className="w-full h-full bg-white border-b border-border-1 flex max-lg:flex-col lg:justify-center overflow-hidden"
      >
        {/* 상단바 */}
        <div
          className={`relative w-full h-16 shrink-0 flex justify-between ${
            pathname.startsWith("/coding-test")
              ? "px-6"
              : pathname.startsWith("/recent-post") ||
                pathname.startsWith("/code-post")
              ? "max-w-1000"
              : "max-w-1200"
          }`}
        >
          {/* 탑바 좌측 요소 */}
          <div className="flex items-center gap-14">
            <Link href="/" scroll={false}>
              <LogoIcon />
            </Link>
            {/* 메뉴 (화면 크기 lg 이상) */}
            {isTokenSet && (
              <ul className="flex h-full items-center gap-2 max-lg:hidden">
                <TopBarMenu token={accessToken} />
              </ul>
            )}
          </div>

          {/* 탑바 우측 요소 */}
          {isTokenSet && (
            <div className="flex items-center gap-6">
              {/* 검색창 (화면 크기 lg 이상) */}
              <div className="w-[240px] max-lg:hidden">
                <SmSearchBar baseURL="/search" />
              </div>
              {/* 로그인 : 알림, 프로필 / 비로그인 : 로그인 버튼 */}
              {accessToken ? (
                <>
                  <button
                    ref={noticeRef}
                    className="relative"
                    onClick={() => onIconClick("notice")}
                  >
                    {!hasNoticeRead && (
                      <div className="absolute w-1 h-1 rounded-full bg-red right-[2px] top-[2px]"></div>
                    )}
                    <NoticeIcon />
                  </button>
                  <button
                    ref={profileRef}
                    onClick={() => onIconClick("profile")}
                  >
                    <ProfileImgContainer
                      width={36}
                      height={36}
                      src={userInfo?.profileUrl}
                    />
                  </button>
                </>
              ) : (
                <Link href="/sign-in" className="sm-btn-primary rounded-full">
                  로그인
                </Link>
              )}
              {/* 메뉴 더보기 버튼 (화면 크기 lg 이하) */}
              <button onClick={() => onIconClick("menu")} className="lg:hidden">
                <HamburgerIcon />
              </button>
            </div>
          )}
        </div>
        {/* 메뉴 (화면 크기 lg 이하) */}
        <div className="w-full flex flex-col bg-white lg:hidden">
          <div className="px-12 pt-4 pb-6 border-b border-border-1">
            <SmSearchBar
              baseURL="/search"
              placeholder="검색어를 입력해주세요"
            />
          </div>
          <TopBarMenu token={accessToken} />
        </div>
      </motion.nav>
      {/* 알림 팝업 */}
      {isOpen.notice && (
        <div
          ref={noticePopupRef}
          style={{
            right: `calc(8px + ${Math.max((windowSize - 1200) / 2, 0)}px)`,
          }}
          className="absolute bg-white top-[calc(100%+8px)] w-[396px] h-[300px] flex flex-col rounded-lg shadow-1 divide-y divide-border-1 overflow-y-auto"
        >
          {pushs.map((el: Push) => (
            <NoticeCard key={el.noticeId} push={el} />
          ))}
        </div>
      )}
      {/* 프로필 팝업 */}
      {isOpen.profile && (
        <div
          ref={profilePopupRef}
          style={{
            right: `calc(8px + ${Math.max((windowSize - 1200) / 2, 0)}px)`,
          }}
          className="absolute bg-white top-[calc(100%+8px)] w-[160px] flex flex-col rounded-lg shadow-1 divide-y divide-border-1"
        >
          {/* 사용자 정보 */}
          <div className="flex flex-col gap-[2px] px-6 py-4">
            <span className="text-body text-xs font-bold">
              {userInfo?.tier}
            </span>
            <span className="text-base font-bold text-black">
              {userInfo?.nickName}
            </span>
          </div>
          {/* 프로필 메뉴 */}
          <ProfilePopup />
        </div>
      )}
    </div>
  );
}
