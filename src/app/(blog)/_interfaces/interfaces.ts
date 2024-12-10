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
  articleId: number;
  articleReplies: CommentProps[];
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
  postId: number;
  mentionedUserBlogId?: number;
  parentReplyId?: number;
  content: string;
}

export interface CommentProps {
  replyId: number;
  blogId: number;
  userName: string;
  profileUrl: string;
  parentReplyId?: number;
  mentionedUserName?: string;
  content: string;
  createdDate: string;
  childReplies?: CommentProps[];

  isOwnComment: boolean;
  onReplyClick: (replyId: number, userId: number) => void;
  onEdit: (replyId: number) => void;
  isEditing: boolean;
  onCancelEdit: () => void;
  editedContent: string;
  onUpdateComment: (content: string) => void;
  confirmEdit: (content: string) => Promise<void>;
  onDelete: (replyId: number) => void;
  onReport: (replyId: number) => void;
}

export interface CommentInputProps {
  target: string;
  mentionId?: number;
  mentionedUserName?: string;
  onSubmit: (data: { comment: string }) => void;
  onCancel: () => void;
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
