export interface Chat {
  answer: string;
  chatHistoryId: number;
  question: string;
}

export interface NewChat {
  role: string;
  content: string;
}

export interface ChatInputProps {
  onSubmit: (data: ChatInputForm) => void;
}

export interface ChatInputForm {
  content: string;
}

export interface CodePartBtnsProps {
  onCompile: () => void;
  onSubmit: () => void;
}

export interface CompileResult {
  index?: number;
  runtime: number;
  input: string;
  output?: string;
  result: string;
}

export interface ContainerProps {
  content: string;
  historyId?: number;
}

export interface SubmitResult {
  runtime: number;
  result: boolean;
}

export interface ChatsResponse {
  chatResponseList: Chat[];
  firstPage: boolean;
  lastPage: boolean;
  listSize: number;
  totalElements: number;
  totalPage: number;
  currentPage: number;
}
