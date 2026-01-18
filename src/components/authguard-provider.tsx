import React, { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES_PUBLIC } from "@/constants/routes";

// Componente de Loading
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/icons/logo-icon.png"
          alt="Logo"
          width={100}
          height={100}
          className="animate-pulse"
        />
      </div>
    </div>
  );
}

export function AuthGuardProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const shouldRedirect = useMemo(() => {
    return !isAuthenticated && location.pathname.includes("/user/");
  }, [isAuthenticated, location.pathname]);

  useEffect(() => {
    if (!isLoading) {
      if (shouldRedirect) {
        navigate(ROUTES_PUBLIC.LOGIN, { replace: true });
      }
    }
  }, [shouldRedirect, navigate, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
