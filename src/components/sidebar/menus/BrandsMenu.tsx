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
    <SidebarGroup className="flex flex-col h-full !pt-0">
      <div className="flex-shrink-0 mb-2">
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

      <SidebarGroupContent className="flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <Button
              onClick={() => goBack()}
              variant="link"
              className="w-full text-left flex items-center justify-start"
            >
              <ArrowLeft /> Go Back
            </Button>
          </SidebarMenuItem>

          {brandsList.map(
            (list) =>
              list.isSubItem &&
              list.SubItemsList &&
              list.subMenuViewName === view &&
              list.SubItemsList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    style={{
                      backgroundImage: `url(${item.brandImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="bg-accent/40 w-full p-6"
                    asChild
                  >
                    <Link href={item.href}>
                      {/* <span>{item.title}</span> */}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
