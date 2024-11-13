import Link from "next/link";
import {
  Building2,
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  PenIcon,
  Plane,
  Search,
  Settings,
  Trash,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@polaris/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@polaris/ui/select";
import { Separator } from "@polaris/ui/separator";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  Sidebar as SidebarMain,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@polaris/ui/sidebar";

import { Logo } from "../Logo";
import { SidebarUser } from "./SidebarUser";

const organizations = [
  { id: "1", name: "Organization 1" },
  { id: "2", name: "Organization 2" },
  { id: "3", name: "Organization 3" },
];

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: SidebarItem[];
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    subItems: [
      {
        title: "Drafts",
        url: "#",
        icon: PenIcon,
      },
      {
        title: "Sent",
        url: "#",
        icon: Plane,
      },
      {
        title: "Trash",
        url: "#",
        icon: Trash,
      },
    ],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
] satisfies SidebarItem[];

export function Sidebar() {
  return (
    <SidebarMain>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-6" />
          Application
        </div>

        <Separator />

        <Select>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <SelectValue placeholder="Select organization" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {organizations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Collapsible className="group/collapsible" key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </span>
                        {item.subItems && (
                          <CollapsibleTrigger asChild>
                            <ChevronDown className="size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </CollapsibleTrigger>
                        )}
                      </Link>
                    </SidebarMenuButton>

                    <CollapsibleContent>
                      {item.subItems && (
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <subItem.icon />
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="flex flex-col gap-2">
        <SidebarUser />
      </SidebarFooter>
    </SidebarMain>
  );
}
