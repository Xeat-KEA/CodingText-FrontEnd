// 사이드바 - 게시판 영역
import React, { useCallback, useState } from "react";
import Dialog from "@/app/_components/Dialog";
import { FailIcon } from "@/app/_components/Icons";
import { usePathname, useRouter } from "next/navigation";
import CategoryItem from "./CategoryItem";
import AddCategory from "./AddCategory";
import { useBlogStore } from "@/app/stores";

export default function Board() {
    // 전역 변수
    const {
        isOwnBlog,
        boardCategories,
        setBoardCategories,
        isAddingCategory,
        setIsAddingCategory,
        isAddingSubCategory,
        setIsAddingSubCategory,
    } = useBlogStore();

    const currentPath = usePathname();
    const [isAddCategoryDisabled, setIsAddCategoryDisabled] = useState(false); // 게시판 추가 불가
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<{ categoryId: number; subCategoryId: number; isSub: boolean } | null>(null);
    const [deletCategoryTitle, setDeleteCategoryTitle] = useState("");

    // 상/하위 게시판 추가 함수
    const handleAddCategory = useCallback((title: string, parentId?: number) => {
        // 제목의 최대 길이 설정 (임시로 10자로 제한)
        const maxTitleLength = 10;
        const trimmedTitle = title.trim().slice(0, maxTitleLength);

        if (!trimmedTitle) return;

        if (!parentId && boardCategories.length >= 7) {
            setIsAddCategoryDisabled(true);
            setIsAddingCategory(false);
            setIsDialogOpen(true);
            return;
        }

        const updatedCategories = parentId
            ? boardCategories.map(category => {
                if (category.id === parentId) {
                    const newSubCategoryId = (category.subCategories?.length || 0) + 1;
                    return {
                        ...category,
                        subCategories: [
                            ...(category.subCategories || []),
                            { id: newSubCategoryId, title: trimmedTitle }
                        ]
                    };
                }
                return category;
            })
            : [
                ...boardCategories,
                {
                    id: boardCategories.length,
                    title: trimmedTitle,
                    subCategories: [{ id: 0, title: "전체" }]
                }
            ];
        setBoardCategories(updatedCategories);
        if (parentId) {
            setIsAddingSubCategory(parentId, false); // 전역 상태로 업데이트
        } else {
            setIsAddingCategory(false);
        }
    }, [boardCategories]);



    // 상/하위 게시판 삭제 함수
    const handleDeleteCategory = useCallback(
        (categoryId: number, title: string, isSub: boolean = false, subCategoryId: number = 0) => {
            setCategoryToDelete({ categoryId, subCategoryId, isSub });
            setDeleteCategoryTitle(title);
            setIsDialogOpen(true);
        }, []
    );

    // 상/하위 게시판 삭제 확인 함수
    const confirmDeleteCategory = useCallback(() => {
        if (!categoryToDelete) return;
        const { categoryId, subCategoryId, isSub } = categoryToDelete;

        setBoardCategories(prev =>
            isSub
                ? prev.map(category =>
                    category.id === categoryId
                        ? { ...category, subCategories: category.subCategories?.filter(sub => sub.id !== subCategoryId) }
                        : category
                )
                : prev.filter(category => category.id !== categoryId)
        );
        setIsDialogOpen(false);
        setCategoryToDelete(null);
    }, [categoryToDelete, setBoardCategories]);


    return (
        <div className="w-60 mt-6">
            <p className="text-disabled text-xs font-regular h-10 pl-6 py-2">게시판 목록</p>
            {/* 상위 게시판 목록 */}
            {boardCategories.map(category => (
                <CategoryItem
                    key={category.id}
                    category={category}
                    currentPath={currentPath}
                    handleAddCategory={handleAddCategory}
                    handleDeleteCategory={handleDeleteCategory}
                // isAddingSubCategory={isAddingSubCategory}
                // setIsAddingSubCategory={setIsAddingSubCategory}
                />
            ))}

            {/* 새 상위 게시판 추가 */}
            {isOwnBlog && (
                <div className="flex items-center h-10 pl-6 py-3 ">
                    {isAddingCategory ? (
                        <div className="flex items-center h-10">
                            <AddCategory
                                handleAddCategory={handleAddCategory}
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingCategory(true)}
                            className="text-xs text-disabled font-semibold"
                        >
                            새 상위 게시판 추가
                        </button>
                    )}
                </div>
            )}

            {/* 다이얼로그 컴포넌트 */}
            {isDialogOpen && (
                <Dialog
                    icon={isAddCategoryDisabled ? <FailIcon /> : undefined}
                    title={isAddCategoryDisabled
                        ? "더 이상 게시판을 \n 추가할 수 없어요"
                        : `'${deletCategoryTitle}' \n 게시판을 삭제할까요?`}
                    content={isAddCategoryDisabled
                        ? "상위 게시판은 최대 5개까지 \n 생성할 수 있어요"
                        : categoryToDelete?.isSub
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
        </div>
    )
}