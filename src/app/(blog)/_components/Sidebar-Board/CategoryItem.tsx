import React, { useCallback, useState } from "react";
import { CategoryItemProps } from "../../_interfaces/interfaces";
import { useBlogStore, useCategoryStore, useTokenStore } from "@/app/stores";
import { useParams, usePathname, useRouter } from "next/navigation";
import ChildCategoryItem from "./ChildCategoryItem";
import AddCategory from "./AddCategory";
import api from "@/app/_api/config";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion"; // Framer Motion 임포트
import { BUTTON_VARIANTS } from "@/app/_constants/constants";

// 제목의 최대 길이 설정 (임시로 10자로 제한)
const MAX_TITLE_LENGTH = 10;

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  handleAddCategory,
  handleDeleteCategory,
}) => {
  // 로그인 여부 확인
  const { accessToken, isTokenSet } = useTokenStore();

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
  const params = useParams();
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
    setActiveCategories((prev) => {
      if (prev.includes(id)) {
        return prev.filter((activeId) => activeId !== id);
      } else {
        return [...prev, id];
      }
    });
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
          headers: { Authorization: accessToken },
        }
      );

      // 추가 후 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });

      setEditCategoryId(null);
      setEditCategoryTitle("");
    } catch (error) {
      console.error("상위 수정 저장 실패: ", error);
    }
  };

  return (
    <div className="board" key={category.id}>
      <motion.div
        variants={BUTTON_VARIANTS}
        initial="initial"
        whileHover="hover"
        className="flex items-center relative text-black bg-white text-sm font-regular h-10 cursor-pointer"
        onMouseEnter={() => setHoveredCategoryId(true)}
        onMouseLeave={() => setHoveredCategoryId(false)}
      >
        {editCategoryId === category.id ? (
          isOwnBlog && (
            <div className="w-full h-full flex items-center pl-6 bg-white">
              <input
                type="text"
                value={editCategoryTitle}
                onChange={(e) => setEditCategoryTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-bg-1 text-body text-sm font-regular p-1 w-32"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex text-2xs space-x-2">
                <button
                  className="text-primary-1"
                  onClick={() => saveEditCategory(category.id)}
                >
                  저장
                </button>
                <button
                  className="text-disabled"
                  onClick={() => {
                    setEditCategoryId(null);
                    setEditCategoryTitle("");
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          )
        ) : (
          <>
            <p
              className={`cursor-pointer w-full h-full flex items-center pl-6 bg-white ${
                category.id === Number(params.categoryId) ||
                (category.id === 1 &&
                  pathname.includes(`/blog/${currentBlogId}/code`))
                  ? "font-bold"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.title}
            </p>
            {isOwnBlog && category.id !== 1 && hoveredCategoryId === true && (
              <div className="absolute right-3 flex text-2xs space-x-2">
                <button
                  className="text-primary-1"
                  onClick={() => {
                    setEditCategoryId(category.id);
                    setEditCategoryTitle(category.title);
                  }}
                >
                  수정
                </button>
                <button
                  className="text-red"
                  onClick={() =>
                    handleDeleteCategory(category.id, category.title, false)
                  }
                >
                  삭제
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {activeCategories.includes(category.id) && category.childCategories && (
          <motion.div
            className="bg-white overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* 하위 게시판 전체 */}
            <motion.p
              variants={BUTTON_VARIANTS}
              initial="initial"
              whileHover="hover"
              className={`flex items-center relative bg-white text-xs font-regular h-8 pl-10 py-2 cursor-pointer ${
                pathname ===
                (category.id === 1
                  ? `/blog/${currentBlogId}/code`
                  : `/category/${category.id}`)
                  ? "font-bold"
                  : ""
              }`}
              onClick={() =>
                router.push(
                  category.id === 1
                    ? `/blog/${currentBlogId}/code`
                    : `/category/${category.id}`
                )
              }
            >
              전체
            </motion.p>

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
              <motion.div
                variants={BUTTON_VARIANTS}
                initial="initial"
                whileHover="hover"
              >
                {isAddingChildCategory[category.id] ? (
                  <AddCategory
                    handleAddCategory={handleAddCategory}
                    parentId={category.id}
                    isChildCategory={true}
                  />
                ) : (
                  <button
                    onClick={() => setIsAddingChildCategory(category.id, true)}
                    className="text-2xs text-disabled h-8 w-full flex pl-10 py-2"
                  >
                    새 하위 게시판 추가
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryItem;
