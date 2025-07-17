import type { FolderEntity } from "./folder-entity";
import type { Language } from "./language-entity";
import type { CreationMetadata } from "./shared";
import type { TagEntity } from "./tag-entity";

export type SnippetEntity = {
  id: number;
  title: string;
  content: string;
  language: Language;
  userId: number;
  folder?: FolderEntity;
  tags?: TagEntity[];
} & CreationMetadata;
