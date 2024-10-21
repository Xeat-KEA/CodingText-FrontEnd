"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SmSearchBar from "./SmSearchBar";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { TOP_BAR_MENU } from "@/app/_constants/constants";
import { LogoIcon, NoticeIcon } from "../Icons";
import ProfilePopup from "../ProfilePopup";
import { useCheckToken } from "@/app/_hooks/useCheckToken";
import Image from "next/image";

export default function TopBar() {
  const pathname = usePathname();

  // 로그인 여부 확인
  const { token, isLoaded } = useCheckToken();

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
          !pathname.startsWith("/coding-test") ? "max-w-[1200px] px-12" : "px-6"
        }`}
      >
        {/* 탑바 좌측 요소 */}
        <div className="flex items-center gap-14">
          <Link href="/" scroll={false}>
            <LogoIcon />
          </Link>
          {/* 메뉴 */}
          {isLoaded && (
            <ul className="flex h-full items-center gap-2">
              {TOP_BAR_MENU.map((el, index) => {
                if (token) {
                  // 로그인 했을 시 모든 메뉴 표시
                  return (
                    <Link
                      key={index}
                      href={el.url === "/blog" ? `${el.url}/${token}` : el.url}
                      className="top-bar-menu-btn"
                      scroll={false}
                    >
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
                        scroll={false}
                      >
                        {el.content}
                      </Link>
                    );
                  }
                }
              })}
            </ul>
          )}
        </div>

        {/* 탑바 우측 요소 */}
        {isLoaded && (
          <div className="flex items-center gap-6">
            {/* 검색창 */}
            <div className="w-[240px]">
              <SmSearchBar />
            </div>
            {/* 로그인 : 알림, 프로필 / 비로그인 : 로그인 버튼 */}
            {token ? (
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
                  className="w-9 h-9 border border-border-2 rounded-full overflow-hidden"
                  onClick={onProfileClicked}
                >
                  <Image
                    width={36}
                    height={36}
                    src={"/profileImg1.png"}
                    alt="profileImg"
                  />
                </button>
              </>
            ) : (
              <Link href="/sign-in" className="sm-btn-primary rounded-full">
                로그인
              </Link>
            )}
          </div>
        )}
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
            <ProfilePopup />
          </div>
        )}
      </div>
    </nav>
  );
}
