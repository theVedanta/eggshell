import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/hooks/useSideBar";
import { SidebarItemTypes } from "@/types/sidebar.items.types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MainMenu({ array }: { array: SidebarItemTypes[] }) {
  const { setView } = useSidebarStore();
  const { open, setOpen } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {array.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.isSubItem && item.SubItemsList ? (
              <SidebarMenuButton
                onClickCapture={() => {
                  if (!open) setOpen(true);
                }}
                asChild
                tooltip={item.title}
                onClick={() => setView(item.subMenuViewName as string)}
              >
                <p>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto" />
                </p>
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.href ?? ""}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
