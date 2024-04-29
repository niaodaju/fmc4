import type { DraggableId, DraggableLocation } from '@hello-pangea/dnd';

export type Id = string;

export interface AuthorColors {
  soft: string;
  hard: string;
}

export interface Author {
  id: Id;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
}

export interface Quote {
  id: Id;
  content: string;
  author: Author;
}

export interface Dragging {
  id: DraggableId;
  location: DraggableLocation;
}

export interface QuoteMap {
  [key: string]: Quote[];
}

export interface Task {
  id: Id;
  content: string;
  question: Blob;
  answer: Blob;
  choicAnswer: boolean;
  subject: string;
  grade: string;
  chapter: string;
  tips: string[];
  difficulty: number;
  deleted: boolean;
}
