// 상/하위 게시판 추가

import React, { useState } from "react";
import { AddCategoryProps } from "../../_interfaces/interfaces";
import { useBlogStore, useCategoryStore } from "@/app/stores";

const AddCategory: React.FC<AddCategoryProps> = ({
  handleAddCategory,
  parentId,
  isChildCategory,
}) => {
  // 전역 변수
  const { setIsAddingCategory, setIsAddingChildCategory } = useCategoryStore();
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddCategory(newCategoryTitle, parentId);
      setNewCategoryTitle("");
    }
  };

  return (
    <div className="flex items-center h-10">
      <input
        type="text"
        value={newCategoryTitle}
        onChange={(e) => setNewCategoryTitle(e.target.value)}
        className={
          isChildCategory
            ? "bg-bg-1 text-xs font-regular pl-1 py-1 w-32"
            : "bg-bg-1 text-body text-sm font-regular p-1 h-7 w-32"
        }
        onKeyPress={handleKeyPress}
        placeholder={
          isChildCategory ? "새 하위 게시판 제목" : "새 상위 게시판 제목"
        }
      />
      <div className="absolute right-3 flex text-2xs space-x-2">
        <button
          className="text-primary-1"
          onClick={() => {
            handleAddCategory(newCategoryTitle, parentId);
            setNewCategoryTitle("");
          }}>
          추가
        </button>
        <button
          className="text-disabled"
          onClick={() =>
            isChildCategory
              ? setIsAddingChildCategory(Number(parentId), false)
              : setIsAddingCategory(false)
          }>
          취소
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
