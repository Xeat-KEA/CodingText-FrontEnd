import { ChildCategory, Category } from "@/app/_interfaces/interfaces";

export interface AddCategoryProps {
  handleAddCategory: (title: string, parentId?: number) => void;
  parentId?: number;
  isChildCategory?: boolean;
}

export interface CategoryItemProps {
  category: Category;
  handleAddCategory: (title: string, parentId?: number) => void;
  handleDeleteCategory: (
    categoryId: number,
    title: string,
    isChild?: boolean,
    childCategoryId?: number
  ) => void;
}

export interface ChildCategoryItemProps {
  childCategory: ChildCategory;
  category: Category;
  currentPath: string;
  handleDeleteCategory: (
    categoryId: number,
    title: string,
    isChild?: boolean,
    childCategoryId?: number
  ) => void;
}
export interface BlogPost {
  postId: number;
  articleReplies: number;
  blogId: number;
  checkRecommend: boolean;
  childCategoryId: number;
  childName: string;
  codeContent?: string;
  codeId?: number;
  content: string;
  createdDate: string;
  isBlind: boolean;
  isSecret: boolean;
  likeCount: number;
  profileUrl: string;
  replyCount: number;
  title: string;
  userName: string;
  viewCount: number;
  writtenCode?: string;
}

export interface CommentForm {
  replyId: number;
  postId: number;
  userId: number;
  mentionId?: number;
  parentReplyId?: number;
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
  currentPost: BlogPost;
  // currentCategory?: Category;
  // currentChildCategory?: ChildCategory;
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

export interface CompleteArticle {
  postId: number;
  blogId: number;
  categoryId: number;
  childCategoryId: number;
  language: string;
  title: string;
  content: string;
  viewCount: number;
  reportCount: number;
  codeContent: string;
  codeId: number;
  createAt: string;
  likeCount: number;
  nickName: string;
  commentCount: number;
  writtenCode: string;
  createdAt: string;
  modifiedAt: string;
}
