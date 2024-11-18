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

export interface CodePartProps {
  isRunning: boolean;
  compiledResult: string;
}

export interface CodePartBtnsProps {
  onCompile: () => void;
  onSubmit: () => void;
}
