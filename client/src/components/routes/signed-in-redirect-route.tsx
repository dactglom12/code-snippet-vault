import { useAuth } from "@/contexts/auth/use-auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

type ProtectedRouteProps = unknown;

export function SignedInRedirectRoute({
  children,
}: React.PropsWithChildren<ProtectedRouteProps>) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return children;
}
