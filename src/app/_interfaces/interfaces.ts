import { Editor } from "@tiptap/react";

export interface ITopBar {
  isLoggedIn?: boolean;
  isCodingPage?: boolean;
  hasNewNotice?: boolean;
}

export interface ISearchBar {
  baseURL: string;
  hasFilter?: boolean;
}

export interface ITabBar {
  menuList: string[];
  dropDownList?: string[];
}

export interface SearchTab {
  content: string;
  param: string;
}

export interface SearchTabBarProps {
  menuList: SearchTab[];
}

export interface IToggleBtn {
  content: string;
  state: boolean;
  onClick: () => void;
}

export interface IDropDown {
  isSmall?: boolean;
  borderRight?: boolean;
  selection: string;
  onSelectionClick: (selected: string) => void;
  list?: string[];
  placeholder?: string;
  disabled?: boolean;
}

export interface ParamDropdownProps {
  isSmall?: boolean;
  list: string[];
  paramType: string;
  placeholder?: string;
}

export interface MultiSelectionList {
  content: string;
  list: string[];
}

export interface IMultiSelectionDropdown {
  placeholder: string;
  list: string[];
  paramType: string;
}

export interface IDialog {
  icon?: JSX.Element;
  title?: string;
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
}

export interface ICodeEditor {
  isViewer?: boolean;
  defaultValue?: string;
}

export interface IToolBar {
  editor: Editor | null;
}

export interface IPostEditor {
  isCodingTest?: boolean;
  isEditing?: boolean;
  onCancelClick: () => void;
  onBtnClick: (data: IPost) => void;
}

export interface ICheckBoxIcon {
  isActive?: boolean;
}

export interface IPost {
  title: string;
  isSecret?: boolean;
  password?: string;
  parentCategory?: string;
  childCategory?: string;
  content: string;
}

export interface IProfileImgSelection {
  seletedImg: string;
  onSelectionClick: (seleted: string) => void;
}

export interface IEditBtn {
  isEditing: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
  onSubmit: () => void;
}

export interface IPostCard {
  profileImg?: string;
  nickname?: string;
  category?: string;
  createAt: string;
  title: string;
  content: string;
  thumbnail?: string;
  likes: number;
  comments: number;
  views: number;
  codeId?: number;
}

// 전역 변수 관련 Interface
export interface ITabStore {
  tab: string;
  setTab: (newTab: string) => void;
}

// 코딩테스트 관련 Interface
export interface ICodingTestStore {
  // 채팅 관련 state
  checkAnswerOnly: boolean;
  setCheckAnswerOnly: () => void;
  sendWithCode: boolean;
  setSendWithCode: () => void;
  // 코딩 관련 state
  language: string;
  setLanguage: (newLanguage: string) => void;
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
export interface ITiptapStore {
  content: string;
  setContent: (string: string) => void;
}

export interface IPaginationStore {
  page: number;
  setPage: (newPage: number) => void;
  lastPage: number;
  setLastPage: (page: number) => void;
}

export interface ISearchFilterStore {
  filter: string;
  setFilter: (selected: string) => void;
}

export interface ICodeFilterStore {
  difficulty: string[];
  setDifficulty: (newList: string[]) => void;
  algorithm: string[];
  setAlgorithm: (newList: string[]) => void;
  order: string;
  setOrder: (selected: string) => void;
}

// Form 관련 인터페이스
export interface IPostForm {
  title: string;
  isSecret?: boolean;
  password?: string;
  parentCategory?: string;
  childCategory?: string;
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
  subCategories?: SubCategory[];
}

// 블로그 정보 저장
export interface IBlogStore {
  blogId: number;
  setBlogId: (id: number) => void;
  isOwnBlog: boolean;
  setIsOwnBlog: (isOwnBlog: boolean) => void;

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
