import { Hamburger, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export default function TopNavbar() {
  const { setOpen, open } = useSidebar();
  return (
    <nav className="fixed top-0 left-0 w-full h-12 bg-background border-b flex items-center px-4 md:hidden z-50">
      <Button
        variant="outline"
        aria-label="Open menu"
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </Button>
    </nav>
  );
}
