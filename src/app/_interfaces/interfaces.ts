import { Editor } from "@tiptap/react";
import { BlogPost } from "../(blog)/_interfaces/interfaces";

export interface SearchBarProps {
  baseURL: string;
  hasFilter?: boolean;
  placeholder?: string;
}

export interface TabBarProps {
  menuList: string[];
  dropDownList?: Selection[];
}

export interface Selection {
  content: string;
  selection: string;
}

export interface SelectionBarProps {
  menuList: Selection[];
}

export interface ToggleBtnProps {
  content: string;
  state: boolean;
  onClick: () => void;
}

export interface DropDownProps {
  isSmall?: boolean;
  borderRight?: boolean;
  selection: string;
  onSelectionClick: (selected: Selection) => void;
  list?: Selection[];
  placeholder?: string;
  disabled?: boolean;
}

export interface ParamDropDownProps {
  isSmall?: boolean;
  list: string[];
  paramType: string;
  placeholder?: string;
}

export interface MultiSelectionList {
  content: string;
  list: string[];
}

export interface MultiSelectionDropDownProps {
  placeholder: string;
  list: Selection[];
  paramType: string;
}

export interface DialogProps {
  icon?: JSX.Element;
  title?: string;
  isTitleSm?: boolean;
  content?: string;
  isWarning?: boolean;
  backBtn: string;
  onBackBtnClick: () => void;
  subBtn?: string;
  onSubBtnClick?: () => void;
  primaryBtn?: string;
  redBtn?: string;
  onBtnClick?: () => void;
  children?: React.ReactNode; // 드롭다운 추가
  blockOutsideClick?: boolean;
}

export interface CodeEditorProps {
  isViewer?: boolean;
  defaultValue?: string;
}

export interface ToolBarProps {
  editor: Editor | null;
}

export interface PostEditorProps {
  isCodingTest?: boolean;
  isEditing?: boolean;
  onCancelClick: () => void;
  onBtnClick: (data: Post) => void;
  initialData?: Post; // 초기 게시글 데이터
}

export interface CategoryDropDownProps {
  list: Category[] | undefined;
  selection: Category | undefined;
  onSelectionClick: (selected: Category) => void;
  placeholder?: string;
}

export interface IconProps {
  isActive?: boolean;
}

export interface ProfileImgContainerProps {
  width: number;
  height: number;
  src?: string;
}

export interface SaveOrCancelBtnProps {
  saveBtn: string;
  onCancel: () => void;
}

export interface Post {
  parentCategory?: number;
  childCategory?: number;
  title: string;
  content: string;
  isSecret?: boolean;
  password?: string;
}

export interface ProfileImgSelectionProps {
  seletedImg: string;
  onSelectionClick: (seleted: string) => void;
}

export interface EditBtnProps {
  isEditing: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSubmit: () => void;
}

export interface PostCardProps {
  articleId: number;
  profileImg?: string;
  nickName?: string;
  category?: string;
  createAt: string;
  title: string;
  content: string;
  thumbnail?: string;
  likes: number;
  comments: number;
  views: number;
  codeId: number | null;
}

export interface ProfileData {
  userId: number;
  nickName: string;
  profileImg: string;
  profileMessage: string;
  codeLanguage: string;
}

export interface NoticeCardProps {
  category: string;
  blogId: number;
  userId: number;
}

export interface ProfileTab {
  content: string;
  url: string;
}

export interface ProfileSideBarProps {
  menuList: ProfileTab[];
}

export interface SmBackBtnProps {
  content: string;
  onClick: () => void;
}

export interface IconBtnProps {
  type: "edit" | "delete" | "report" | "blind";
  content: string;
  onClick: () => void;
}

export interface SmCheckBoxBtnProps {
  isActive: boolean;
  onClick: () => void;
}

export interface CodeDetail {
  title: string;
  difficulty: string;
  algorithm: string;
  content: string;
  testcase: any;
}

// 전역 변수 관련 Interface
export interface TabStore {
  tab: string;
  setTab: (newTab: string) => void;
}

// 코딩테스트 관련 Interface
export interface CodingTestStore {
  // 코딩 관련 state
  title: string;
  setTitle: (newTitle: string) => void;
  language: Selection | undefined;
  setLanguage: (newLanguage: Selection) => void;
  hasSolved: boolean;
  setHasSolved: (isCorrect: boolean) => void;
  isPosting: boolean;
  setIsPosting: (state: boolean) => void;
  value: string;
  setValue: (code: string) => void;
  memo: string;
  setMemo: (string: string) => void;
}

// 텍스트 에디터 내용 Interface
export interface TiptapStore {
  content: string;
  setContent: (string: string) => void;
}

export interface PaginationStore {
  page: number;
  setPage: (newPage: number) => void;
  lastPage: number;
  setLastPage: (page: number) => void;
}

export interface SearchFilterStore {
  filter: string;
  setFilter: (selected: string) => void;
}

export interface CodeFilterStore {
  difficulty: string[];
  setDifficulty: (newList: string[]) => void;
  algorithm: string[];
  setAlgorithm: (newList: string[]) => void;
  order: string;
  setOrder: (selected: string) => void;
}

// Form 관련 인터페이스
export interface PostForm {
  title: string;
  isSecret?: boolean;
  password?: string;
  parentCategory?: number;
  childCategory?: number;
}

export interface SearchForm {
  keyword: string;
  filter?: string;
}

export interface ChildCategory {
  id: number;
  title: string;
  createDate?: string;
  parentCategoryId?: number;
}

export interface Category {
  id: number;
  title: string;
  createDate?: string;
  blogId?: number;
  childCategories?: ChildCategory[];
}

export enum Rank {
  Freshman = "Freshman",
  Sophomore = "Sophomore",
  Junior = "Junior",
  Senior = "Senior",
}

export interface BlogProfile {
  blogId: number;
  tier: string;
  userName: string;
  profileMessage: string;
  followCount: number;
  followCheck: boolean;
  profileUrl: string;
}

export interface BlogMainContent {
  blogId: number;
  mainContent: string;
}

export interface IBackBtn {
  title: string;
  onClick?: () => void;
}

// 블로그 정보 저장
export interface BlogStore {
  userBlogId: number; // 로그인된 사용자 블로그 아이디
  setUserBlogId: (id: number) => void;
  currentBlogId: number; // 현재 페이지의 블로그 아이디
  setCurrentBlogId: (id: number) => void;
  isOwnBlog: boolean;
  setIsOwnBlog: (isOwnBlog: boolean) => void;
  profile: BlogProfile;
  setProfile: (profile: BlogProfile) => void;
  blogContent: BlogMainContent;
  setBlogContent: (blogContent: BlogMainContent) => void;
}

// 게시판 관련
export interface CategoryStore {
  categoryId: number;
  setCategoryId: (id: number) => void;
  childCategoryId: number;
  setChildCategoryId: (id: number) => void;

  // sidebar-board 관련 Interface
  boardCategories: Category[];
  setBoardCategories: (
    categories: Category[] | ((prev: Category[]) => Category[])
  ) => void;
  activeCategories: number[];
  setActiveCategories: (
    categories: number[] | ((prev: number[]) => number[])
  ) => void;
  isAddingCategory: boolean;
  setIsAddingCategory: (state: boolean) => void;
  isAddingChildCategory: { [key: number]: boolean };
  setIsAddingChildCategory: (parentId: number, isAdding: boolean) => void;
}

// 게시글 관련
export interface PostStore{
  currentPost: BlogPost;
  setCurrentPost: (post: BlogPost) => void;
  isCodingPost: boolean;
  setIsCodinPost: (isCodingPost: boolean) => void;
}

export interface Notice {
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
  noticedAt: string;
}

export interface NoticeForm {
  noticeTitle: string;
  noticeContent: string;
  noticedAt: string;
}
