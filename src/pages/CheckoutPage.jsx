
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Check, CreditCard, ChevronRight, Lock } from 'lucide-react';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08; // 8% tax
  const orderTotal = total + shipping + tax;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Order Successful!",
        description: "Your order has been placed successfully.",
      });
      
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your payment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container-custom max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your order by providing your shipping and payment details.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:flex-1">
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="bg-card rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Street Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State / Province
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-3 py-2 pr-10 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <CreditCard size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                        Name on Card
                      </label>
                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                          Expiry Date
                        </label>
                        <input
                          id="expiry"
                          name="expiry"
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                          CVV
                        </label>
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm text-muted-foreground">
                    <Lock size={14} className="mr-2" />
                    <span>Your payment information is encrypted and secure.</span>
                  </div>
                </div>
                
                <div className="mt-6 lg:hidden">
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                    {!loading && <ChevronRight size={16} className="ml-2" />}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="max-h-48 overflow-y-auto mb-4 space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-10 h-10 rounded bg-secondary flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Qty: {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 hidden lg:block">
                  <Button 
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                    {!loading && <ChevronRight size={16} className="ml-2" />}
                  </Button>
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

export default CheckoutPage;
