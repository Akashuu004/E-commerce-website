
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  inStock: boolean;
  rating: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Smart Watch Series 5",
    description: "Track your fitness goals, receive notifications, and more with this premium smartwatch.",
    price: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
    featured: true,
    inStock: true,
    rating: 4.6
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    description: "Comfortable and adjustable office chair perfect for long working hours.",
    price: 199.99,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D",
    featured: false,
    inStock: true,
    rating: 4.5
  },
  {
    id: "4",
    name: "Professional Camera Kit",
    description: "High-resolution camera with multiple lenses for professional photography.",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    featured: true,
    inStock: true,
    rating: 4.9
  },
  {
    id: "5",
    name: "Minimalist Desk Lamp",
    description: "Elegant desk lamp with adjustable brightness and color temperature.",
    price: 89.99,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1507643179773-3e975d7ac515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFtcHxlbnwwfHwwfHx8MA%3D%3D",
    featured: false,
    inStock: true,
    rating: 4.3
  },
  {
    id: "6",
    name: "Leather Messenger Bag",
    description: "Handcrafted leather messenger bag with multiple compartments.",
    price: 149.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fHww",
    featured: false,
    inStock: true,
    rating: 4.7
  },
  {
    id: "7",
    name: "Premium Coffee Maker",
    description: "Automatic coffee maker with built-in grinder and multiple brewing options.",
    price: 199.99,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1525103504173-8dc1582c7430?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D",
    featured: true,
    inStock: true,
    rating: 4.6
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    description: "Fast-charging wireless pad compatible with all Qi-enabled devices.",
    price: 49.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583394810633-33159443eea1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    featured: false,
    inStock: true,
    rating: 4.4
  }
];

export const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Fashion",
  "Kitchen",
  "Home Decor"
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}
