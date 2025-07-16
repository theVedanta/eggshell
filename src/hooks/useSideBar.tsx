// stores/sidebarStore.ts
import { SideBarNavItems } from "@/components/sidebar/demo_data";
import { create } from "zustand";

type SidebarView = "main" | string;

interface SidebarStore {
  view: SidebarView;
  direction: "left" | "right" | null;
  setView: (view: SidebarView) => void;
  goBack: () => void;
  goForward: () => void;
  reset: () => void;
  isFirst: boolean;
  isLast: boolean;
  availableViews: string[];
}

const allMultiMenuItems = SideBarNavItems.reduce((acc, item) => {
  if (item.isSubItem && item.SubItemsList && item.subMenuViewName) {
    acc.push(item.subMenuViewName);
  }
  return acc;
}, [] as string[]);

const availableViews = ["main", ...allMultiMenuItems];

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  view: "main",
  direction: null,
  setView: (view) => {
    const currentIndex = availableViews.indexOf(get().view);
    const newIndex = availableViews.indexOf(view);
    const direction = newIndex > currentIndex ? "right" : "left";

    set(() => ({
      view,
      direction,
      isFirst: view === "main",
      isLast: availableViews[availableViews.length - 1] === view,
    }));
  },
  goBack: () => {
    const currentIndex = availableViews.indexOf(get().view);
    if (currentIndex > 0) {
      const prevView = availableViews[currentIndex - 1];
      set({
        view: prevView,
        direction: "left",
        isFirst: prevView === "main",
        isLast: prevView === availableViews[availableViews.length - 1],
      });
    }
  },
  goForward: () => {
    const currentIndex = availableViews.indexOf(get().view);
    if (currentIndex < availableViews.length - 1) {
      const nextView = availableViews[currentIndex + 1];
      set({
        view: nextView,
        direction: "right",
        isFirst: nextView === "main",
        isLast: nextView === availableViews[availableViews.length - 1],
      });
    }
  },
  reset: () =>
    set({
      view: "main",
      direction: null,
      isFirst: true,
      isLast: availableViews.length === 1,
    }),
  isFirst: true,
  isLast: availableViews.length === 1,
  availableViews,
}));
