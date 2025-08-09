"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavShoots } from "@/components/nav-shoots"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Camera, Frame, LucideIcon, SquareTerminal } from "lucide-react"
import { Shoot } from "@/lib/db/types"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navGroups: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
  navFlat: [
    {
      name: "Shoots",
      url: "/shoots",
      icon: Camera,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  shoots: Array<Shoot>;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={props.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavShoots shoots={props.shoots} />
        {/*
       <NavMain items={data.navGroups} />
       */}
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
