import type { UserEntity } from "@/entities/user-entity";

export type AuthProviderState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasError: boolean;
  user: UserEntity | null;
  fetchMe: () => Promise<void>;
  logout: () => void;
};
