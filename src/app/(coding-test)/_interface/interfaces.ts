export interface Chat {
  role: string;
  content: string;
}

export interface ChatInputProps {
  onSubmit: (data: ChatInputForm) => void;
}

export interface ChatInputForm {
  correctOrNot: boolean;
  sendWithCode: boolean;
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
  chats?: Chat[];
}

export interface SubmitResult {
  runtime: number;
  result: boolean;
}
