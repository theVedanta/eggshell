export interface Product {
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

const sample_image_url =
    "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/4MST2734-02_1_fb49cb4f-614f-4d9b-8995-3a8f55ca46b2.jpg?v=1748541298&quality=50";

export const categories: Category[] = [
    {
        id: "apparel",
        name: "Apparel",
        description: "Modern clothing for every occasion",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
        subcategories: ["t-shirts", "hoodies", "shirts", "jackets", "pants"],
    },
    {
        id: "accessories",
        name: "Accessories",
        description: "Complete your look with premium accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop",
        subcategories: ["bags", "wallets", "belts", "hats", "sunglasses"],
    },
    {
        id: "footwear",
        name: "Footwear",
        description: "Step up your style with our footwear collection",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop",
        subcategories: ["sneakers", "boots", "sandals", "formal", "casual"],
    },
    {
        id: "jewellery",
        name: "Jewellery",
        description: "Elegant pieces to elevate your style",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=300&fit=crop",
        subcategories: [
            "necklaces",
            "rings",
            "earrings",
            "bracelets",
            "watches",
        ],
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
        logo: "https://via.placeholder.com/150x75/f5f5f5/333333?text=Minimal+Co",
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

export const products: Product[] = [
    // T-Shirts
    {
        id: "tshirt-001",
        name: "Essential Crew Neck Tee",
        description:
            "Our signature crew neck tee crafted from premium organic cotton. Perfect for layering or wearing solo.",
        price: 29.99,
        originalPrice: 39.99,
        category: "apparel",
        subcategory: "t-shirts",
        brand: "Minimal Co.",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop",
        ],
        colors: ["Black", "White", "Gray", "Navy"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: true,
        rating: 4.8,
        reviewCount: 124,
        tags: ["organic", "basic", "versatile"],
    },
    {
        id: "tshirt-002",
        name: "Graphic Statement Tee",
        description:
            "Bold graphic tee that makes a statement. Comfortable fit with artistic design.",
        price: 34.99,
        category: "apparel",
        subcategory: "t-shirts",
        brand: "Urban Edge",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1583743814966-8936f37f4fc3?w=500&h=600&fit=crop",
        ],
        colors: ["Black", "White", "Olive"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.6,
        reviewCount: 89,
        tags: ["graphic", "streetwear", "cotton"],
    },

    // Hoodies
    {
        id: "hoodie-001",
        name: "Oversized Comfort Hoodie",
        description:
            "Ultra-soft fleece hoodie with relaxed fit. Perfect for cozy days and casual outings.",
        price: 79.99,
        originalPrice: 99.99,
        category: "apparel",
        subcategory: "hoodies",
        brand: "Comfort Zone",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
        ],
        colors: ["Charcoal", "Cream", "Forest Green"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: true,
        rating: 4.9,
        reviewCount: 156,
        tags: ["fleece", "oversized", "comfort"],
    },

    // Jackets
    {
        id: "jacket-001",
        name: "Modern Denim Jacket",
        description:
            "Classic denim jacket reimagined with modern cuts and premium denim.",
        price: 129.99,
        category: "apparel",
        subcategory: "jackets",
        brand: "Classic Heritage",
        images: [
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&h=600&fit=crop",
        ],
        colors: ["Indigo", "Black", "Light Wash"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        featured: true,
        rating: 4.7,
        reviewCount: 78,
        tags: ["denim", "classic", "versatile"],
    },

    // Sneakers
    {
        id: "sneaker-001",
        name: "Minimalist Low-Top Sneakers",
        description:
            "Clean, minimalist sneakers crafted from premium leather. Perfect for everyday wear.",
        price: 149.99,
        category: "footwear",
        subcategory: "sneakers",
        brand: "Minimal Co.",
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=600&fit=crop",
        ],
        colors: ["White", "Black", "Gray"],
        sizes: [
            "7",
            "7.5",
            "8",
            "8.5",
            "9",
            "9.5",
            "10",
            "10.5",
            "11",
            "11.5",
            "12",
        ],
        inStock: true,
        featured: true,
        rating: 4.8,
        reviewCount: 203,
        tags: ["leather", "minimalist", "comfortable"],
    },
    {
        id: "sneaker-002",
        name: "Urban Runner Sneakers",
        description:
            "High-performance sneakers designed for city life. Comfort meets street style.",
        price: 179.99,
        category: "footwear",
        subcategory: "sneakers",
        brand: "Urban Edge",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
        ],
        colors: ["Black/White", "Navy/Orange", "Gray/Blue"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        featured: false,
        rating: 4.6,
        reviewCount: 145,
        tags: ["performance", "streetwear", "running"],
    },

    // Boots
    {
        id: "boot-001",
        name: "Heritage Leather Boots",
        description:
            "Handcrafted leather boots with timeless appeal. Built to last with premium materials.",
        price: 299.99,
        category: "footwear",
        subcategory: "boots",
        brand: "Classic Heritage",
        images: [
            "https://images.unsplash.com/photo-1520256862855-398228c41684?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1608256246200-53e8b47b859f?w=500&h=600&fit=crop",
        ],
        colors: ["Brown", "Black", "Tan"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        inStock: true,
        featured: true,
        rating: 4.9,
        reviewCount: 87,
        tags: ["leather", "handcrafted", "heritage"],
    },

    // Bags
    {
        id: "bag-001",
        name: "Leather Messenger Bag",
        description:
            "Professional messenger bag crafted from full-grain leather. Perfect for work or travel.",
        price: 199.99,
        originalPrice: 249.99,
        category: "accessories",
        subcategory: "bags",
        brand: "Luxe Craft",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop",
        ],
        colors: ["Brown", "Black", "Cognac"],
        sizes: ["One Size"],
        inStock: true,
        featured: true,
        rating: 4.7,
        reviewCount: 112,
        tags: ["leather", "professional", "durable"],
    },
    {
        id: "bag-002",
        name: "Canvas Tote Bag",
        description:
            "Versatile canvas tote with leather accents. Perfect for everyday use.",
        price: 59.99,
        category: "accessories",
        subcategory: "bags",
        brand: "Minimal Co.",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop",
        ],
        colors: ["Natural", "Black", "Navy"],
        sizes: ["One Size"],
        inStock: true,
        featured: false,
        rating: 4.5,
        reviewCount: 64,
        tags: ["canvas", "versatile", "everyday"],
    },

    // Wallets
    {
        id: "wallet-001",
        name: "Minimalist Bifold Wallet",
        description:
            "Sleek bifold wallet with RFID protection. Holds cards and cash without bulk.",
        price: 79.99,
        category: "accessories",
        subcategory: "wallets",
        brand: "Minimal Co.",
        images: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop",
            sample_image_url,
        ],
        colors: ["Black", "Brown", "Navy"],
        sizes: ["One Size"],
        inStock: true,
        featured: false,
        rating: 4.6,
        reviewCount: 98,
        tags: ["RFID", "minimal", "leather"],
    },

    // Watches
    {
        id: "watch-001",
        name: "Classic Automatic Watch",
        description:
            "Elegant automatic watch with Swiss movement. Timeless design meets modern precision.",
        price: 599.99,
        originalPrice: 799.99,
        category: "jewellery",
        subcategory: "watches",
        brand: "Classic Heritage",
        images: [
            "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=600&fit=crop",
        ],
        colors: ["Silver", "Gold", "Black"],
        sizes: ["One Size"],
        inStock: true,
        featured: true,
        rating: 4.9,
        reviewCount: 45,
        tags: ["automatic", "swiss", "luxury"],
    },

    // Necklaces
    {
        id: "necklace-001",
        name: "Minimalist Chain Necklace",
        description:
            "Delicate sterling silver chain necklace. Perfect for layering or wearing alone.",
        price: 89.99,
        category: "jewellery",
        subcategory: "necklaces",
        brand: "Luxe Craft",
        images: [
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop",
        ],
        colors: ["Silver", "Gold"],
        sizes: ['16"', '18"', '20"'],
        inStock: true,
        featured: false,
        rating: 4.7,
        reviewCount: 73,
        tags: ["sterling silver", "minimalist", "layering"],
    },

    // Rings
    {
        id: "ring-001",
        name: "Signet Ring",
        description:
            "Modern take on the classic signet ring. Crafted from premium metals.",
        price: 149.99,
        category: "jewellery",
        subcategory: "rings",
        brand: "Luxe Craft",
        images: [
            "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=600&fit=crop",
            sample_image_url,
        ],
        colors: ["Silver", "Gold", "Black"],
        sizes: ["6", "7", "8", "9", "10", "11"],
        inStock: true,
        featured: true,
        rating: 4.8,
        reviewCount: 56,
        tags: ["signet", "modern", "premium"],
    },

    // Sunglasses
    {
        id: "sunglasses-001",
        name: "Classic Aviator Sunglasses",
        description:
            "Timeless aviator sunglasses with UV protection. A wardrobe essential.",
        price: 129.99,
        category: "accessories",
        subcategory: "sunglasses",
        brand: "Classic Heritage",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop",
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop",
        ],
        colors: ["Gold/Brown", "Silver/Gray", "Black/Black"],
        sizes: ["One Size"],
        inStock: true,
        featured: false,
        rating: 4.6,
        reviewCount: 91,
        tags: ["aviator", "UV protection", "classic"],
    },
];

export const ad_products = [
    {
        id: "sunglasses-001",
        name: "Classic Aviator Sunglasses",
        images: ["/assets/sample/ad.png"],
    },
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter((product) => product.category === categoryId);
};

export const getProductsBySubcategory = (subcategory: string): Product[] => {
    return products.filter((product) => product.subcategory === subcategory);
};

export const getProductsByBrand = (brandName: string): Product[] => {
    return products.filter((product) => product.brand === brandName);
};

export const getFeaturedProducts = (): Product[] => {
    return products.filter((product) => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
        (product) =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description.toLowerCase().includes(lowercaseQuery) ||
            product.tags.some((tag) =>
                tag.toLowerCase().includes(lowercaseQuery)
            ) ||
            product.brand.toLowerCase().includes(lowercaseQuery)
    );
};

export const getRelatedProducts = (
    productId: string,
    limit: number = 4
): Product[] => {
    const product = getProductById(productId);
    if (!product) return [];

    const related = products.filter(
        (p) =>
            p.id !== productId &&
            (p.category === product.category || p.brand === product.brand)
    );

    return related.slice(0, limit);
};
