"use client";
import { useParams, usePathname } from "next/navigation";
import { useBlogStore } from "@/app/stores";
import { Board_Categories, loggedInUserId, Other_Board_Categories } from "../../_constants/constants";
import BlogProfile from "../../_components/BlogProfile";
import BlogInfo from "../../_components/BlogInfo";
import { useEffect } from "react";

export default function BlogHomePage() {
    const params = useParams();
    const blogId = Number(params.id);
    const setBlogId = useBlogStore((state) => state.setBlogId);
    const setIsOwnBlog = useBlogStore((state) => state.setIsOwnBlog);
    const setBoardCategories = useBlogStore((state) => state.setBoardCategories);
    const setActiveCategories = useBlogStore((state) => state.setActiveCategories); // 추가

    useEffect(() => {
        setBlogId(blogId);
        setIsOwnBlog(blogId === loggedInUserId);
        setBoardCategories(blogId === loggedInUserId ? Board_Categories : Other_Board_Categories);
        setActiveCategories([]);
    }, [blogId]);

    return (
        <>
            <div className="flex w-full justify-center">
                <div className="max-w-1000 min-h-screen">
                    {/* 블로그 프로필 정보 */}
                    <BlogProfile />

                    {/* 구분선 */}
                    <hr className="w-226 border-t-1 border-border2 my-6" />

                    {/* 블로그 소개 정보 */}
                    <BlogInfo />
                </div>
            </div>

        </>
    )
}