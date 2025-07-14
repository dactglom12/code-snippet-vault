import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./auth-context";
import { AuthApi } from "@/api/auth-api";
import type { UserEntity } from "@/entities/user-entity";

export function AuthProvider({ children }: React.PropsWithChildren<unknown>) {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchMe = useCallback(async () => {
    // no need to refetch
    if (user) {
      return;
    }

    try {
      setIsLoading(true);
      setHasError(false);
      const user = await AuthApi.me();
      setUser(user);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    setHasError(false);
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const memoizedValue = useMemo(
    () => ({
      isLoading,
      user,
      hasError,
      isAuthenticated,
      fetchMe,
      logout,
    }),
    [isLoading, user, hasError, isAuthenticated, fetchMe, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
