// 사이드바 - 게시판 영역
import React, { useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { FailIcon } from "@/app/_components/Icons";
import CategoryItem from "./CategoryItem";
import AddCategory from "./AddCategory";
import { useBlogStore, useCategoryStore, useTokenStore } from "@/app/stores";
import api from "@/app/_api/config";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DEFAULT_BUTTON_VARIANTS } from "@/app/_constants/constants";
// 제목의 최대 길이 설정 (임시로 10자로 제한)
const MAX_TITLE_LENGTH = 10;

export default function Board() {
  const { accessToken, isTokenSet } = useTokenStore();

  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { currentBlogId, isOwnBlog } = useBlogStore();
  const {
    boardCategories,
    isAddingCategory,
    setIsAddingCategory,
    setIsAddingChildCategory,
  } = useCategoryStore();

  const [isAddCategoryDisabled, setIsAddCategoryDisabled] = useState(false);
  const [isInsufficientChildCategories, setIsInsufficientChildCategories] =
    useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<{
    categoryId: number;
    childCategoryId: number;
    isChild: boolean;
  } | null>(null);
  const [deleteCategoryTitle, setDeleteCategoryTitle] = useState("");

  // 상/하위 게시판 추가 함수
  const handleAddCategory = async (title: string, parentId?: number) => {
    if (accessToken) {
      if (!title) return;

      //   게시판 5개 이상 추가 제한 (코딩테스트 기본 값)
      if (!parentId && boardCategories.length >= 6) {
        setIsAddCategoryDisabled(true);
        setIsAddingCategory(false);
        setIsDialogOpen(true);
        return;
      }

      if (parentId) {
        setIsAddingChildCategory(parentId, false);
        await api.post(
          "/blog-service/blog/board/child",
          {
            parentCategoryId: parentId,
            childName: title,
          },
          {
            headers: { Authorization: accessToken },
          }
        );
      } else {
        setIsAddingCategory(false);
        await api.post(
          "/blog-service/blog/board/parent",
          { parentName: title },
          {
            headers: { Authorization: accessToken },
          }
        );
      }
      // 추가 후 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ["boardCategories", isTokenSet, currentBlogId],
      });
    }
  };

  // 상/하위 게시판 삭제 요청
  const handleDeleteCategory = (
    categoryId: number,
    title: string,
    isChild: boolean = false,
    childCategoryId: number = 0
  ) => {
    setCategoryToDelete({ categoryId, childCategoryId, isChild });
    setDeleteCategoryTitle(title);
    setIsDialogOpen(true);
  };

  // 상/하위 게시판 삭제 확인
  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    const { categoryId, childCategoryId, isChild } = categoryToDelete;

    try {
      if (isChild) {
        const remainingChildCategories = boardCategories.find(
          (category) => category.id === categoryId
        )?.childCategories;

        // 하위 게시판이 1개 미만일 경우 삭제 불가
        if (remainingChildCategories && remainingChildCategories.length <= 1) {
          setIsInsufficientChildCategories(true);
          setIsDialogOpen(false);
          return;
        }

        await api.delete(`/blog-service/blog/board/child/${childCategoryId}`, {
          data: { childCategoryId: childCategoryId },
          headers: {
            Authorization: accessToken,
          },
        });
      } else {
        await api.delete(`/blog-service/blog/board/parent/${categoryId}`, {
          data: { parentCategoryId: categoryId },
          headers: {
            Authorization: accessToken,
          },
        });
      }
      // 삭제 후 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["boardCategories"] });

      setIsDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error("카테고리 삭제 실패:", error);
    }
  };

  return (
    <div className="w-60 mt-6">
      <p className="text-disabled text-xs font-regular pl-6 py-2 h-10 flex items-center">
        게시판 목록
      </p>
      {/* 상위 게시판 전체 */}
      <motion.p
        variants={DEFAULT_BUTTON_VARIANTS}
        initial="initial"
        whileHover="hover"
        className={`flex items-center relative bg-white text-black text-sm font-regular h-10 pl-6 py-2 cursor-pointer 
          ${pathname === `/blog/${currentBlogId}/category` ? "font-bold" : ""}`}
        onClick={() => router.push(`/blog/${currentBlogId}/category`)}>
        전체
      </motion.p>

      {/* 상위 게시판 목록 */}
      {boardCategories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      ))}

      {/* 새 상위 게시판 추가 */}
      {isOwnBlog && (
        <motion.div
          variants={DEFAULT_BUTTON_VARIANTS}
          initial="initial"
          whileHover="hover"
          className="flex items-center h-10 bg-white">
          {isAddingCategory ? (
            <div className="flex items-center h-10">
              <AddCategory handleAddCategory={handleAddCategory} />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="w-full h-full flex items-center pl-6 text-xs text-disabled font-semibold">
              새 상위 게시판 추가
            </button>
          )}
        </motion.div>
      )}

      {/* 다이얼로그 컴포넌트 */}
      {isDialogOpen && (
        <Dialog
          icon={isAddCategoryDisabled ? <FailIcon /> : undefined}
          title={
            isAddCategoryDisabled
              ? "더 이상 게시판을 \n 추가할 수 없어요"
              : `'${deleteCategoryTitle}' \n 게시판을 삭제할까요?`
          }
          content={
            isAddCategoryDisabled
              ? "상위 게시판은 최대 5개까지 \n 생성할 수 있어요"
              : categoryToDelete?.isChild
              ? "삭제 후 복구할 수 없어요!" // 하위
              : "하위 게시판도 함께 사라지며 \n 삭제 후 복구할 수 없어요!" // 상위
          }
          isWarning={!isAddCategoryDisabled}
          backBtn={isAddCategoryDisabled ? "확인" : "취소"}
          onBackBtnClick={() => {
            setIsDialogOpen(false);
            setCategoryToDelete(null);
            setIsAddCategoryDisabled(false);
          }}
          redBtn={isAddCategoryDisabled ? "" : "삭제"}
          onBtnClick={confirmDeleteCategory}
        />
      )}
      {isInsufficientChildCategories && (
        <Dialog
          icon={<FailIcon />}
          title="게시판을 삭제할 수 없어요"
          content="하위 게시판은 최소 1개 이상 있어야 해요"
          isWarning
          backBtn="확인"
          onBackBtnClick={() => {
            setIsInsufficientChildCategories(false);
          }}
        />
      )}
    </div>
  );
}
