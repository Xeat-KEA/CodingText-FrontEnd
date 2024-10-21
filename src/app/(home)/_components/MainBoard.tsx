import Pagination from "@/app/_components/Pagination";
import PostCard from "@/app/_components/PostCard";
import { BOARD_TAB_LIST } from "../_constants/constants";
import { MainBoardProps } from "../_interfaces/interfaces";
import TabBar from "@/app/_components/TapBar/TabBar";

export default function MainBoard({ title, hasTab, postList }: MainBoardProps) {
  return (
    <div className="top-container">
      <div className="max-w-1200 py-[120px] flex flex-col gap-12">
        {/* 게시판 제목 */}
        <span className="text-2xl text-black font-semibold">{title}</span>
        <div className="flex flex-col w-full border border-border-2 px-16 py-6 rounded-2xl gap-6">
          {/* 탭바 여부 확인 후 TabBar 렌더링 */}
          {hasTab && <TabBar menuList={BOARD_TAB_LIST} />}
          {/* 게시글 목록 */}
          <div className="flex flex-col divide-y divide-border-2">
            {postList.map((el, index) => (
              <PostCard
                key={index}
                id={el.id}
                profileImg={el.profileImg}
                nickname={el.nickname}
                createAt={el.createAt}
                title={el.title}
                content={el.content}
                thumbnail={el.thumbnail}
                likes={el.likes}
                comments={el.comments}
                views={el.views}
              />
            ))}
          </div>
          {/* 탭바 여부 확인 후 Pagination 렌더링 */}
          {hasTab && <Pagination />}
        </div>
      </div>
    </div>
  );
}
