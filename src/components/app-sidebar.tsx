"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavShoots } from "@/components/nav-shoots";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Shoot, User } from "@/lib/db/types";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: User;
  shoots: Array<Shoot>;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={props.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavShoots shoots={props.shoots} />
        <NavMain user={props.user} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
