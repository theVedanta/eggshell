import { API_URL } from "@/lib/env";
import { GSheetProduct } from "@/types/products.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAllProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
  });
  return { data, error, isLoading };
}

export function useGetProductById(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Product not found");
        }
        throw new Error("Failed to fetch product");
      }
      const result = await response.json();
      return result.data as GSheetProduct;
    },
    enabled: !!id, // Only run query if ID is provided
  });

  return { data, error, isLoading };
}

export function useGetRelatedProducts(id: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["related-products", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/${id}/related`);
      if (!response.ok) {
        throw new Error("Failed to fetch related products");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
    enabled: !!id,
  });
  return { data, error, isLoading };
}

export function useGetFeaturedProducts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/featured`);
      if (!response.ok) {
        throw new Error("Failed to fetch featured products");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
  });
  return { data, error, isLoading };
}

export function useGetProductsByBrand(brand: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products-by-brand", brand],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/brand/${brand}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products by brand");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
  });
  return { data, error, isLoading };
}

export function useGetProductsBySubCategory(category: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products-by-category", category],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/products/subcategory/${category}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products by category");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
  });
  return { data, error, isLoading };
}

export function useGetAllProductsByCategory() {
  const { data: FootwearProducts, isLoading: isFootwearLoading } = useQuery({
    queryKey: [`products-by-footwear`],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/category/footwear`);
      if (!response.ok) {
        throw new Error("Failed to fetch products by category");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
  });

  const { data: ApparelProducts, isLoading: isApparelLoading } = useQuery({
    queryKey: ["products-by-apparel"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/category/apparel`);
      if (!response.ok) {
        throw new Error("Failed to fetch products by category");
      }
      const result = await response.json();
      return result.data as GSheetProduct[];
    },
  });

  const { data: AccessoriesProducts, isLoading: isAccessoriesLoading } =
    useQuery({
      queryKey: ["products-by-accessories"],
      queryFn: async () => {
        const response = await fetch(
          `${API_URL}/products/category/accessories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products by category");
        }
        const result = await response.json();
        return result.data as GSheetProduct[];
      },
    });
  return {
    FootwearProducts,
    isFootwearLoading,
    ApparelProducts,
    isApparelLoading,
    AccessoriesProducts,
    isAccessoriesLoading,
  };
}
