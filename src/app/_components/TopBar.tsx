"use client";

import { useRef, useState } from "react";
import { ITopBar } from "../_interfaces/interfaces";
import { NoticeIcon, LogoIcon } from "./Icons";
import SearchBar from "./SearchBar";
import { PROFILE_MENU, TOP_BAR_MENU } from "../_constants/constants";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import Link from "next/link";

export default function TopBar({ isLoggedIn, isCodingPage }: ITopBar) {
  // 팝업 상태 관리 state
  const [isPopUpOpen, setIsPopUpOpen] = useState({
    notice: false,
    profile: false,
  });

  // 알람 아이콘 클릭 시
  const onNoticeClicked = () => {
    setIsPopUpOpen((prev) => ({ ...prev, notice: !prev.notice }));
  };

  // 내 프로필 클릭 시
  const onProfileClicked = () => {
    setIsPopUpOpen((prev) => ({ ...prev, profile: !prev.profile }));
  };

  // useOutsideClick 예외 ref
  const noticeRef = useRef(null);
  const profileRef = useRef(null);

  // 팝업창 바깥 영역 클릭 감지용 hook 선언
  const noticePopupRef = useOutsideClick(
    () => setIsPopUpOpen((prev) => ({ ...prev, notice: false })),
    noticeRef
  );
  const profilePopupRef = useOutsideClick(
    () => setIsPopUpOpen((prev) => ({ ...prev, profile: false })),
    profileRef
  );

  return (
    <nav className="fixed w-full h-16 bg-white border-b border-border-1 flex justify-center z-50">
      <div
        className={`relative w-full flex justify-between ${
          !isCodingPage ? "max-w-[1200px] px-12" : "px-6"
        }`}
      >
        {/* 탑바 좌측 요소 */}
        <div className="flex items-center gap-14">
          <Link href="/">
            <LogoIcon />
          </Link>
          {/* 메뉴 */}
          <ul className="flex h-full items-center gap-2">
            {TOP_BAR_MENU.map((el, index) => {
              if (isLoggedIn) {
                // 로그인 했을 시 모든 메뉴 표시
                return (
                  <Link key={index} href={el.url} className="top-bar-menu-btn">
                    {el.content}
                  </Link>
                );
              } else {
                // 로그인 하지 않을 시 첫 번째 메뉴만 표시
                if (index === 0) {
                  return (
                    <Link
                      key={index}
                      href={el.url}
                      className="top-bar-menu-btn"
                    >
                      {el.content}
                    </Link>
                  );
                }
              }
            })}
          </ul>
        </div>
        {/* 탑바 우측 요소 */}
        <div className="flex items-center gap-6">
          {/* 검색창 */}
          <div className="w-[240px]">
            <SearchBar isSmall />
          </div>
          {/* 로그인 : 알림, 프로필 / 비로그인 : 로그인 버튼 */}
          {isLoggedIn ? (
            <>
              <button
                ref={noticeRef}
                className="relative"
                onClick={onNoticeClicked}
              >
                {
                  <div className="absolute w-1 h-1 rounded-full bg-red right-[2px] top-[2px]"></div>
                }
                <NoticeIcon />
              </button>
              <button
                ref={profileRef}
                className="w-9 h-9 border border-border-2 rounded-full"
                onClick={onProfileClicked}
              >
                {/* 프로필 이미지 추가 필요 */}
              </button>
            </>
          ) : (
            <button className="sm-btn-primary rounded-full">로그인</button>
          )}
        </div>
        {/* 알림 팝업 */}
        {isPopUpOpen.notice && (
          <div
            ref={noticePopupRef}
            className="absolute bg-white right-0 top-[calc(100%+8px)] w-[396px] h-[300px] flex flex-col rounded-lg shadow-1 divide-y divide-border-1"
          >
            {/* 알림 내용 추가 필요 */}
          </div>
        )}
        {/* 프로필 팝업 */}
        {isPopUpOpen.profile && (
          <div
            ref={profilePopupRef}
            className="absolute bg-white right-0 top-[calc(100%+8px)] w-[160px] flex flex-col rounded-lg shadow-1 divide-y divide-border-1"
          >
            {/* 사용자 정보 */}
            <div className="flex flex-col gap-[2px] px-6 py-4">
              <span className="text-body text-xs font-bold">Junior</span>
              <span className="text-base font-bold text-black">사용자123</span>
            </div>
            {/* 프로필 메뉴 */}
            {PROFILE_MENU.map((el, index) => (
              <Link
                key={index}
                href={el.url}
                className={`profile-popup-menu ${
                  el.content === "로그아웃" ? "text-red" : "text-black"
                }`}
              >
                {el.content}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
