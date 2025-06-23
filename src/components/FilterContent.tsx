import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function FilterContent({
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
  availableSizes,
  selectedSizes,
  handleSizeToggle,
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
}) {
  return (
    <div className="space-y-6">
      {showSearch && (
        <>
          <Label className="text-base font-semibold mb-3 block">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Separator />
        </>
      )}

      {showCategories && (
        <>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {availableCategories?.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label htmlFor={`category-${category.id}`} className="text-sm">
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
          {availableBrands.map(brand => (
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
          {availableColors.map(color => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => handleColorToggle(color)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === 'white' ? '#ffffff' :
                      color.toLowerCase() === 'black' ? '#000000' :
                      color.toLowerCase() === 'gray' ? '#6b7280' :
                      color.toLowerCase() === 'navy' ? '#1e3a8a' :
                      color.toLowerCase() === 'brown' ? '#92400e' :
                      color.toLowerCase() === 'green' ? '#059669' :
                      color.toLowerCase() === 'blue' ? '#2563eb' :
                      color.toLowerCase() === 'red' ? '#dc2626' :
                      '#6b7280'
                  }}
                />
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
        <div className="space-y-2">
          {availableSizes.map(size => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => handleSizeToggle(size)}
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
      <div>
        <h3 className="font-semibold mb-3">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={maxPrice}
          step={10}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Stock Status */}
      <div className="space-y-2">
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
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );
}
