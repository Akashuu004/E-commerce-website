
import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport is mobile
 * @returns {boolean} isMobile - Whether the viewport is mobile size
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return isMobile;
}
