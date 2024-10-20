"use client";
import BlogProfile from "../../_components/BlogProfile";
import BlogInfo from "../../_components/BlogInfo";

export default function BlogHomePage() {
    // 전역 변수
    return (
        <>
            <div className="flex w-full justify-center">
                <div className="max-w-1000 min-h-screen">
                    {/* 블로그 프로필 정보 */}
                    <BlogProfile />

                    {/* 구분선 */}
                    <hr className="w-full border-t-1 border-border2 my-6" />

                    {/* 블로그 소개 정보 */}
                    <BlogInfo />
                </div>
            </div>

        </>
    )
}