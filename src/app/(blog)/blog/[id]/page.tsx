import Link from "next/link";
import BlogProfile from "../../_components/BlogProfile";
import { BpEditIcon } from "../../_components/Icons";
import SideBar from "../../_components/SideBar";
import BlogLayout from "./layout";
import { blog_Introduction_Data } from "../../_constants/constants";
import DOMPurify from "isomorphic-dompurify";

export default function BlogPage() {

    return (
        <>
            <div className="flex w-full justify-center">
                <div className="max-w-1000 min-h-screen">
                    <BlogProfile />

                    <Link href="/" className="inline-flex items-center w-auto h-5 gap-1 ml-2">
                        <BpEditIcon />
                        <p className="text-primary text-xs font-semibold">사용자 정보 수정</p>
                    </Link>

                    <hr className="w-226 border-t-1 border-border2 my-6" />

                    <div className="w-226 h-[442px] border border-border2 rounded-xl mb-6 p-4">
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(String(blog_Introduction_Data))
                            }}
                        ></div>
                    </div>

                    <Link href="/" className="inline-flex items-center w-auto h-5 gap-1 ml-2">
                        <BpEditIcon />
                        <p className="text-primary text-xs font-semibold">블로그 정보 수정</p>
                    </Link>
                </div>
            </div>

        </>
    )
}