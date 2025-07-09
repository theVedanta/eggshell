import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNodeChildernProps } from "@/types/comman.types";

export default function Layout({ children }: ReactNodeChildernProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Main Content */}
        <main className="flex-1 min-h-0">
          <div className="container-wide mx-auto px-4 py-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
