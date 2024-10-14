export interface IProfileCard {
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

export interface IProfileInfo {
  category: string;
  content: number;
}

export interface Code {
  id: number;
  title: string;
  difficulty: number;
  participants: number;
  rate: number;
  createdAt: string;
}

export interface History {
  id: number | null;
  title: string;
  difficulty: number;
  participants: number;
  rate: number;
  hasSolved: boolean;
  createdAt: string;
}
