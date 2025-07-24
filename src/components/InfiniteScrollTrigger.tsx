"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
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
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>You've seen all {filteredCount} products</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 space-y-4">
      {/* Intersection observer target */}
      <div ref={loadMoreRef} className="h-4" />

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading more products...</span>
        </div>
      )}

      {hasNextPage && !isLoading && (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Showing {displayedCount} of {filteredCount} products
          </p>
          <Button variant="outline" onClick={loadMore} className="min-w-32">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
