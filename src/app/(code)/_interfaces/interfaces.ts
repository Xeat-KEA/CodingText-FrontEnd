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
  codeId: number;
  title: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  participants?: number;
  rate?: number;
  createdAt?: string;
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
