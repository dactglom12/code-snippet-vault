import type { Language } from "@/entities/language-entity";

export type CreateSnippetDto = {
  title: string;
  content: string;
  language: Language;
  tags?: string[];
  folderId?: number;
};

export type GetAllSnippetsQueryParams = {
  folderless?: boolean;
};
