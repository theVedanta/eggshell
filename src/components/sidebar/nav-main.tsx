import { SidebarItems } from "@/types/sidebar.items.types";
import { useSidebarStore } from "@/hooks/useSideBar";
import MainMenu from "./menus/MainMenu";
import BrandslList from "./menus/BrandsMenu";
import NormalList from "./menus/NormalMenu";
import { AnimatePresence, motion } from "motion/react";

export function NavMain({ navItems }: { navItems: SidebarItems }) {
  const { view } = useSidebarStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.1,
          ease: "easeInOut",
        }}
      >
        {(() => {
          switch (view) {
            case "main":
              return <MainMenu array={navItems} />;
            case "brands":
              return <BrandslList brandsList={navItems} />;
            default:
              return <NormalList itemsList={navItems} />;
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );
}
