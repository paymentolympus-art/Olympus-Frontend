"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { routesDashboard } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

export function NavMain() {
  const { open, activeRoute } = useSidebar();
  const navigate = useNavigate();

  return (
    <SidebarGroup className=" flex flex-col gap-2">
      <SidebarMenu
        className={cn(
          "flex flex-col gap-2",
          !open && "items-center justify-center"
        )}
      >
        {routesDashboard.map((item) => (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              tooltip={item.title}
              data-active={
                activeRoute === item.url || activeRoute.includes(item.url)
              }
              onClick={() => {
                navigate(item.url);
              }}
              className={"hover:cursor-pointer"}
            >
              {item.icon && <item.icon size={30} />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
