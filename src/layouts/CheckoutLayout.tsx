import { Outlet } from "react-router-dom";
import { QueryProvider } from "@/components/query-provider";
import { AuthGuardProvider } from "@/components/authguard-provider";

export function CheckoutLayout() {
  return (
    <AuthGuardProvider>
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </AuthGuardProvider>
  );
}
