import { Product } from "./db";

export const products: Product[] = [
  // T-Shirts
  {
    id: "tshirt-001",
    name: "Essential",
    description:
      "Our signature crew neck tee crafted from premium organic cotton. Perfect for layering or wearing solo.",
    price: 29.99,
    originalPrice: 39.99,
    category: "apparel",
    subcategory: "t-shirts",
    brand: "Minimal Co.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=800&h=800&fit=crop&crop=center",
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
    name: "Expression",
    description:
      "Bold graphic tee that makes a statement. Comfortable fit with artistic design.",
    price: 34.99,
    category: "apparel",
    subcategory: "t-shirts",
    brand: "Urban Edge",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4fc9?w=800&h=800&fit=crop&crop=center",
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
    name: "Cloud",
    description:
      "Ultra-soft fleece hoodie with relaxed fit. Perfect for cozy days and casual outings.",
    price: 79.99,
    originalPrice: 99.99,
    category: "apparel",
    subcategory: "hoodies",
    brand: "Comfort Zone",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&crop=center",
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
    name: "Heritage",
    description:
      "Classic denim jacket reimagined with modern cuts and premium denim.",
    price: 129.99,
    category: "apparel",
    subcategory: "jackets",
    brand: "Classic Heritage",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop&crop=center",
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
    name: "Pure",
    description:
      "Clean, minimalist sneakers crafted from premium leather. Perfect for everyday wear.",
    price: 149.99,
    category: "footwear",
    subcategory: "sneakers",
    brand: "Minimal Co.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&crop=center",
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
    name: "Metro",
    description:
      "High-performance sneakers designed for city life. Comfort meets street style.",
    price: 179.99,
    category: "footwear",
    subcategory: "sneakers",
    brand: "Urban Edge",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop&crop=center",
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
    name: "Artisan",
    description:
      "Handcrafted leather boots with timeless appeal. Built to last with premium materials.",
    price: 299.99,
    category: "footwear",
    subcategory: "boots",
    brand: "Classic Heritage",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1608256246200-53e8b47b9db9?w=800&h=800&fit=crop&crop=center",
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
    name: "Executive",
    description:
      "Professional messenger bag crafted from full-grain leather. Perfect for work or travel.",
    price: 199.99,
    originalPrice: 249.99,
    category: "accessories",
    subcategory: "bags",
    brand: "Luxe Craft",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&h=800&fit=crop&crop=center",
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
    name: "Everyday",
    description:
      "Versatile canvas tote with leather accents. Perfect for everyday use.",
    price: 59.99,
    category: "accessories",
    subcategory: "bags",
    brand: "Minimal Co.",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc92c08b?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Natural", "Black", "Navy"],
    sizes: ["One Size"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 64,
    tags: ["canvas", "versatile", "everyday"],
  },

  // Watches
  {
    id: "watch-001",
    name: "Timekeeper",
    description:
      "Elegant minimalist watch with stainless steel case and leather strap.",
    price: 189.99,
    originalPrice: 229.99,
    category: "accessories",
    subcategory: "watches",
    brand: "Luxe Craft",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Silver", "Gold", "Black"],
    sizes: ["One Size"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 92,
    tags: ["minimalist", "elegant", "leather"],
  },

  // Pants
  {
    id: "pants-001",
    name: "Comfort",
    description:
      "Relaxed fit chinos perfect for casual and semi-formal occasions.",
    price: 69.99,
    category: "apparel",
    subcategory: "pants",
    brand: "Comfort Zone",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 156,
    tags: ["chinos", "casual", "comfortable"],
  },

  // Sunglasses
  {
    id: "sunglasses-001",
    name: "Shield",
    description:
      "Classic aviator sunglasses with UV protection and metal frame.",
    price: 129.99,
    category: "accessories",
    subcategory: "sunglasses",
    brand: "Urban Edge",
    images: [
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Gold", "Silver", "Black"],
    sizes: ["One Size"],
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 73,
    tags: ["aviator", "classic", "UV protection"],
  },

  // Dress Shoes
  {
    id: "dress-shoes-001",
    name: "Formal",
    description:
      "Premium leather oxford shoes for formal occasions and business wear.",
    price: 249.99,
    category: "footwear",
    subcategory: "dress-shoes",
    brand: "Classic Heritage",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Black", "Brown", "Burgundy"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewCount: 134,
    tags: ["formal", "leather", "oxford"],
  },

  // Polo Shirt
  {
    id: "polo-001",
    name: "Classic",
    description:
      "Timeless polo shirt made from breathable cotton pique fabric.",
    price: 49.99,
    category: "apparel",
    subcategory: "polos",
    brand: "Minimal Co.",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594938328870-28be4d78b6c5?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["White", "Navy", "Gray", "Green"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 89,
    tags: ["polo", "classic", "cotton"],
  },

  // Wallet
  {
    id: "wallet-001",
    name: "Slim",
    description: "Minimalist leather wallet with RFID blocking technology.",
    price: 79.99,
    originalPrice: 99.99,
    category: "accessories",
    subcategory: "wallets",
    brand: "Luxe Craft",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 201,
    tags: ["minimalist", "RFID", "leather"],
  },

  // Cardigan
  {
    id: "cardigan-001",
    name: "Cozy",
    description:
      "Soft knit cardigan perfect for layering during cooler weather.",
    price: 89.99,
    category: "apparel",
    subcategory: "cardigans",
    brand: "Comfort Zone",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Cream", "Navy", "Gray", "Burgundy"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 67,
    tags: ["knit", "layering", "soft"],
  },

  // Cap
  {
    id: "cap-001",
    name: "Street",
    description:
      "Classic baseball cap with adjustable strap and embroidered logo.",
    price: 24.99,
    category: "accessories",
    subcategory: "hats",
    brand: "Urban Edge",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Black", "Navy", "White", "Red"],
    sizes: ["One Size"],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviewCount: 145,
    tags: ["baseball", "adjustable", "casual"],
  },

  // Scarf
  {
    id: "scarf-001",
    name: "Elegant",
    description: "Luxurious cashmere scarf for warmth and sophisticated style.",
    price: 149.99,
    originalPrice: 189.99,
    category: "accessories",
    subcategory: "scarves",
    brand: "Luxe Craft",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Charcoal", "Cream", "Navy", "Burgundy"],
    sizes: ["One Size"],
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 82,
    tags: ["cashmere", "luxury", "warm"],
  },

  // Shorts
  {
    id: "shorts-001",
    name: "Summer",
    description:
      "Lightweight cotton shorts perfect for hot weather and casual activities.",
    price: 39.99,
    category: "apparel",
    subcategory: "shorts",
    brand: "Comfort Zone",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1594938328870-28be4d78b6c5?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Khaki", "Navy", "Gray", "White"],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 198,
    tags: ["lightweight", "cotton", "summer"],
  },

  // Athletic Shoes
  {
    id: "athletic-001",
    name: "Runner",
    description:
      "High-performance running shoes with advanced cushioning and breathable mesh upper.",
    price: 159.99,
    originalPrice: 179.99,
    category: "footwear",
    subcategory: "athletic",
    brand: "Urban Edge",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Black/Red", "White/Blue", "Gray/Orange"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
    inStock: true,
    featured: true,
    rating: 4.7,
    reviewCount: 267,
    tags: ["running", "athletic", "performance"],
  },

  // Loafers
  {
    id: "loafer-001",
    name: "Executive",
    description:
      "Sophisticated leather loafers perfect for business casual and formal wear.",
    price: 189.99,
    category: "footwear",
    subcategory: "loafers",
    brand: "Classic Heritage",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Black", "Brown", "Cognac"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    featured: false,
    rating: 4.6,
    reviewCount: 143,
    tags: ["business", "leather", "formal"],
  },

  // Canvas Shoes
  {
    id: "canvas-001",
    name: "Casual",
    description:
      "Classic canvas sneakers with vulcanized rubber sole. Perfect for everyday wear.",
    price: 69.99,
    category: "footwear",
    subcategory: "canvas",
    brand: "Minimal Co.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["White", "Black", "Navy", "Red"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    inStock: true,
    featured: false,
    rating: 4.4,
    reviewCount: 189,
    tags: ["casual", "canvas", "classic"],
  },

  // High-Top Sneakers
  {
    id: "hightop-001",
    name: "Street",
    description:
      "Retro-inspired high-top sneakers with premium leather construction and vintage styling.",
    price: 129.99,
    originalPrice: 149.99,
    category: "footwear",
    subcategory: "high-tops",
    brand: "Urban Edge",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["White/Black", "All Black", "Red/White"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    featured: true,
    rating: 4.5,
    reviewCount: 224,
    tags: ["retro", "streetwear", "high-top"],
  },

  // Sandals
  {
    id: "sandal-001",
    name: "Comfort",
    description:
      "Premium leather sandals with cushioned footbed and adjustable straps for all-day comfort.",
    price: 89.99,
    category: "footwear",
    subcategory: "sandals",
    brand: "Comfort Zone",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1566479179817-0dbc38764ed0?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Brown", "Black", "Tan"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    featured: false,
    rating: 4.3,
    reviewCount: 156,
    tags: ["comfort", "summer", "leather"],
  },

  // Slip-On Shoes
  {
    id: "slipon-001",
    name: "Easy",
    description:
      "Effortless slip-on shoes with elastic panels and cushioned sole for convenience and comfort.",
    price: 79.99,
    category: "footwear",
    subcategory: "slip-ons",
    brand: "Minimal Co.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop&crop=center",
    ],
    colors: ["Black", "Navy", "Gray", "Olive"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    inStock: true,
    featured: false,
    rating: 4.2,
    reviewCount: 178,
    tags: ["convenient", "casual", "slip-on"],
  },
];
