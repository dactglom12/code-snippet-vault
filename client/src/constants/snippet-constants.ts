import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

export const LANGUAGE_OPTIONS = [
  { label: "JavaScript", value: "javascript", extension: javascript() },
  { label: "Python", value: "python", extension: python() },
];
