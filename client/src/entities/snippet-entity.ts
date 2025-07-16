import type { Language } from "./language-entity";
import type { TagEntity } from "./tag-entity";

export type SnippetEntity = {
  id: number;
  title: string;
  content: string;
  language: Language;
  userId: number;
  folderId?: number;
  tags?: TagEntity[];
};
