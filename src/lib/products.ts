import { OldProduct } from "./db";

export const products: OldProduct[] = [
  // T-Shirts
  // {
  //   id: "tshirt-001",
  //   name: "Essential",
  //   description:
  //     "Our signature crew neck tee crafted from premium organic cotton. Perfect for layering or wearing solo.",
  //   price: 29.99,
  //   originalPrice: 39.99,
  //   category: "apparel",
  //   subcategory: "t-shirts",
  //   brand: "Minimal Co.",
  //   images: [
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
  //   ],
  //   colors: ["Black", "White", "Gray", "Navy"],
  //   sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  //   inStock: true,
  //   featured: true,
  //   rating: 4.8,
  //   reviewCount: 124,
  //   tags: ["organic", "basic", "versatile"],
  // },
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f5a0b79-653c-4bee-bcb0-f611dd3c11e6/WMNS+NIKE+FIELD+GENERAL.png",
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
