import { ArrowLeft, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
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
    <SidebarGroup className="!pt-0">
      <div className="flex-col">
        <div className="flex items-center">
          <Button onClick={() => goBack()} variant="ghost" size={"icon"}>
            <ChevronLeft />
          </Button>
          <h1 className="w-full text-center text-xl capitalize">Brands</h1>
          <Button
            disabled={isLast}
            onClick={() => goForward()}
            variant="ghost"
            size={"icon"}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="space-y-1 mt-3">
            <Button
              onClick={() => goBack()}
              variant="link"
              className="w-full text-left flex items-center justify-start"
            >
              <ArrowLeft /> Go Back
            </Button>

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
