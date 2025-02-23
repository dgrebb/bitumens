export * from "./Issues.type";

export interface Issue {
  id: number;
  title: string;
  summary: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
