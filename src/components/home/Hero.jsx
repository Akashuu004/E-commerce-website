
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative bg-accent py-20 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Discover Premium Quality Products
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Explore our curated collection of high-quality products for your lifestyle. 
              Free shipping on orders over $50.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/products')}
                size="lg" 
                className="px-8 rounded-full"
              >
                Shop Now <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button 
                onClick={() => navigate('/about')}
                variant="outline" 
                size="lg" 
                className="px-8 rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"
                alt="Premium products showcase" 
                className="w-full h-[500px] object-cover rounded-lg" 
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full"></div>
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
      {/* Background decorative elements */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-[600px] bg-primary/5 rounded-l-full"></div>
    </section>
  );
};

export default Hero;
