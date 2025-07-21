import { products } from "./products";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  original_price?: string;
  category: string;
  subcategory: string;
  brand: string;
  sizes: string;
  in_stock: string;
  featured: string;
  tags: string;
  colors: {
    [color: string]: string[];
  };
}

export interface OldProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  brand: string;
  images: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "apparel",
    name: "Apparel",
    description: "Modern clothing for every occasion",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
    subcategories: ["t-shirts", "hoodies", "shirts", "jackets", "pants"],
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Complete your look with premium accessories",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
    subcategories: ["bags", "wallets", "belts", "hats", "sunglasses"],
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Step up your style with our footwear collection",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
    subcategories: ["sneakers", "boots", "sandals", "formal", "casual"],
  },
  {
    id: "jewellery",
    name: "Jewellery",
    description: "Elegant pieces to elevate your style",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
    subcategories: ["necklaces", "rings", "earrings", "bracelets", "watches"],
  },
];

export const brands: Brand[] = [
  {
    id: "urban-edge",
    name: "Urban Edge",
    description: "Contemporary streetwear for the modern individual",
    logo: "https://via.placeholder.com/150x75/333333/ffffff?text=Urban+Edge",
    featured: true,
  },
  {
    id: "minimal-co",
    name: "Minimal Co.",
    description: "Clean, minimalist designs for everyday wear",
    logo: "https://brandlogos.net/wp-content/uploads/2020/03/Adidas-logo-300x300.png",
    featured: true,
  },
  {
    id: "luxe-craft",
    name: "Luxe Craft",
    description: "Premium accessories and jewellery",
    logo: "https://via.placeholder.com/150x75/000000/gold?text=Luxe+Craft",
    featured: true,
  },
  {
    id: "comfort-zone",
    name: "Comfort Zone",
    description: "Comfortable footwear for active lifestyles",
    logo: "https://via.placeholder.com/150x75/4a90e2/ffffff?text=Comfort+Zone",
    featured: false,
  },
  {
    id: "classic-heritage",
    name: "Classic Heritage",
    description: "Timeless pieces with modern touches",
    logo: "https://via.placeholder.com/150x75/8b4513/ffffff?text=Classic+Heritage",
    featured: true,
  },
];

export const ad_products = [
  {
    id: "sunglasses-001",
    name: "Classic Aviator Sunglasses",
    images: ["/assets/sample/ad.png"],
  },
];

export const orders = [
  {
    id: "order-001",
    userId: "user-001",
    items: [
      {
        id: "cartitem-001",
        productId: "tshirt-001",
        name: "Essential Crew Neck Tee",
        price: 29.99,
        image:
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
        color: "Black",
        size: "M",
        quantity: 2,
      },
      {
        id: "cartitem-002",
        productId: "sneaker-001",
        name: "Minimalist Low-Top Sneakers",
        price: 149.99,
        image:
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
        color: "White",
        size: "9",
        quantity: 1,
      },
    ],
    total: 209.97,
    subtotal: 209.97,
    tax: 0,
    shipping: 0,
    discount: 0,
    status: "delivered",
    shippingAddress: {
      id: "address-001",
      type: "shipping",
      firstName: "Vedanta",
      lastName: "Singh",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      phone: "1234567890",
      isDefault: true,
    },
    billingAddress: {
      id: "address-002",
      type: "billing",
      firstName: "Vedanta",
      lastName: "Singh",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      phone: "1234567890",
      isDefault: true,
    },
    paymentMethod: "card",
    trackingNumber: "TRACK123456",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-02T12:00:00Z",
  },
  {
    id: "order-002",
    userId: "user-001",
    items: [
      {
        id: "cartitem-003",
        productId: "bag-001",
        name: "Leather Messenger Bag",
        price: 199.99,
        image:
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
        color: "Brown",
        size: "One Size",
        quantity: 1,
      },
    ],
    total: 199.99,
    subtotal: 199.99,
    tax: 0,
    shipping: 0,
    discount: 0,
    status: "shipped",
    shippingAddress: {
      id: "address-001",
      type: "shipping",
      firstName: "Vedanta",
      lastName: "Singh",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      phone: "1234567890",
      isDefault: true,
    },
    billingAddress: {
      id: "address-002",
      type: "billing",
      firstName: "Vedanta",
      lastName: "Singh",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      phone: "1234567890",
      isDefault: true,
    },
    paymentMethod: "card",
    trackingNumber: "TRACK654321",
    createdAt: "2024-06-03T09:00:00Z",
    updatedAt: "2024-06-03T10:00:00Z",
  },
];

// Helper functions
export const getProductsByCategory = (categoryId: string): OldProduct[] => {
  return products.filter((product) => product.category === categoryId);
};

export const getProductsBySubcategory = (subcategory: string): OldProduct[] => {
  return products.filter((product) => product.subcategory === subcategory);
};

export const getProductsByBrand = (brandName: string): OldProduct[] => {
  return products.filter((product) => product.brand === brandName);
};

export const getFeaturedProducts = (): OldProduct[] => {
  return products.filter((product) => product);
};

export const getProductById = (id: string): OldProduct | undefined => {
  return products.find((product) => product.id === id);
};

export const searchProducts = (query: string): OldProduct[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      product.brand.toLowerCase().includes(lowercaseQuery)
  );
};

export const getRelatedProducts = (
  productId: string,
  limit: number = 4
): OldProduct[] => {
  const product = getProductById(productId);
  if (!product) return [];

  const related = products.filter(
    (p) =>
      p.id !== productId &&
      (p.category === product.category || p.brand === product.brand)
  );

  return related.slice(0, limit);
};
