import Link from "next/link";
import { ChildCategoryItemProps } from "../../_interfaces/interfaces";
import { useState } from "react";
import { useBlogStore, useCategoryStore } from "@/app/stores";
import { useParams } from "next/navigation";
import api from "@/app/_api/config";
import { useQueryClient } from "@tanstack/react-query";

const MAX_TITLE_LENGTH = 10;


const ChildCategoryItem: React.FC<ChildCategoryItemProps> = ({
  childCategory,
  category,
  handleDeleteCategory,
}) => {
  // 전역 변수
  const { userBlogId, isOwnBlog } = useBlogStore();
  const {categoryId, childCategoryId} = useCategoryStore();
  const params = useParams();
  const queryClient = useQueryClient();
  const [editid, setEditid] = useState<{ [categoryId: number]: number | null }>(
    {}
  );
  const [editChildCategoryTitle, setEditChildCategoryTitle] =
    useState<string>("");
  const [hoveredId, setHoveredId] = useState<Boolean>(false);

  // 하위 게시판 수정 요청
  const handleEditChildCategory = async (
    categoryId: number,
    id: number,
    title: string
  ) => {
    setEditid((prevState) => ({
      ...prevState,
      [categoryId]: id,
    }));
    setEditChildCategoryTitle(title);
  };

  const cancelEditChildCategory = (categoryId: number) => {
    setEditid((prevState) => ({ ...prevState, [categoryId]: null }));
    setEditChildCategoryTitle("");
  };

  // 하위 수정 저장
  const saveEditChildCategory = async (categoryId: number, childCategoryId: number) => {
    const trimmedTitle = editChildCategoryTitle.trim().slice(0, MAX_TITLE_LENGTH);
    try {
      await api.put(`/blog-service/blog/board/child/${childCategoryId}`, 
        {childName: trimmedTitle,},
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );

      setEditid((prevState) => ({ ...prevState, [categoryId]: null }));
      setEditChildCategoryTitle("");

      // 추가 후 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });
    } catch (error) {
      console.log("하위 수정 저장 실패: ", error);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <div
      className="flex items-center relative text-xs font-regular h-8 py-2 cursor-pointer"
      key={childCategory.id}
      onMouseEnter={() => setHoveredId(true)}
      onMouseLeave={() => setHoveredId(false)}>
      {editid[category.id] === childCategory.id ? (
        isOwnBlog && (
          <>
            <input
              type="text"
              value={editChildCategoryTitle}
              onChange={(e) => setEditChildCategoryTitle(e.target.value)}
              onKeyPress={(e) =>
                handleKeyPress(e, () =>
                  saveEditChildCategory(category.id, childCategory.id)
                )
              }
              className="bg-bg-1 text-xs font-regular pl-1 w-32 h-6"
            />
            <div className="absolute right-3 flex text-2xs space-x-2">
              <button
                className="text-primary-1"
                onClick={() =>
                  saveEditChildCategory(category.id, childCategory.id)
                }>
                저장
              </button>
              <button
                className="text-disabled"
                onClick={() => cancelEditChildCategory(category.id)}>
                취소
              </button>
            </div>
          </>
        )
      ) : (
        <>
          <Link href={`/category/${childCategory.id}`}>
            <p
              className={
                ( Number(params.categoryId) == childCategory.id) ||
                (params.postId &&
                  Number(childCategoryId) == childCategory.id)
                  ? "font-bold"
                  : ""
              }>
              {childCategory.title}
            </p>
          </Link>

          {isOwnBlog && category.id !== 1 && hoveredId === true && (
            <div className="absolute right-3 flex text-2xs space-x-2">
              <button
                className="text-primary-1"
                onClick={() =>
                  handleEditChildCategory(
                    category.id,
                    childCategory.id,
                    childCategory.title
                  )
                }>
                수정
              </button>
              <button
                className="text-red"
                onClick={() =>
                  handleDeleteCategory(
                    category.id,
                    childCategory.title,
                    true,
                    childCategory.id
                  )
                }>
                삭제
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChildCategoryItem;
