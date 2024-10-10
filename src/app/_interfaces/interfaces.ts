import { Editor } from "@tiptap/react";

export interface ITopBar {
  isLoggedIn?: boolean;
  isCodingPage?: boolean;
  hasNewNotice?: boolean;
}

export interface ISearchBar {
  isSmall?: boolean;
}

export interface ITabBar {
  menuList: string[];
  dropDownList?: string[];
}

export interface IToggleBtn {
  content: string;
  state: boolean;
  onClick: () => void;
}

export interface IDropDown {
  isSmall?: boolean;
  selection: string;
  onSelectionClick: (selected: string) => void;
  list: string[];
  placeholder?: string;
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

export interface ITiptapStore {
  content: string;
  setContent: (string: string) => void;
}

// Form 관련 인터페이스
export interface IPostForm {
  title: string;
  isSecret?: boolean;
  password?: string;
  parentCategory?: string;
  childCategory?: string;
}
