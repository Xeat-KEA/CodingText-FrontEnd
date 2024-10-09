import BlogProfile from "../../_components/BlogProfile";
import SideBar from "../../_components/SideBar";
import BlogLayout from "./layout";

export default function BlogPage() {
    return (
        <>
            <div className="ml-60 max-w-1000 h-screen ">
                <BlogProfile />

                <hr className="w-226 border-t-1 border-border2 my-6" />

                <div className="w-226 h-[442px] border border-border2 rounded-xl">
                </div>
            </div>

        </>
    )
}