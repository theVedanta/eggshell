import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/hooks/useSideBar";
import Link from "next/link";
import { SidebarItemTypes } from "@/types/sidebar.items.types";
import { Button } from "@/components/ui/button";

export default function BrandslList({
  brandsList,
}: {
  brandsList: SidebarItemTypes[];
}) {
  const { view, goBack, goForward, isLast } = useSidebarStore();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="p-3 py-6">
        <Button
          onClick={() => goBack()}
          variant="ghost"
          className="p-2"
          size={"icon"}
        >
          <ChevronLeft />
        </Button>
        <h1 className="w-full text-center text-xl p-2 capitalize">Brands</h1>
        <Button
          disabled={isLast}
          onClick={() => goForward()}
          variant="ghost"
          className="p-2"
          size={"icon"}
        >
          <ChevronRight />
        </Button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="space-y-2 mt-3">
            {brandsList.map(
              (list) =>
                list.isSubItem &&
                list.SubItemsList &&
                list.subMenuViewName === view &&
                list.SubItemsList.map((item) => (
                  <SidebarMenuButton
                    className="p-4.5 bg-accent/40"
                    asChild
                    key={item.title}
                  >
                    <Link href={item.href}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                ))
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
