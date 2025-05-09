"use client";

import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconPalette,
  IconChartLine,
  IconTimeline,
  IconFileStack,
  IconHome,
} from "@tabler/icons-react";
import Link from "next/link";

import { NavDocuments } from "~/components/nav-documents";
import { NavMain } from "~/components/nav-main";
import { NavSecondary } from "~/components/nav-secondary";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Basic Components",
      url: "/shadcn",
      icon: IconPalette,
    },
    {
      title: "Forms",
      url: "/form-management",
      icon: IconFileStack,
    },
    {
      title: "Analytics Demo",
      url: "/analytics-demo",
      icon: IconChartLine,
    },
    {
      title: "Timeline Demo",
      url: "/timeline-demo",
      icon: IconTimeline,
    },
  ],
  navClouds: [],
  navSecondary: [],
  documents: [
    {
      name: "Dashboard Boilerplate",
      url: "/dashboard",
      icon: IconDashboard,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">iamxavier stack</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
