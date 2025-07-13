import { useAuth } from "@/contexts/auth/use-auth";
import React from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = unknown;

export function ProtectedRoute({
  children,
}: React.PropsWithChildren<ProtectedRouteProps>) {
  const { isAuthenticated, isLoading, hasError } = useAuth();

  if (isLoading) {
    // TODO: add loader
    return null;
  }

  if (hasError || !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
