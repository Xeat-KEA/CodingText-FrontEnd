export interface SubCategory {
    id: number;
    title: string;
}

export interface Category {
    id: number;
    title: string;
    subCategories?: SubCategory[];
}

export interface BoardProps {
    blogId: number;
    isOwnBlog: boolean;
}

export interface AddCategoryProps {
    newCategoryTitle: string;
    setNewCategoryTitle: React.Dispatch<React.SetStateAction<string>>;
    handleAddCategory: (title: string, parentId?: number) => void;
    setIsAddingCategory: React.Dispatch<React.SetStateAction<boolean>>;
    parentId?: number;
    isSubCategory?: boolean;
}

export interface CategoryItemProps {
    category: Category;
    blogId: number;
    isOwnBlog: boolean;
    currentPath: string;
    handleAddCategory: (title: string, parentId?: number) => void;
    handleCategoryClick: (id: number) => void;
    handleDeleteCategory: (categoryId: number, title: string, isSub?: boolean, subCategoryId?: number) => void;
    boardCategories: Category[];
    setBoardCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    activeCategories: number[];
    isAddingSubCategory: { [key: number]: boolean };
    setIsAddingSubCategory: React.Dispatch<React.SetStateAction<{ [key: number]: boolean }>>;
    newCategoryTitle: string;
    setNewCategoryTitle: React.Dispatch<React.SetStateAction<string>>;
    saveEditCategory: (id:number) => void;
    editCategoryId: number | null;
    setEditCategoryId: React.Dispatch<React.SetStateAction<number | null>>; 
    editCategoryTitle: string;
    setEditCategoryTitle: React.Dispatch<React.SetStateAction<string>>;
}

export interface SubCategoryItemProps {
    subCategory: SubCategory;
    category: Category;
    blogId: number;
    isOwnBlog: boolean;
    currentPath: string;
    handleDeleteCategory: (categoryId: number, title: string, isSub?: boolean, subCategoryId?: number) => void;
    boardCategories: Category[];
    setBoardCategories: (categories: Category[]) => void;
}
