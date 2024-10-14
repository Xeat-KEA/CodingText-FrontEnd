import Link from 'next/link';
import { SubCategoryItemProps } from '../../_interfaces/interfaces';
import { useState } from 'react';

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({
    subCategory,
    category,
    blogId,
    isOwnBlog,
    currentPath,
    handleDeleteCategory,
    boardCategories,
    setBoardCategories,
}) => {
    const [editSubCategory, setEditSubCategory] = useState<{ [categoryId: number]: number | null }>({});
    const [editSubCategoryTitle, setEditSubCategoryTitle] = useState<string>("");
    const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState<number | null>(null); // 하위


    // 하위 게시판 수정
    const handleEditSubCategory = (categoryId: number, subCategoryId: number, title: string) => {
        setEditSubCategory(prevState => ({
            ...prevState,
            [categoryId]: subCategoryId,
        }));
        setEditSubCategoryTitle(title);
    };
    const cancelEditSubCategory = (categoryId: number) => {
        setEditSubCategory(prevState => ({ ...prevState, [categoryId]: null }));
        setEditSubCategoryTitle("");
    };

    // 하위 수정 저장
    const saveEditSubCategory = (categoryId: number, subCategoryId: number) => {
        setBoardCategories(boardCategories.map(category => {
            if (category.id === categoryId) {
                const updatedSubCategories = category.subCategories?.map(subCategory => {
                    if (subCategory.id === subCategoryId) {
                        return { ...subCategory, title: editSubCategoryTitle };
                    }
                    return subCategory;
                });
                return { ...category, subCategories: updatedSubCategories };
            }
            return category;
        }));
        setEditSubCategory(prevState => ({ ...prevState, [categoryId]: null }));
        setEditSubCategoryTitle("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (e.key === "Enter") { action(); }
    };

    return (
        <div
            className="flex items-center relative text-xs font-regular h-8 py-2"
            key={subCategory.id}
            onMouseEnter={() => setHoveredSubCategoryId(subCategory.id)}
            onMouseLeave={() => setHoveredSubCategoryId(null)}
        >
            {editSubCategory[category.id] === subCategory.id 
            ? ( isOwnBlog && (
                    <>
                        <input
                            type="text"
                            value={editSubCategoryTitle}
                            onChange={(e) => setEditSubCategoryTitle(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, () => saveEditSubCategory(category.id, subCategory.id))}
                            className="bg-bg-1 text-xs font-regular pl-1 w-32 h-6"
                        />
                        <div className="absolute right-3 flex text-2xs space-x-2">
                            <button className="text-primary" onClick={() => saveEditSubCategory(category.id, subCategory.id)}>저장</button>
                            <button className="text-disabled" onClick={() => cancelEditSubCategory(category.id)}>취소</button>
                        </div>
                    </>
                )
            ) : (
                <>
                    <Link href={`/blog/${blogId}/${category.id}/${subCategory.id}`}>
                        <p className={currentPath === `/blog/${blogId}/${category.id}/${subCategory.id}` ? "font-bold" : ""}>
                            {subCategory.title}
                        </p>
                    </Link>

                    {isOwnBlog && category.id !== 0 && category.id !== 1 && subCategory.id !== 0 && hoveredSubCategoryId === subCategory.id && (
                        <div className="absolute right-3 flex text-2xs space-x-2">
                            <button
                                className="text-primary"
                                onClick={() => handleEditSubCategory(category.id, subCategory.id, subCategory.title)}>
                                수정
                            </button>
                            <button
                                className="text-red"
                                onClick={() => handleDeleteCategory(category.id, subCategory.title, true, subCategory.id)}>
                                삭제
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SubCategoryItem;