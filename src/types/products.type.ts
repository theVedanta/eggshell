interface ColorImage {
  productColor: string;
  productImages: string[];
}

export type Colors = ColorImage[];

export interface GSheetProduct {
  id: string; //
  name: string; //
  description: string; //
  price: number; //
  originalPrice?: number; ///
  category: string; //
  subcategory: string; //
  brand: string; //
  colors: Colors;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  tags: string[];
}
