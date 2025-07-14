import { useAuth } from "@/contexts/auth/use-auth";
import React, { useEffect } from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = unknown;

export function ProtectedRoute({
  children,
}: React.PropsWithChildren<ProtectedRouteProps>) {
  const { isAuthenticated, isLoading, hasError, fetchMe } = useAuth();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (isLoading) {
    // TODO: add loader
    return null;
  }

  if (hasError || !isAuthenticated) {
    console.log("EVERYTHING BECAUSE OF IT");
    return <Navigate to="/login" />;
  }

  return children;
}
