"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfiniteScrollTriggerProps {
  hasNextPage: boolean;
  isLoading: boolean;
  loadMore: () => void;
  filteredCount: number;
  displayedCount: number;
}

export default function InfiniteScrollTrigger({
  hasNextPage,
  isLoading,
  loadMore,
  filteredCount,
  displayedCount,
}: InfiniteScrollTriggerProps) {
  const { loadMoreRef } = useInfiniteScroll({
    hasNextPage,
    isFetching: isLoading,
    fetchNextPage: loadMore,
    rootMargin: "100px",
  });

  if (!hasNextPage && displayedCount > 0) {
    return;
  }

  return (
    <div>
      {/* Intersection observer target */}
      <div ref={loadMoreRef} />

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>
            <Loader />
          </span>
        </div>
      )}
    </div>
  );
}
