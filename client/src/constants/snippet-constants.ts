import { Language } from "@/entities/language-entity";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { SiJavascript, SiPython, SiTypescript } from "react-icons/si";

export const LANGUAGE_OPTIONS = [
  { label: "JavaScript", value: "javascript", extension: javascript() },
  { label: "Python", value: "python", extension: python() },
];

export const languageToIcon = {
  [Language.JAVASCRIPT]: SiJavascript,
  [Language.PYTHON]: SiPython,
  [Language.TYPESCRIPT]: SiTypescript,
};
