import * as React from "react";
import { BookOpen, Command, SquareTerminal, Folder } from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth/use-auth";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Snippets",
      url: "/snippets",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "All",
          url: "/snippets",
        },
        {
          title: "Starred",
          url: "/snippets/starred",
        },
        {
          title: "Settings",
          url: "/snippets/settings",
        },
      ],
    },
    {
      title: "Folders",
      url: "#",
      icon: Folder,
      items: [
        {
          title: "All",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Shared",
          url: "#",
        },
      ],
    },
    {
      title: "Application",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "About",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Code-Vault Inc</span>
                  <span className="truncate text-xs">
                    Safe storage for your snippets
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: user?.email ?? "",
            avatar: "TBD",
            name: "To Be Delivered",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
