"use client";
import { Ellipsis, Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const SearchBar = forwardRef<HTMLInputElement, unknown>(
  function SearchBar(_, ref) {
    const [inputVal, setInputVal] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [query] = useDebounce(inputVal, 1000);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      // Create new URLSearchParams object
      const params = new URLSearchParams(searchParams);

      if (query) {
        if (!pathname.startsWith("/store")) {
          router.push(`/store?search=${query}`);
          return;
        }
        params.set("search", query);
        setIsLoading(false);
      } else {
        params.delete("search");
        setIsLoading(false);
      }

      // Update URL without navigation
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl);
    }, [query, pathname, router, searchParams]);

    return (
      <div className="p-2 mt-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white" />
          <Input
            placeholder="Search products..."
            className="pl-8 h-9 w-full border-[1.5px] border-border rounded-lg outline-none pr-8 focus-visible:ring-0"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setIsLoading(true);
            }}
            ref={inputRef}
          />
          {isLoading && (
            <Ellipsis className="absolute animate-spin right-2.5 top-2.5 h-4 w-4 text-white/90 opacity-100" />
          )}
        </div>
      </div>
    );
  }
);

export default SearchBar;
