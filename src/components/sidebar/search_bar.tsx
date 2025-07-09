"use client";
import { Loader, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [inputVal, setInputVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query] = useDebounce(inputVal, 500);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize input value from URL search params
  useEffect(() => {
    const currentSearch = searchParams.get("search");
    if (currentSearch) {
      setInputVal(currentSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(false);

    // Only perform search on store pages
    const isStorePage = pathname === "/store" || pathname.startsWith("/store/");

    if (!isStorePage) {
      return;
    }

    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    // Update URL without navigation
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl);
  }, [query, pathname, router, searchParams]);

  // Check if we're on a store page to show/hide the search bar
  const isStorePage = pathname === "/store" || pathname.startsWith("/store/");

  if (!isStorePage) {
    return null;
  }

  return (
    <div className="p-2">
      <div className="relative">
        {isLoading ? (
          <Loader className="absolute animate-spin left-2 top-2.5 h-4 w-4 text-muted-foreground opacity-50" />
        ) : (
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          placeholder="Search products, categories..."
          className="pl-8 cursor-pointer outline-none focus:ring-0"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            setIsLoading(true);
          }}
        />
      </div>
    </div>
  );
}
