import { ArrowLeft, ChevronLeft } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/hooks/useSideBar";
import Link from "next/link";
import { SidebarItemTypes } from "@/types/sidebar.items.types";
import { Button } from "@/components/ui/button";
import { useGetSideBarSubcategoriesByCategory } from "@/query-calls/sidebar-opts";
import { toTitleCase } from "@/lib/utils";

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
  const { setOpenMobile } = useSidebar();
  const { data: subcategories } = useGetSideBarSubcategoriesByCategory(view);
  return (
    <SidebarGroup className="flex flex-col flex-shrink-0 h-full">
      <Button
        onClick={() => {
          while (!useSidebarStore.getState().isFirst) {
            goBack();
          }
        }}
        variant="outline"
        size={"sm"}
        className="text-left flex items-center w-fit mb-2 justify-start"
      >
        <ChevronLeft /> Go Back
      </Button>
      <div className="flex-shrink-0 mb-2 px-2 py-1">
        <div className="flex items-center">
          <Button onClick={goBack} variant="ghost" size={"icon"}>
            <PrevIcon />
          </Button>
          <h1 className="w-full text-center uppercase font-bold">{view}</h1>
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
        <SidebarMenu className="space-y-1">
          {itemsList.map(
            (list) =>
              list.isSubItem &&
              list.subMenuViewName === view &&
              subcategories?.map((item) => (
                <SidebarMenuItem key={item}>
                  <SidebarMenuButton
                    onClick={() => setOpenMobile(false)}
                    className="p-4.5 bg-accent/80"
                    asChild
                  >
                    <Link href={`/${view}/${item}`}>
                      <span>{toTitleCase(item.split("_").join(" "))}</span>
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
