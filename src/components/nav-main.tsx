"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes";
import { User } from "better-auth";
import { ChevronRight, SquareTerminal, NotebookIcon } from "lucide-react";


export function NavMain({
  user
}: {
  user: User
}) {
  const items = [
    {
      title: "Admin",
      icon: NotebookIcon,
      isActive: true,
      items: [
        {
          title: "Invoices",
          url: routes.invoices,
        },
      ],
    },
    {
      title: "Website",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "View Website",
          url: routes.website(user.name),
        },
        {
          title: "Categories",
          url: routes.categories,
        },
        {
          title: "Featured",
          url: routes.featured,
        },
        {
          title: "Price List",
          url: routes.priceList,
        },
      ],
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
