import { SidebarItems } from "@/types/sidebar.items.types";
import { useSidebarStore } from "@/hooks/useSideBar";
import MainMenu from "./menus/MainMenu";
import BrandslList from "./menus/BrandsMenu";
import NormalList from "./menus/NormalMenu";
import { AnimatePresence, motion } from "motion/react";

export function NavMain({ navItems }: { navItems: SidebarItems }) {
  const { view, direction } = useSidebarStore();

  const slideVariants = {
    enter: (direction: "left" | "right" | null) => ({
      x: direction === "right" ? "100%" : direction === "left" ? "-100%" : 0,
    }),
    center: {
      x: 0,
    },
    exit: (direction: "left" | "right" | null) => ({
      x: direction === "right" ? "-100%" : direction === "left" ? "100%" : 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={view}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          damping: 100,
          ease: "easeInOut",
          duration: 0.095,
        }}
        className="w-full overflow-hidden"
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
