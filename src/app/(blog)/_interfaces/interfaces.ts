import { SubCategory, Category } from "@/app/_interfaces/interfaces";

export interface AddCategoryProps {
    handleAddCategory: (title: string, parentId?: number) => void;
    parentId?: number;
    isSubCategory?: boolean;
}

export interface CategoryItemProps {
    category: Category;
    currentPath: string;
    handleAddCategory: (title: string, parentId?: number) => void;
    handleDeleteCategory: (categoryId: number, title: string, isSub?: boolean, subCategoryId?: number) => void;
}

export interface SubCategoryItemProps {
    subCategory: SubCategory;
    category: Category;
    currentPath: string;
    handleDeleteCategory: (categoryId: number, title: string, isSub?: boolean, subCategoryId?: number) => void;
}

export interface IBpFollowerIcon {
    isFilled: Boolean;
}
