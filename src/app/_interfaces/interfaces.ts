import { Editor } from "@tiptap/react";

export interface SearchBarProps {
  baseURL: string;
  hasFilter?: boolean;
  placeholder?: string;
}

export interface TabBarProps {
  menuList: string[];
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
  showListUpward?: boolean;
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
  title: string;
  isSecret?: boolean;
  password?: string;
  parentCategory?: number;
  childCategory?: number;
  content: string;
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

// 프로토타입을 위한 임시
// export interface ProfileData {
//   userId: number;
//   nickName: string;
//   profileImg: string;
//   profileMessage: string;
//   codeLanguage: string;
// }

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
  type: "edit" | "delete" | "report";
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
  language: Selection;
  setLanguage: (newLanguage: Selection) => void;
  hasSolved: boolean;
  setHasSolved: (isCorrect: boolean) => void;
  isPosting: boolean;
  setIsPosting: (state: boolean) => void;
  value: string;
  setValue: (code: string) => void;
  memo: string;
  setMemo: (string: string) => void;
  isSmall: boolean;
  setIsSmall: (state: boolean) => void;
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

export interface SubCategory {
  id: number;
  title: string;
}

export interface Category {
  id: number;
  title: string;
  blogId?: number;
  subCategories?: SubCategory[];
}

export interface BlogProfile {
  userId: number;
  profileImg: string;
  nickName: string;
  rank: string;
  profileMessage: string;
  FollowerCount: number;
  blogProfile: string;
}

export interface IBackBtn {
  title: string;
  onClick?: () => void;
}

export interface Params {
  id: string | string[];
  categoryId: string | string[];
  subCategoryId: string | string[];
  postId: string | string[];
}

// 블로그 정보 저장
export interface BlogStore {
  blogId: number;
  setBlogId: (id: number) => void;
  categoryId: number;
  setCategoryId: (id: number) => void;
  subCategoryId: number;
  setSubCategoryId: (id: number) => void;
  isOwnBlog: boolean;
  setIsOwnBlog: (isOwnBlog: boolean) => void;
  profile: BlogProfile;
  setProfile: (profile: BlogProfile) => void;

  params: Params | null; // Params 객체를 저장할 변수
  setParams: (params: Params) => void; // params를 설정하는 함수

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
  isAddingSubCategory: { [key: number]: boolean };
  setIsAddingSubCategory: (parentId: number, isAdding: boolean) => void;
}
