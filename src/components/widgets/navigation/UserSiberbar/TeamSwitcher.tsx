"use client";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export function TeamSwitcher() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <aside
            className={cn(
              "flex items-center gap-2  rounded-lg py-2",
              !open && "p-0"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center  w-full",
                open && "hidden"
              )}
            >
              <img
                src="/icons/logo-icon.png"
                alt="Logo"
                className={cn("w-auto h-10")}
              />
            </div>
            <img
              src="/icons/logo.png"
              alt="Logo"
              className={cn("w-auto h-16 p-2", !open && "hidden")}
            />
          </aside>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
