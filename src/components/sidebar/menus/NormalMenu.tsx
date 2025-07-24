import { ArrowLeft, ChevronLeft } from "lucide-react";
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

export default function NormalList({
  itemsList,
}: {
  itemsList: SidebarItemTypes[];
}) {
  const {
    view,
    goBack,
    goForward,
    isLast,
    prevIcon: PrevIcon,
    nextIcon: NextIcon,
  } = useSidebarStore();
  return (
    <SidebarGroup className="flex flex-col h-full">
      <div className="flex-shrink-0 mb-2 px-2 py-1">
        <Button
          onClick={() => {
            while (!useSidebarStore.getState().isFirst) {
              goBack();
            }
          }}
          variant="outline"
          size={"sm"}
          className="text-left flex items-center mb-4 justify-start"
        >
          <ChevronLeft /> Go Back
        </Button>
        <div className="flex items-center">
          <Button onClick={goBack} variant="ghost" size={"icon"}>
            <PrevIcon />
          </Button>
          <h1 className="w-full text-center text-xl capitalize">{view}</h1>
          <Button
            disabled={isLast}
            onClick={goForward}
            variant="ghost"
            size={"icon"}
          >
            <NextIcon />
          </Button>
        </div>
      </div>
      <SidebarGroupContent className="flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-2">
          {itemsList.map(
            (list) =>
              list.isSubItem &&
              list.SubItemsList &&
              list.subMenuViewName === view &&
              list.SubItemsList.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="p-4.5 bg-accent/40" asChild>
                    <Link href={item.href}>
                      <span>{item.title}</span>
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
