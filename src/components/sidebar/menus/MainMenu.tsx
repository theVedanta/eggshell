import { CartSheet } from "@/components/CartSheet";
import { Badge } from "@/components/ui/badge";
import { SheetTrigger } from "@/components/ui/sheet";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSidebarStore } from "@/hooks/useSideBar";
import { useCart } from "@/state/useCart";
import { SidebarItemTypes } from "@/types/sidebar.items.types";
import { ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function MainMenu({ array }: { array: SidebarItemTypes[] }) {
  const { setView } = useSidebarStore();
  const { open, setOpen, state } = useSidebar();
  const { itemCount } = useCart();

  return (
    <SidebarGroup className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="space-y-1 grid gap-1">
          {array.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.isSubItem && item.SubItemsList ? (
                <SidebarMenuButton
                  className="py-6 px-3 text-base"
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
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="py-6 px-3"
                >
                  <Link href={item.href ?? ""}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
          <SidebarMenuButton
            tooltip={"Cart"}
            isActive={itemCount > 0}
            className="cursor-pointer py-6 px-3"
          >
            <CartSheet>
              <SheetTrigger asChild>
                <span
                  className={`relative py-4 w-full flex items-center h-full transition duration-300`}
                >
                  <ShoppingCart className="h-4 w-4" />

                  <span className="ml-2 text-sm">Cart</span>
                  {itemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute top-2 right-3 h-4 w-4 rounded-full p-0 text-xs flex items-center justify-center px-3"
                    >
                      {itemCount > 100 ? "99+" : itemCount}
                    </Badge>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </span>
              </SheetTrigger>
            </CartSheet>
          </SidebarMenuButton>
        </SidebarMenu>
      </div>
    </SidebarGroup>
  );
}
