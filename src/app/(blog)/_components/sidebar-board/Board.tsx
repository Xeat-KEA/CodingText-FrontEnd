// 사이드바 - 게시판 영역
import React, { useCallback, useState } from "react";
import { Board_Categories, Other_Board_Categories } from "../../_constants/constants";
import Dialog from "@/app/_components/Dialog";
import { FailIcon } from "@/app/_components/Icons";
import { usePathname } from "next/navigation";
import CategoryItem from "./CategoryItem";
import AddCategory from "./AddCategory";
import { BoardProps } from "../../_interfaces/interfaces";

const Board: React.FC<BoardProps> = ({ blogId, isOwnBlog }) => {
    const currentPath = usePathname();
    const [boardCategories, setBoardCategories] = useState(
        isOwnBlog ? Board_Categories : Other_Board_Categories
    );
    const [activeCategories, setActiveCategories] = useState<number[]>([]);
    const [newCategoryTitle, setNewCategoryTitle] = useState("");
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [isAddingSubCategory, setIsAddingSubCategory] = useState<{ [key: number]: boolean }>({});
    const [isAddCategoryDisabled, setIsAddCategoryDisabled] = useState(false); // 게시판 추가 불가
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryTitle, setEditCategoryTitle] = useState<string>("");
    const [categoryToDelete, setCategoryToDelete] = useState<{ categoryId: number; subCategoryId: number; isSub: boolean } | null>(null);
    const [deletCategoryTitle, setDeleteCategoryTitle] = useState("");

    // 상위 게시판 클릭 -> 하위 게시판 토글
    const handleCategoryClick = useCallback((id: number) => {
        if (id === 0) {
            window.location.href = `/blog/${blogId}/0`;
        } else {
            setActiveCategories(prev => 
                prev.includes(id) ? prev.filter(activeId => activeId !== id) : [...prev, id]
            );
        }
    }, [blogId]);

    // 상/하위 게시판 추가 함수 (추후에 수정 필요)
    const handleAddCategory = useCallback((title: string, parentId?: number) => {
        if (!title.trim()) return;

        if (!parentId && boardCategories.length >= 7) {
            setIsAddCategoryDisabled(true);
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
                            { id: newSubCategoryId, title }
                        ]
                    };
                }
                return category;
            })
            : [
                ...boardCategories,
                {
                    id: boardCategories.length,
                    title,
                    subCategories: [{ id: 0, title: "전체" }]
                }
            ];

        setBoardCategories(updatedCategories);
        setNewCategoryTitle("");
        if (parentId) {
            setIsAddingSubCategory(prev => ({ ...prev, [parentId]: false }));
        } else {
            setIsAddingCategory(false);
        }
    }, [boardCategories]);

    // 상위 수정 저장
    const saveEditCategory = useCallback((id: number) => {
        setBoardCategories(prev =>
            prev.map(category => 
                category.id === id ? { ...category, title: editCategoryTitle } : category
            )
        );
        setEditCategoryId(null);
        setEditCategoryTitle("");
    }, [editCategoryTitle]);


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
    }, [categoryToDelete]);


    return (
        <div className="w-60 mt-6">
            <p className="text-disabled text-xs font-regular h-10 pl-6 py-2">게시판 목록</p>
            {/* 상위 게시판 목록 */}
            {boardCategories.map(category => (
                <CategoryItem
                    key={category.id}
                    category={category}
                    blogId={blogId}
                    isOwnBlog={isOwnBlog}
                    currentPath={currentPath}
                    handleAddCategory={handleAddCategory}
                    handleCategoryClick={handleCategoryClick}
                    handleDeleteCategory={handleDeleteCategory}
                    boardCategories={boardCategories}
                    setBoardCategories={setBoardCategories}
                    activeCategories={activeCategories}
                    isAddingSubCategory={isAddingSubCategory}
                    setIsAddingSubCategory={setIsAddingSubCategory}
                    newCategoryTitle={newCategoryTitle}
                    setNewCategoryTitle={setNewCategoryTitle}
                    saveEditCategory={saveEditCategory} // 함수를 전달
                    editCategoryId={editCategoryId} // 상태 전달
                    setEditCategoryId={setEditCategoryId} // 상태 업데이트 함수 전달
                    editCategoryTitle={editCategoryTitle} // 상태 전달
                    setEditCategoryTitle={setEditCategoryTitle} // 상태 업데이트 함수 전달
                />
            ))}

            {/* 새 상위 게시판 추가 */}
            {isOwnBlog && (
                <div className="flex items-center h-10 pl-6 py-3 ">
                    {isAddingCategory ? (
                        <div className="flex items-center h-10">
                            <AddCategory
                                newCategoryTitle={newCategoryTitle}
                                setNewCategoryTitle={setNewCategoryTitle}
                                handleAddCategory={handleAddCategory}
                                setIsAddingCategory={setIsAddingCategory}
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
                    isWarning={isAddCategoryDisabled ? false : true}
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

export default Board;