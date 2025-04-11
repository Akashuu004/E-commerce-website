
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';

const CartPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const shipping = total > 50 || total === 0 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const orderTotal = total + shipping + tax;
  
  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container-custom max-w-4xl mx-auto text-center">
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex justify-center mb-6">
                <ShoppingBag size={64} className="text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button onClick={() => navigate('/products')}>
                Start Shopping
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container-custom">
          <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={clearCart}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Clear Cart
                  </Button>
                </div>
                
                {/* Cart Item List */}
                <div className="divide-y divide-border">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => navigate('/products')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-card rounded-lg border border-border p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 
                        ? "Free" 
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                {shipping === 0 && total > 0 && (
                  <div className="mt-4 p-3 bg-primary/10 text-primary rounded-md text-sm">
                    You've qualified for free shipping!
                  </div>
                )}
                
                <div className="mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/checkout')}
                  >
                    Checkout <ArrowRight size={16} className="ml-2" />
                  </Button>
                  
                  <div className="mt-4 text-xs text-center text-muted-foreground">
                    Secure checkout powered by Stripe
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
