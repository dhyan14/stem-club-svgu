
export enum Round {
  INITIAL,
  ONE,
  TWO,
  THREE,
  COMPLETED
}

export interface QuestionMCQ {
  id: number;
  question: string;
  options: { [key: string]: string };
}

export interface QuestionOpenEnded {
  id: number;
  question: string;
}

export type Round1Answers = { [key: number]: string };

export type Round2Answers = { [key: number]: string[] };

export type Round3Answer = { answer: string; submitted: boolean };
export type Round3Answers = { [key: number]: Round3Answer };
