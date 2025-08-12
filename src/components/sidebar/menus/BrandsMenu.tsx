import { ArrowLeft, ChevronLeft, StepBack } from "lucide-react";
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
import { useGetAllBrands } from "@/query-calls/brands-query";

export default function BrandslList({
  brandsList,
}: {
  brandsList: SidebarItemTypes[];
}) {
  const {
    view,
    goBack,
    prevIcon: PrevIcon,
    goForward,
    isLast,
    nextIcon: NextIcon,
  } = useSidebarStore();
  const { setOpenMobile } = useSidebar();
  const { data: allBrands } = useGetAllBrands();
  return (
    <SidebarGroup className="flex flex-col h-full !pt-0">
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
          <Button
            disabled={isLast}
            onClick={() => goBack()}
            variant="ghost"
            size={"icon"}
          >
            <StepBack />
          </Button>
          <h1 className="w-full text-center text-xl uppercase font-bold">
            Brands
          </h1>
          <Button
            disabled={isLast}
            onClick={() => goForward()}
            variant="ghost"
            size={"icon"}
          >
            <NextIcon />
          </Button>
        </div>
      </div>

      <SidebarGroupContent className="flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-2">
          {brandsList.map(
            (list) =>
              list.isSubItem &&
              list.subMenuViewName === view &&
              allBrands?.map((item: any) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    style={{
                      backgroundImage: `url(${item.logo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() => setOpenMobile(false)}
                    className="bg-accent/40 w-full p-6"
                    asChild
                  >
                    <Link
                      href={`/brands/${item.name.split(" ").join("-").toLowerCase()}`}
                    >
                      {/* <span>{item.name}</span> */}
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
