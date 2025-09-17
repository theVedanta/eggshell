"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Shirt, Watch, Footprints } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: string[];
}

const categories: Category[] = [
  {
    id: "apparel",
    name: "Apparel",
    icon: <Shirt className="w-6 h-6" />,
    subcategories: [
      "T-Shirts & Tops",
      "Dresses",
      "Jeans & Pants",
      "Jackets & Coats",
      "Sweaters & Hoodies",
      "Activewear",
      "Formal Wear",
      "Sleepwear",
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: <Watch className="w-6 h-6" />,
    subcategories: [
      "Watches",
      "Jewelry",
      "Bags & Purses",
      "Belts",
      "Sunglasses",
      "Hats & Caps",
      "Scarves",
      "Wallets",
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    icon: <Footprints className="w-6 h-6" />,
    subcategories: [
      "Sneakers",
      "Dress Shoes",
      "Boots",
      "Sandals",
      "Athletic Shoes",
      "Heels",
      "Flats",
      "Casual Shoes",
    ],
  },
];

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsTransitioning(false);
    }, 150);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setIsTransitioning(false);
    }, 150);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    // Here you would typically navigate to the products page or handle the selection
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Shop by Category
        </h1>
        <p className="text-muted-foreground text-lg">
          {selectedCategory
            ? `Choose from ${selectedCategory.name} subcategories`
            : "What are you interested in today?"}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Main Categories View */}
        <div
          className={`transition-transform duration-300 ease-in-out ${
            selectedCategory
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          } ${isTransitioning ? "pointer-events-none" : ""}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => handleCategorySelect(category)}
              >
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Explore our {category.name.toLowerCase()} collection
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subcategories View */}
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${
            selectedCategory
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          } ${isTransitioning ? "pointer-events-none" : ""}`}
        >
          {selectedCategory && (
            <div>
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="mr-4 hover:bg-accent"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
                <div className="flex items-center">
                  <div className="text-primary mr-3">
                    {selectedCategory.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {selectedCategory.name}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedCategory.subcategories.map((subcategory, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start hover:bg-accent hover:border-primary transition-all duration-200 bg-transparent"
                    onClick={() => handleSubcategorySelect(subcategory)}
                  >
                    <span className="text-sm font-medium text-pretty">
                      {subcategory}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
