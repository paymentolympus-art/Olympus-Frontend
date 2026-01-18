import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavNotification } from "./NavNotification";
import { NavAvatar } from "./NavAvatar";
import { ROUTES_PRIVATE } from "@/constants/routes";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 flex flex-row gap-2 items-center justify-between w-full px-3 py-3 border-b bg-background">
      <div className="flex flex-row gap-2 items-center justify-center">
        <SidebarTrigger className="bg-background hover:bg-purple-600/80 border rounded-sm" />
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <NavNotification />
        <NavAvatar
          onMyAccountClick={() => {
            window.location.href = ROUTES_PRIVATE.MY_ACCOUNT;
          }}
          onSettingsClick={() => {
            window.location.href = ROUTES_PRIVATE.CONFIGURATION;
          }}
          onApiClick={() => {
            window.location.href = ROUTES_PRIVATE.API_KEYS;
          }}
        />
      </div>
    </header>
  );
}
