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
  handleDeleteCategory: (
    categoryId: number,
    title: string,
    isSub?: boolean,
    subCategoryId?: number
  ) => void;
}

export interface SubCategoryItemProps {
  subCategory: SubCategory;
  category: Category;
  currentPath: string;
  handleDeleteCategory: (
    categoryId: number,
    title: string,
    isSub?: boolean,
    subCategoryId?: number
  ) => void;
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

export interface CommentForm {
  replyId: number;
  postId: number;
  userId: number;
  mentionId: number | null;
  parentReplyId: number | null;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

export interface CommentProps {
  replyId: number;
  userId: number;
  mentionId: number | null;
  content: string;
  createdAt: string;
  isOwnComment: boolean;
  onReplyClick: (replyId: number, userId: number) => void;
  onDelete: (replyId: number) => void;
  onReport: (replyId: number) => void;
}

export interface PostProps {
  currentPost?: BlogPost;
  currentCategory?: Category;
  currentSubCategory?: SubCategory;
}

export interface BpFollowerIconProps {
  isFilled: Boolean;
}

export interface SmShowMoreIconProps {
  isHidden: Boolean;
}

export interface CommentInputProps {
  target?: string;
  mentionId: number | null;
  onSubmit: (data: { comment: string }) => void;
  onCancel?: () => void;
}
