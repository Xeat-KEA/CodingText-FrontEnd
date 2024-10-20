"use client";

import { useEffect, useState } from "react";
import { LogoIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { SbGotestIcon, SbHiddenIcon, SbHomeIcon, SbMyblogIcon, SbNewpostIcon } from "./Icons";
import { Blog_Profile_Data, Board_Categories, loggedInUserId, User_Specific_Categories,} from "../_constants/constants";
import Board from "./sidebar-board/Board";
import { useBlogStore } from "@/app/stores";
import { useParams } from "next/navigation";

export default function SideBar() {
    // 전역 변수
    const {
        profile,
        isOwnBlog,
        setParams
    } = useBlogStore();

    const params = useParams();
    const blogId = Number(params.id);
    const setProfile = useBlogStore((profile) => profile.setProfile);
    const setBlogId = useBlogStore((state) => state.setBlogId);
    const setIsOwnBlog = useBlogStore((state) => state.setIsOwnBlog);
    const setBoardCategories = useBlogStore((state) => state.setBoardCategories);
    const setActiveCategories = useBlogStore((state) => state.setActiveCategories);

    const [isCollapsed, setIsCollapsed] = useState(false); // 최소화
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    useEffect(() => {
        const foundProfile = Blog_Profile_Data.find((profile) => profile.profileId === blogId);
        const userSpecificCategories = User_Specific_Categories.filter(category => category.blogId === blogId); // 개별

        setParams({
            id: params.id,
            categoryId: params.categoryId,
            subCategoryId: params.subCategoryId,
            postId: params.postId,
        });
        setBoardCategories([...Board_Categories, ...userSpecificCategories]);
        setActiveCategories([]);
        setBlogId(blogId);
        setIsOwnBlog(blogId === loggedInUserId);
        if (foundProfile) {
            setProfile(foundProfile);
        }
    }, [blogId, setProfile]);

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
                href={`/blog/${profile?.profileId}`}
                label={isOwnBlog ? "나의 블로그 홈" : `${profile?.name}의 블로그 홈`}
                Icon={SbHomeIcon}
            />
            {/* 게시판 목록 */}
            <div className={`flex-1 overflow-y-auto`} style={{ maxHeight: "calc(100vh - 252px)" }}>
                {!isCollapsed && (
                    <div className="relative">
                        <Board />
                    </div>
                )}
            </div>

            {/* 하단 요소 */}
            <div className="absolute bottom-2 w-full bg-white z-10">
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
