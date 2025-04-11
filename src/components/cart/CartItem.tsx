
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/data';

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-border">
      <div className="w-24 h-24 overflow-hidden rounded bg-secondary flex-shrink-0">
        <Link to={`/products/${item.id}`}>
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <Link 
              to={`/products/${item.id}`}
              className="font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground">{item.category}</p>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <p className="font-semibold">${item.price.toFixed(2)}</p>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground">
                ${item.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleDecrease}
            >
              <Minus size={14} />
            </Button>
            <span className="mx-3 w-6 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleIncrease}
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash size={16} className="mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
