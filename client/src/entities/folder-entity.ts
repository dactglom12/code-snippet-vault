import type { CreationMetadata } from "./shared";

export type FolderEntity = {
  id: number;
  name: string;
  snippetCount?: number;
} & CreationMetadata;
