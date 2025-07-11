// stores/sidebarStore.ts
import { SideBarNavItems } from "@/components/sidebar/demo_data";
import { create } from "zustand";

type SidebarView = "main" | string;

interface SidebarStore {
  view: SidebarView;
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
  setView: (view) => {
    set(() => ({
      view,
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
        isFirst: nextView === "main",
        isLast: nextView === availableViews[availableViews.length - 1],
      });
    }
  },
  reset: () =>
    set({
      view: "main",
      isFirst: true,
      isLast: availableViews.length === 1,
    }),
  isFirst: true,
  isLast: availableViews.length === 1,
  availableViews,
}));
