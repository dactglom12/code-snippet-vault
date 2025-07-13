import type { ReactNode } from "react";

export type AppRoute = {
  path?: string;
  index?: boolean;
  element: ReactNode;
  children?: AppRoute[];
};
