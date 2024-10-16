import React, { useCallback, useState } from 'react';
import SubCategoryItem from './SubCategoryItem';
import AddCategory from './AddCategory';
import { CategoryItemProps } from '../../_interfaces/interfaces';
import { useBlogStore } from '@/app/stores';
import { useRouter } from "next/navigation";

const CategoryItem: React.FC<CategoryItemProps> = ({
    category,
    currentPath,
    handleAddCategory,
    handleDeleteCategory,
}) => {
    // 전역 변수
    const {
        blogId,
        isOwnBlog,
        activeCategories,
        setActiveCategories,
        setBoardCategories,
        isAddingSubCategory,
        setIsAddingSubCategory,
    } = useBlogStore();
    const router = useRouter();
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryTitle, setEditCategoryTitle] = useState<string>("");
    const [hoveredCategoryId, setHoveredCategoryId] = useState<boolean>(false);
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { // utils에 추가 예정
        if (e.key === "Enter") {
            saveEditCategory(category.id)
        }
    };

    // 상위 게시판 클릭 -> 하위 게시판 토글
    const handleCategoryClick = useCallback((id: number) => {
        if (id === 0) {
            router.push(`/blog/${blogId}/0`);
        } else {
            setActiveCategories(prev =>
                prev.includes(id) ? prev.filter(activeId => activeId !== id) : [...prev, id]
            );
        }
    }, [blogId, router, setActiveCategories]);

    // 상위 수정 저장
    const saveEditCategory = useCallback((id: number) => {
        // 제목의 최대 길이 설정 (임시로 10자로 제한)
        const maxTitleLength = 10;
        setBoardCategories(prev =>
            prev.map(category =>
                category.id === id ? { ...category, title: editCategoryTitle.trim().slice(0, maxTitleLength) } : category
            )
        );
        setEditCategoryId(null);
        setEditCategoryTitle("");
    }, [editCategoryTitle, setBoardCategories]);

    return (
        <div className="board" key={category.id}>
            <div
                className="flex items-center relative text-black text-sm font-regular h-10 pl-6 py-2 cursor-pointer"
                onMouseEnter={() => setHoveredCategoryId(true)}
                onMouseLeave={() => setHoveredCategoryId(false)}
            >
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
                                <button className="text-primary" onClick={() => saveEditCategory(category.id)}>
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
                        </>
                    )
                ) : (
                    <>
                        <p
                            className={`${currentPath === `/blog/${blogId}/${category.id}` ? 'font-bold' : ''} cursor-pointer`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.title}
                        </p>
                        {isOwnBlog && category.id !== 0 && category.id !== 1 && hoveredCategoryId === true && (
                            <div className="absolute right-3 flex text-2xs space-x-2">
                                <button
                                    className="text-primary"
                                    onClick={() => {
                                        setEditCategoryId(category.id);
                                        setEditCategoryTitle(category.title);
                                    }}
                                >
                                    수정
                                </button>
                                <button
                                    className="text-red"
                                    onClick={() => handleDeleteCategory(category.id, category.title, false)}
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* 하위 게시판 목록 */}
            {activeCategories.includes(category.id) && category.subCategories && (
                <div className="pl-10">
                    {category.subCategories.map((subCategory) => (
                        <SubCategoryItem
                            key={subCategory.id}
                            subCategory={subCategory}
                            category={category}
                            currentPath={currentPath}
                            handleDeleteCategory={handleDeleteCategory}
                        />
                    ))}

                    {/* 하위 게시판 추가 */}
                    {isOwnBlog && category.id !== 0 && category.id !== 1 && (
                        <>
                            {isAddingSubCategory[category.id] ? (
                                <AddCategory
                                    handleAddCategory={handleAddCategory}
                                    parentId={category.id}
                                    isSubCategory={true}
                                />
                            ) : (
                                <button
                                    onClick={() => setIsAddingSubCategory(category.id, true)}
                                    className="text-2xs text-disabled h-8 py-2"
                                >
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