
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { products, categories, searchProducts, getProductsByCategory } from '@/lib/data';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Get filter values from URL params
  const initialCategory = queryParams.get('category') || 'All';
  const initialSearch = queryParams.get('search') || '';
  const initialMinPrice = Number(queryParams.get('minPrice')) || 0;
  const initialMaxPrice = Number(queryParams.get('maxPrice')) || 1500;
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Update filters when URL params change
  useEffect(() => {
    setSelectedCategory(queryParams.get('category') || 'All');
    setSearchQuery(queryParams.get('search') || '');
    setPriceRange([
      Number(queryParams.get('minPrice')) || 0,
      Number(queryParams.get('maxPrice')) || 1500
    ]);
  }, [location.search]);
  
  // Apply filters and update URL
  useEffect(() => {
    // Start with products by category
    let filtered = selectedCategory ? getProductsByCategory(selectedCategory) : products;
    
    // Apply search filter if present
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
      // Also filter by category if one is selected
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
    }
    
    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
    
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 1500) params.set('maxPrice', priceRange[1].toString());
    
    const newSearch = params.toString();
    if (location.search !== `?${newSearch}`) {
      navigate({
        pathname: location.pathname,
        search: newSearch ? `?${newSearch}` : ""
      }, { replace: true });
    }
  }, [selectedCategory, searchQuery, priceRange, navigate]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange([0, 1500]);
  };
  
  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '' || priceRange[0] > 0 || priceRange[1] < 1500;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 shrink-0">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`block w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 1500]}
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={1500}
                      step={10}
                      onValueChange={handlePriceChange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">All Products</h1>
                <SearchInput
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  className="sm:max-w-xs"
                />
              </div>
              
              {/* Results Summary */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} 
                  {filteredProducts.length === 1 ? ' product' : ' products'}
                  {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                </p>
                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    {selectedCategory !== 'All' && (
                      <div className="bg-secondary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <span>{selectedCategory}</span>
                        <button 
                          onClick={() => setSelectedCategory('All')}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                    {searchQuery && (
                      <div className="bg-secondary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <span>"{searchQuery}"</span>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Product Grid */}
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
