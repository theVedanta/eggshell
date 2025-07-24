import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { SlidersHorizontal } from "lucide-react";
import ColorIcon from "@/components/ColorIcon";

interface Sizes {
  clothingSizes: string[];
  shoeSizes: string[];
}
export default function FilterButton({
  showSearch,
  searchQuery,
  setSearchQuery,
  availableCategories,
  selectedCategories,
  handleCategoryToggle,
  availableBrands,
  selectedBrands,
  handleBrandToggle,
  availableColors,
  selectedColors,
  handleColorToggle,
  availableShoeSizes,
  availableClothingSizes,
  clothingSizes,
  shoeSizes,
  handleClothingSizeToggle,
  handleShoeSizeToggle,
  priceRange,
  setPriceRange,
  maxPrice,
  inStockOnly,
  setInStockOnly,
  featuredOnly,
  setFeaturedOnly,
  activeFiltersCount,
  clearFilters,
  showFeatured,
  showCategories,
}: {
  showSearch: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  availableCategories?: { id: string; name: string }[];
  selectedCategories?: string[];
  handleCategoryToggle?: (categoryId: string) => void;
  availableBrands: string[];
  selectedBrands: string[];
  handleBrandToggle: (brand: string) => void;
  availableColors: string[];
  selectedColors: string[];
  handleColorToggle: (color: string) => void;
  availableShoeSizes: string[];
  availableClothingSizes: string[];
  clothingSizes: string[];
  shoeSizes: string[];
  handleClothingSizeToggle: (size: string) => void;
  handleShoeSizeToggle: (size: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
  inStockOnly: boolean;
  setInStockOnly: (checked: boolean) => void;
  featuredOnly?: boolean;
  setFeaturedOnly?: (checked: boolean) => void;
  activeFiltersCount: number;
  clearFilters: () => void;
  showFeatured: boolean;
  showCategories: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetTitle className="hidden">{""}</SheetTitle>
      <SheetContent side="right" className="px-6 flex flex-col max-h-screen">
        <div className="mt-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            {/* Show active search query if exists */}
            {searchQuery && (
              <>
                <div>
                  <h3 className="font-semibold mb-3">Active Search</h3>
                  <div className="p-2 bg-muted rounded-md">
                    <span className="text-sm text-muted-foreground">
                      Searching for: "{searchQuery}"
                    </span>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {showCategories && (
              <>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {availableCategories?.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={
                          selectedCategories &&
                          selectedCategories.includes(category.id)
                        }
                        onCheckedChange={() =>
                          handleCategoryToggle &&
                          handleCategoryToggle(category.id)
                        }
                      />
                      <Label
                        htmlFor={`category-${category.id}`}
                        className="text-sm"
                      >
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <Separator />
              </>
            )}

            {/* Brands */}
            <div>
              <h3 className="font-semibold mb-3">Brands</h3>
              <div className="space-y-2">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Colors */}
            <div>
              <h3 className="font-semibold mb-3">Colors</h3>
              <div className="space-y-2">
                {availableColors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorToggle(color)}
                    />
                    <Label
                      htmlFor={`color-${color}`}
                      className="text-sm flex items-center gap-2"
                    >
                      <ColorIcon color={color} />
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Shoe Sizes */}
            <div>
              <h3 className="font-semibold mb-3">Shoe Sizes</h3>
              <div className="space-y-2">
                {availableShoeSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={shoeSizes.includes(size)}
                      onCheckedChange={() => handleShoeSizeToggle(size)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clothing Sizes */}
            <div>
              <h3 className="font-semibold mb-3">Clothing Sizes</h3>
              <div className="space-y-2">
                {availableClothingSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={clothingSizes.includes(size)}
                      onCheckedChange={() => handleClothingSizeToggle(size)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="px-4">
              <h3 className="font-semibold mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </h3>
              <Slider
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                max={maxPrice}
                step={10}
                className="w-full"
              />
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="space-y-2 mb-5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly}
                />
                <Label htmlFor="in-stock" className="text-sm">
                  In stock only
                </Label>
              </div>
              {showFeatured && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={featuredOnly}
                    onCheckedChange={setFeaturedOnly}
                  />
                  <Label htmlFor="featured" className="text-sm">
                    Featured products only
                  </Label>
                </div>
              )}
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full mb-5"
              >
                Clear All Filters ({activeFiltersCount})
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
