import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/widgets/navigation/UserSiberbar";
import { QueryProvider } from "@/components/query-provider";
import { AuthGuardProvider } from "@/components/authguard-provider";

export function UserLayout() {
  return (
    <AuthGuardProvider>
      <SidebarProvider>
        <QueryProvider>
          <UserSidebar />
          <SidebarInset className="h-screen overflow-y-auto scrollbar-custom scrollbar-thin scrollbar-thumb-tertiary scrollbar-track-background">
            <Outlet />
          </SidebarInset>
        </QueryProvider>
      </SidebarProvider>
    </AuthGuardProvider>
  );
}
