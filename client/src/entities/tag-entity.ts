import type { CreationMetadata } from "./shared";

export type TagEntity = {
  id: number;
  label: string;
} & CreationMetadata;
