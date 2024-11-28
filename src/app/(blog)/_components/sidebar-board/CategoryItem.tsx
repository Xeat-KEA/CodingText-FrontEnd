import React, { useCallback, useState } from "react";
import { CategoryItemProps } from "../../_interfaces/interfaces";
import { useBlogStore, useCategoryStore } from "@/app/stores";
import { usePathname, useRouter } from "next/navigation";
import ChildCategoryItem from "./ChildCategoryItem";
import AddCategory from "./AddCategory";
import api from "@/app/_api/config";
import { useQueryClient } from "@tanstack/react-query";
// 제목의 최대 길이 설정 (임시로 10자로 제한)
const MAX_TITLE_LENGTH = 10;

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  handleAddCategory,
  handleDeleteCategory,
}) => {
  // 전역 변수
  const { userBlogId, currentBlogId, isOwnBlog } = useBlogStore();
  const {
    activeCategories,
    setActiveCategories,
    isAddingChildCategory,
    setIsAddingChildCategory,
  } = useCategoryStore();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState<string>("");
  const [hoveredCategoryId, setHoveredCategoryId] = useState<boolean>(false);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEditCategory(category.id);
    }
  };

  // 상위 게시판 클릭 -> 하위 게시판 토글
  const handleCategoryClick = (id: number) => {
    if (id === 0) {
      // 코딩게시글 일경우 조건 추가 필요 -> 경로 다름 (/blog/[blogId]/code/1)
      router.push(`/category/0`, { scroll: false });
    } else {
      setActiveCategories((prev) =>
        prev.includes(id)
          ? prev.filter((activeId) => activeId !== id)
          : [...prev, id]
      );
    }
  };

  // 상위 수정 저장
  const saveEditCategory = async (id: number) => {
    // 최대 길이 제한 및 공백 제거
    const trimmedTitle = editCategoryTitle.trim().slice(0, MAX_TITLE_LENGTH);
    try {
      await api.put(
        `/blog-service/blog/board/parent/${id}`,
        { parentName: trimmedTitle },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );

      setEditCategoryId(null);
      setEditCategoryTitle("");
      // 추가 후 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });
    } catch (error) {
      console.error("상위 수정 저장 실패: ", error);
    }
  };

  return (
    <div className="board" key={category.id}>
      <div
        className="flex items-center relative text-black text-sm font-regular h-10 pl-6 py-2 cursor-pointer"
        onMouseEnter={() => setHoveredCategoryId(true)}
        onMouseLeave={() => setHoveredCategoryId(false)}>
        {editCategoryId === category.id ? (
          isOwnBlog && (
            <>
              <input
                type="text"
                value={editCategoryTitle}
                onChange={(e) => setEditCategoryTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-bg-1 text-body text-sm font-regular p-1 w-32"
              />
              <div className="absolute right-3 flex text-2xs space-x-2">
                <button
                  className="text-primary-1"
                  onClick={() => saveEditCategory(category.id)}>
                  저장
                </button>
                <button
                  className="text-disabled"
                  onClick={() => {
                    setEditCategoryId(null);
                    setEditCategoryTitle("");
                  }}>
                  취소
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <p
              className={`${pathname.startsWith(`/category/${category.id}`) ? "font-bold" : ""} cursor-pointer`}
              onClick={() => handleCategoryClick(category.id)}>
              {category.title}
            </p>
            {isOwnBlog && category.id !== 1 && hoveredCategoryId === true && (
              <div className="absolute right-3 flex text-2xs space-x-2">
                <button
                  className="text-primary-1"
                  onClick={() => {
                    setEditCategoryId(category.id);
                    setEditCategoryTitle(category.title);
                  }}>
                  수정
                </button>
                <button
                  className="text-red"
                  onClick={() =>
                    handleDeleteCategory(category.id, category.title, false)
                  }>
                  삭제
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {activeCategories.includes(category.id) && category.childCategories && (
        <div className="pl-10">
          {/* 하위 게시판 전체 */}
          <p
            className={`flex items-center relative text-xs font-regular h-8 py-2 cursor-pointer ${
              pathname === `/category/${category.id}` ? "font-bold" : ""
            }`}
            onClick={() => router.push(`/category/${category.id}`)}>
            전체
          </p>

          {/* 하위 게시판 목록 */}
          {category.childCategories.map((childCategory) => (
            <ChildCategoryItem
              key={childCategory.id}
              childCategory={childCategory}
              category={category}
              currentPath={pathname}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))}

          {/* 하위 게시판 추가 */}
          {isOwnBlog && category.id !== 1 && (
            <>
              {isAddingChildCategory[category.id] ? (
                <AddCategory
                  handleAddCategory={handleAddCategory}
                  parentId={category.id}
                  isChildCategory={true}
                />
              ) : (
                <button
                  onClick={() => setIsAddingChildCategory(category.id, true)}
                  className="text-2xs text-disabled h-8 py-2">
                  새 하위 게시판 추가
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
