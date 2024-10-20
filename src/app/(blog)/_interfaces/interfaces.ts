import { SubCategory, Category } from "@/app/_interfaces/interfaces";

export interface AddCategoryProps {
    handleAddCategory: (title: string, parentId?: number) => void;
    parentId?: number;
    isSubCategory?: boolean;
}

export interface CategoryItemProps {
    category: Category;
    handleAddCategory: (title: string, parentId?: number) => void;
    handleDeleteCategory: (categoryId: number, title: string, isSub?: boolean, subCategoryId?: number) => void;
}

export interface SubCategoryItemProps {
    subCategory: SubCategory;
    category: Category;
    handleDeleteCategory: (categoryId: number, title: string, isSub?: boolean, subCategoryId?: number) => void;
}
export interface BlogPost {
    postId: number;
    blogId: number;
    categoryId: number;
    subCategoryId: number;
    title: string;
    content: string;
    viewCount: number;
    isSecret: boolean;
    isBlind: boolean;
    password: string;
    likeCount: number;
    reportCount: number;
    commentCount: number;
    createdAt: string;
    modifiedAt: string;
}

export interface PostProps {
    currentPost?: BlogPost;
    currentCategory?: Category;
    currentSubCategory?: SubCategory;
}

export interface IBpFollowerIcon {
    isFilled: Boolean;
}

export interface ISmShowMoreIcon {
    isHidden: Boolean;
}