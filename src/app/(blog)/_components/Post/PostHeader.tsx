// 게시물 헤더 컴포넌트

import { useCalculateDate } from "@/app/_hooks/useCalculateDate";
import { PostProps } from "../../_interfaces/interfaces";
import { IsCoding_Data } from "../../_constants/constants";

const PostHeader: React.FC<PostProps> = ({
    currentPost,
    currentCategory,
    currentSubCategory,
}) => {
    
    const isCodingPost = Number(currentCategory?.id) === 1;
    const currentCodingPost = IsCoding_Data.find(post => post.postId === Number(currentPost?.postId));

    return (
        <div className="flex flex-col w-full h-[90px] justify-center gap-2">
            {/* 하위 게시판, 조회수, 날짜 */}
            <div className="flex justify-between items-center w-full">
                <p className="text-sm text-body font-regular" >{currentSubCategory?.title}</p>
                <div className="flex items-center gap-2 h-4">
                    <p className="text-xs text-body font-regular">조회수 {currentPost?.viewCount}</p>
                    <div className="bg-border-2 w-[1px] h-[10px]"></div>
                    <p className="text-xs text-body font-regular"> {useCalculateDate(currentPost?.createdAt || "")}</p>
                </div>
            </div>

            {/* 제목 */}
            <div className="flex w-full text-xl font-semibold">
                <p className="text-black line-clamp-2">
                    {isCodingPost && (
                        <span className="text-primary">#{currentCodingPost?.codeId} </span>
                    )}
                    {currentPost?.title}
                </p>
            </div>
        </div>
    )
}

export default PostHeader;