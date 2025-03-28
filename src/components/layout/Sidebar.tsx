import { PanelLeft } from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menu } from "@/types/menu";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { isViewer } = useAuth();

  if (isViewer) return <></>;

  return (
    <div className="relative h-full">
      <Sidebar
        collapsible="icon"
        className={`h-full transition-all duration-300 ${
          collapsed ? "!w-16" : "w-64"
        }`}
      >
        <SidebarContent>
          <SidebarGroup>
            <div
              className={`flex items-center py-2 ${
                collapsed ? "justify-center px-0" : "px-2"
              }`}
            >
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center justify-center p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <PanelLeft size={18} />
              </button>
            </div>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menu.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={
                      pathname === `${item.url}`
                        ? "bg-gray-100 dark:bg-gray-800"
                        : ""
                    }
                  >
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center ${
                          collapsed ? "justify-center px-0" : "px-2"
                        }`}
                      >
                        <item.icon
                          className={`h-5 w-5 ${collapsed ? "" : "mr-2"}`}
                        />
                        <span className={collapsed ? "sr-only" : ""}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
