import React, { useState } from 'react';
import SubCategoryItem from './SubCategoryItem';
import AddCategory from './AddCategory';
import { CategoryItemProps } from '../../_interfaces/interfaces';

const CategoryItem: React.FC<CategoryItemProps> = ({
    category,
    blogId,
    isOwnBlog,
    currentPath,
    handleAddCategory,
    handleCategoryClick,
    handleDeleteCategory,
    boardCategories,
    setBoardCategories,
    activeCategories,
    isAddingSubCategory,
    setIsAddingSubCategory,
    newCategoryTitle,
    setNewCategoryTitle,
    saveEditCategory,
    editCategoryId,
    setEditCategoryId,
    editCategoryTitle,
    setEditCategoryTitle,
}) => {
    const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (e.key === "Enter") { action(); }
    };

    return (
        <div className="board" key={category.id}>
            <div
                className="flex items-center relative text-black text-sm font-regular h-10 pl-6 py-2"
                onMouseEnter={() => setHoveredCategoryId(category.id)}
                onMouseLeave={() => setHoveredCategoryId(null)}
            >
                {editCategoryId === category.id ? (
                    isOwnBlog && (
                        <>
                            <input
                                type="text"
                                value={editCategoryTitle}
                                onChange={(e) => setEditCategoryTitle(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, () => saveEditCategory(category.id))}
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
                            className={currentPath === `/blog/${blogId}/${category.id}` ? 'font-bold' : ''}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {category.title}
                        </p>
                        {isOwnBlog && category.id !== 0 && category.id !== 1 && hoveredCategoryId === category.id && (
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
                            blogId={blogId}
                            isOwnBlog={isOwnBlog}
                            currentPath={currentPath}
                            handleDeleteCategory={handleDeleteCategory}
                            boardCategories={boardCategories}
                            setBoardCategories={setBoardCategories}
                        />
                    ))}

                    {/* 하위 게시판 추가 */}
                    {isOwnBlog && category.id !== 0 && category.id !== 1 && (
                        <>
                            {isAddingSubCategory[category.id] ? (
                                <AddCategory
                                    newCategoryTitle={newCategoryTitle}
                                    setNewCategoryTitle={setNewCategoryTitle}
                                    handleAddCategory={handleAddCategory}
                                    setIsAddingCategory={() => setIsAddingSubCategory((prev) => ({ ...prev, [category.id]: false }))}
                                    parentId={category.id}
                                    isSubCategory={true}
                                />
                            ) : (
                                <button
                                    onClick={() => setIsAddingSubCategory((prev) => ({ ...prev, [category.id]: true }))}
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