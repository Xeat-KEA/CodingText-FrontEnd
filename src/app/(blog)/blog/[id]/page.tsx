import Link from "next/link";
import BlogProfile from "../../_components/BlogProfile";
import { BpEditIcon } from "../../_components/Icons";
import SideBar from "../../_components/SideBar";
import BlogLayout from "./layout";

export default function BlogPage() {

    return (
        <>
            <div className="ml-60 max-w-1000 h-screen ">
                <BlogProfile />

                <Link href="/" className="inline-flex items-center w-auto h-5 gap-1 ml-2">
                    <BpEditIcon />
                    <p className="text-primary xs font-semibold">사용자 정보 수정</p>
                </Link>

                <hr className="w-226 border-t-1 border-border2 my-6" />

                <div className="w-226 h-[442px] border border-border2 rounded-xl mb-6"/>
                <Link href="/" className="inline-flex items-center w-auto h-5 gap-1 ml-2">
                    <BpEditIcon />
                    <p className="text-primary xs font-semibold">블로그 정보 수정</p>
                </Link>
            </div>

        </>
    )
}