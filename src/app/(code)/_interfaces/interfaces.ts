export interface ProfileCardProps {
  userData?: {
    profileImg: string;
    rank: string;
    nickname: string;
    solved: number;
    registered: number;
    score: number;
    ranking: number;
  };
}

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
  historyId: number;
  createdAt: string;
  title: string;
  isCorrect: boolean;
  registerStatus: boolean;
  isAI: boolean;
  codeId: number;
  userId: number;
}

export interface CreateCodeForm {
  difficulty: string;
  algorithm?: string;
  requirement?: string;
}
