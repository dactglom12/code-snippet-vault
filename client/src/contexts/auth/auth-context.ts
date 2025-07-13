import { createContext } from "react";
import type { AuthProviderState } from "./auth-context-types";

export const AuthContext = createContext<AuthProviderState>({
  isAuthenticated: false,
  user: null,
  hasError: false,
  // loading state set to true by default, so that protected route behaves deterministically
  isLoading: true,
  fetchMe: () => Promise.resolve(),
  logout: () => null,
});
