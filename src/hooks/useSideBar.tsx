// stores/sidebarStore.ts
import { SideBarNavItems } from "@/components/sidebar/demo_data";
import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";
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
  availableViews: SidebarView[];
  prevIcon: LucideIcon;
  nextIcon: LucideIcon;
}

const allMultiMenuItems = SideBarNavItems.reduce(
  (acc, item) => {
    if (item.isSubItem && item.SubItemsList && item.subMenuViewName) {
      acc.push({
        viewName: item.subMenuViewName,
        icon: item?.icon,
      });
    }
    return acc;
  },
  [] as { viewName: string; icon: LucideIcon | undefined }[]
);

const availableViews: SidebarView[] = [
  "main",
  ...allMultiMenuItems.map((item) => item.viewName),
];

const getPrevIcon = (currentView: SidebarView): LucideIcon => {
  const currentIndex = availableViews.indexOf(currentView);
  if (currentIndex <= 0) return ChevronLeft;

  const prevView = availableViews[currentIndex - 1];
  if (prevView === "main") return ChevronLeft;

  const prevItem = allMultiMenuItems.find((item) => item.viewName === prevView);
  return prevItem?.icon || ChevronLeft;
};

const getNextIcon = (currentView: SidebarView): LucideIcon => {
  const currentIndex = availableViews.indexOf(currentView);
  if (currentIndex >= availableViews.length - 1) return ChevronRight;

  const nextView = availableViews[currentIndex + 1];
  const nextItem = allMultiMenuItems.find((item) => item.viewName === nextView);
  return nextItem?.icon || ChevronRight;
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  view: "main",
  direction: null,
  prevIcon: ChevronLeft,
  nextIcon: ChevronRight,
  setView: (view) => {
    const currentIndex = availableViews.indexOf(get().view);
    const newIndex = availableViews.indexOf(view);
    const direction = newIndex > currentIndex ? "right" : "left";

    set(() => ({
      view,
      direction,
      prevIcon: getPrevIcon(view),
      nextIcon: getNextIcon(view),
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
        prevIcon: getPrevIcon(prevView),
        nextIcon: getNextIcon(prevView),
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
        prevIcon: getPrevIcon(nextView),
        nextIcon: getNextIcon(nextView),
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
