
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getProductById, getFeaturedProducts } from '@/lib/data';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Heart, Minus, Plus, ChevronLeft, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you are looking for does not exist or has been removed.</p>
            <Button onClick={() => navigate('/products')}>
              View All Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get similar products (in this case, just featured products)
  const similarProducts = getFeaturedProducts().filter(p => p.id !== product.id).slice(0, 4);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-primary">Products</Link>
              <span className="mx-2">/</span>
              <Link to={`/products?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-secondary/30 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {product.category}
                  </span>
                  <div className="ml-auto flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < Math.round(product.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-muted"
                          } 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  {product.price > 100 && (
                    <span className="ml-2 text-sm line-through text-muted-foreground">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm">
                    <Truck size={16} className="mr-2 text-primary" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <RotateCcw size={16} className="mr-2 text-primary" />
                    <span>30-day hassle-free returns</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield size={16} className="mr-2 text-primary" />
                    <span>2-year warranty included</span>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="mx-4 w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={increaseQuantity}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                    >
                      <Heart size={18} className="mr-2" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mb-12">
            <div className="flex border-b border-border">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'specifications'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div>
                  <p className="text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.
                  </p>
                  <ul className="list-disc list-inside mt-4 text-muted-foreground">
                    <li>Premium quality materials</li>
                    <li>Designed for durability and performance</li>
                    <li>Modern and sleek design</li>
                    <li>Multiple color options available</li>
                    <li>Compact and lightweight</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Dimensions</h3>
                      <p className="text-sm text-muted-foreground">L: 10.5 in, W: 8.3 in, H: 3.2 in</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Weight</h3>
                      <p className="text-sm text-muted-foreground">1.2 lbs (0.54 kg)</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Materials</h3>
                      <p className="text-sm text-muted-foreground">Aluminum, Plastic, Silicone</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Warranty</h3>
                      <p className="text-sm text-muted-foreground">2-year limited warranty</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={18} 
                            className={i < Math.round(product.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-muted"
                            } 
                          />
                        ))}
                        <span className="ml-2 text-lg font-medium">{product.rating} out of 5</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Based on 24 reviews</p>
                    </div>
                    <Button>Write a Review</Button>
                  </div>
                  
                  <Separator />
                  
                  {/* Sample Reviews */}
                  {[
                    {
                      name: "Sarah Johnson",
                      rating: 5,
                      date: "May 15, 2023",
                      comment: "Absolutely love this product! It exceeded all my expectations and is worth every penny. The quality is outstanding."
                    },
                    {
                      name: "Michael Chen",
                      rating: 4,
                      date: "April 22, 2023",
                      comment: "Great product overall. The only minor issue I had was with the packaging, but the product itself is excellent."
                    },
                  ].map((review, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-muted"
                            } 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Similar Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
