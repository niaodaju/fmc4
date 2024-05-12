// export type Quiz = {
//   image: Blob;
//   subject: string;
//   grade: string;
//   chapter: string;
//   hard: number;
// };

export interface SetUser {
  (name: string, age: number): void;
}

export type imageSize = {
  width: number;
  height: number;
};

export interface imageObj {
  url: string;
  blob: Blob;
}

export interface ImageProps {
  imgblob: Blob;
}
export interface Quiz {
  id: string;
  question: Blob;
  answer: Blob;
  AnswerChoice: number;
  subject: string;
  grade: string;
  chapter: string;
  tips: string[];
  difficulty: number;
}
