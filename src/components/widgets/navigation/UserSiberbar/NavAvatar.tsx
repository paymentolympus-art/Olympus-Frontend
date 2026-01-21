import { useState } from "react";
import {
  HiMiniUser,
  HiMiniCog6Tooth,
  HiMiniArrowRightOnRectangle,
  HiMiniCodeBracket,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface NavAvatarProps {
  onApiClick?: () => void;
  onMyAccountClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

export function NavAvatar({
  onApiClick,
  onMyAccountClick,
  onSettingsClick,
}: NavAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: "my-account",
      label: "Sua conta",
      icon: HiMiniUser,
      onClick: onMyAccountClick,
      status: user?.status,
    },
    {
      id: "settings",
      label: "Configurações",
      icon: HiMiniCog6Tooth,
      onClick: onSettingsClick,
    },
    {
      id: "api",
      label: "API",
      icon: HiMiniCodeBracket,
      onClick: onApiClick,
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
          {user?.name ? (
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-to-tr from-[#8B6914] from-50% to-[#D4AF37] text-accent-foreground">
                {getInitials(user?.name || "")}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Skeleton className="h-9 w-9 rounded-full" />
          )}

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-0.5 -right-0.5"
          >
            <div
              className={cn(
                "h-3 w-3 rounded-full border-2 border-background",
                user?.status === "APPROVED" && "bg-green-500",
                user?.status === "PENDING" && "bg-yellow-500",
                user?.status === "REJECTED" && "bg-red-500",
                user?.status === "NOT_SENT" && "bg-red-500"
              )}
            />
          </motion.div>

          <span className="sr-only">Menu do usuário</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-0" sideOffset={8}>
        {/* Header com informações do usuário */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-tr from-[#8B6914] from-50% to-[#D4AF37] text-accent-foreground">
                {getInitials(user?.name || "")}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
                user?.status === "APPROVED" && "bg-green-500",
                user?.status === "PENDING" && "bg-yellow-500",
                user?.status === "REJECTED" && "bg-red-500",
                user?.status === "NOT_SENT" && "bg-red-500"
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Menu items */}
        <div className="py-2">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-2 cursor-pointer group rounded-none hover:bg-tertiary!"
              )}
            >
              <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-white" />
              <span className="text-sm font-semibold text-muted-foreground group-hover:text-white">
                {item.label}
              </span>
              {item.status === "NOT_SENT" && (
                <div
                  className={cn(
                    "absolute bottom-2.1 right-1.5 h-3 w-3 rounded-full border-2 border-background animate-pulse",
                    user?.status === "APPROVED" && "bg-green-500",
                    user?.status === "PENDING" && "bg-yellow-500",
                    user?.status === "REJECTED" && "bg-red-500",
                    user?.status === "NOT_SENT" && "bg-red-500"
                  )}
                />
              )}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Logout */}
        <div className="py-2">
          <DropdownMenuItem
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="rounded-none flex items-center gap-3 px-4 py-2 cursor-pointer group hover:bg-destructive/20!"
          >
            <HiMiniArrowRightOnRectangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">
              Deslogar
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
