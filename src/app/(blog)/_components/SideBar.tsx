// 추후 컴포넌트 분리 필요

"use client";

import { useState } from "react";
import { LogoIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { useParams } from "next/navigation"; // id 파싱
import { SbGotestIcon, SbHiddenIcon, SbHomeIcon, SbMyblogIcon, SbNewpostIcon } from "./Icons";
import { loggedInUserId, blogOwnerId } from "../_constants/constants";
import Board from "./sidebar-board/Board";

export default function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false); // 최소화
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const params = useParams();
    const blogId = Number(params.id);

    // 본인 블로그 여부 판단
    const isOwnBlog = blogId === loggedInUserId;

    // 사이드바 페이지 이동 컴포넌트
    const SidebarLink = ({ href, label, Icon }: { href: string; label: string; Icon: React.FC }) => (
        <Link href={href} className={`flex items-center h-6 py-6 text-black ${isCollapsed ? "justify-center w-6 ml-2" : "justify-between w-60 pl-6 pr-2"}`}>
            {!isCollapsed && <p className="text-xs">{label}</p>}
            <Icon />
        </Link>
    );

    return (
        <nav className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-150 z-20 ${isCollapsed ? "w-10" : "w-60"}`}>
            {/* 사이드바 상단 요소 */}
            <div className={`flex items-center h-8 mt-5 mb-3 mr-2 ${isCollapsed ? "justify-center w-6 ml-2" : "justify-between w-52 ml-6"}`}>
                {!isCollapsed && <Link href="/"><LogoIcon /></Link>}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <SbHiddenIcon />
                </button>
            </div>

            <SidebarLink
                href={`/blog/${blogId}`}
                label={isOwnBlog ? "나의 블로그 홈" : `${blogOwnerId}의 블로그 홈`}
                Icon={SbHomeIcon}
            />
            {/* 게시판 목록 */}
            <div className="max-h-[640px] overflow-y-auto">
                {!isCollapsed && (
                    <Board blogId={blogId} isOwnBlog={isOwnBlog} /> )}
            </div>

            {/* 하단 요소 */}
            <div className="absolute bottom-2">
                <SidebarLink href="/" label="문제 풀러 가기" Icon={SbGotestIcon} />
                {isOwnBlog ? (
                    <SidebarLink href="/" label="새 게시글" Icon={SbNewpostIcon} />
                ) : (
                    <SidebarLink href={`/blog/${loggedInUserId}`} label="내 블로그로" Icon={SbMyblogIcon} />
                )}
            </div>

        </nav>
    );
}
