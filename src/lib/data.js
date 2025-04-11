// Mock data for products
const products = [
  {
    id: "1",
    name: "Premium Coffee Maker",
    description: "A high-quality coffee maker that brews perfect coffee every time.",
    price: 149.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwbWFrZXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    inStock: true,
    featured: true
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "A comfortable and adjustable office chair for long working hours.",
    price: 249.00,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1560343090-f04029e03d9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    inStock: true,
    featured: true
  },
  {
    id: "3",
    name: "Stylish Leather Jacket",
    description: "A classic leather jacket that adds a touch of style to any outfit.",
    price: 199.50,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1585487000160-6405e67ff015?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxlYXRoZXIlMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D",
    rating: 4.2,
    inStock: true,
    featured: false
  },
  {
    id: "4",
    name: "Modern Wall Art",
    description: "A beautiful piece of wall art to enhance your home decor.",
    price: 79.00,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1558732133-e57a99c15719?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdhbGwlMjBhcnR8ZW58MHx8MHx8fDA%3D",
    rating: 4.0,
    inStock: true,
    featured: false
  },
  {
    id: "5",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 129.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583394842265-1c3da6c64abb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.6,
    inStock: true,
    featured: true
  },
  {
    id: "6",
    name: "Minimalist Wooden Desk",
    description: "A sleek and minimalist wooden desk for your home office.",
    price: 299.00,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1518455025211-8e42cd45d8fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29vZGVuJTIwZGVza3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.3,
    inStock: true,
    featured: false
  },
  {
    id: "7",
    name: "Summer Floral Dress",
    description: "A beautiful floral dress perfect for summer outings.",
    price: 89.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1562157873-9f60b767e240?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1bW1lciUyMGZsb3JhbCUyMGRyZXNzfGVufDB8fDB8fHww",
    rating: 4.7,
    inStock: true,
    featured: false
  },
  {
    id: "8",
    name: "Abstract Ceramic Vase",
    description: "A unique ceramic vase to complement your home decor.",
    price: 59.00,
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1584272991544-99e84942a848?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZhc2V8ZW58MHx8MHx8fDA%3D",
    rating: 4.1,
    inStock: true,
    featured: false
  }
];

// Function to get all products
export const getProducts = () => {
  return products;
};

// Function to get a product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id) || null;
};

// Function to get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Function to get products by category
export const getProductsByCategory = (category) => {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
};

// Function to search products
export const searchProducts = (query) => {
  if (!query) {
    return products;
  }
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) || 
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    product.category.toLowerCase().includes(lowerCaseQuery)
  );
};
