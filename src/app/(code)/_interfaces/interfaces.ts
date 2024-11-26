export interface ProfileInfoProps {
  category: string;
  content: number;
}

export interface Code {
  algorithm: string;
  codeId: number;
  content: string;
  correctRate: number;
  createdAt: string;
  difficulty: "LEVEL1" | "LEVEL2" | "LEVEL3" | "LEVEL4" | "LEVEL5";
  registerStatus: string;
  title: string;
}

export interface History {
  codeHistoryId: number;
  codeId: number;
  compiledAt: string;
  createdAt: string;
  isCorrect: boolean;
  isCreatedByAI: boolean;
  writtenCode: string;
  codeTitle: string;
}

export interface CreateCodeForm {
  difficulty: string;
  algorithm?: string;
  requirement?: string;
}
