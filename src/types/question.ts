export const categories = [
  "DSA",
  "Git",
  "Technical",
  "Interview",
  "Machine Coding",
] as const;
export const difficulties = ["Easy", "Medium", "Hard"] as const;
export const statuses = ["Pending", "In Progress", "Completed"] as const;

export type Category = (typeof categories)[number];
export type Difficulty = (typeof difficulties)[number];
export type QuestionStatus = (typeof statuses)[number];
export type View = "dashboard" | "questions" | "progress" | "settings";

export interface Question {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  status: QuestionStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type QuestionDraft = Omit<Question, "id" | "createdAt" | "updatedAt">;
