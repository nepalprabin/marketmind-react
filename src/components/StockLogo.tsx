import React, { useState, useEffect } from 'react';

interface StockLogoProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
}

const StockLogo: React.FC<StockLogoProps> = ({ symbol, size = 'md' }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Size mapping - adjusted for better consistency
  const sizeMap = {
    sm: 'w-6 h-6 min-w-6 min-h-6',
    md: 'w-8 h-8 min-w-8 min-h-8',
    lg: 'w-10 h-10 min-w-10 min-h-10'
  };
  
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // Check cache first
        const cachedLogo = localStorage.getItem(`logo_${symbol}`);
        if (cachedLogo) {
          setLogoUrl(cachedLogo);
          setIsLoading(false);
          return;
        }
        
        // For demo purposes, simulate API response with a placeholder logo
        // In production, this would be a real API call with a valid API key
        // Example of how the API call would be implemented:
        /*
        const response = await fetch(`https://api.api-ninjas.com/v1/logo?ticker=${symbol}`, {
          headers: {
            'X-Api-Key': 'YOUR_API_KEY'
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch logo');
        
        const data = await response.json();
        */
        
        // Simulate successful API response with placeholder logo URL
        const logoUrl = `https://logo.clearbit.com/${symbol.toLowerCase()}.com`;
        setLogoUrl(logoUrl);
        localStorage.setItem(`logo_${symbol}`, logoUrl);
        setIsLoading(false);
        return;
      } catch (err) {
        console.error(`Error fetching logo for ${symbol}:`, err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLogo();
  }, [symbol]);
  
  if (isLoading) {
    return (
      <div className={`${sizeMap[size]} bg-gray-200 rounded flex items-center justify-center mr-2 flex-shrink-0`}>
        <div className="animate-pulse bg-gray-300 w-3/4 h-3/4 rounded"></div>
      </div>
    );
  }
  
  if (error || !logoUrl) {
    return (
      <div className={`${sizeMap[size]} bg-blue-500 text-white rounded flex items-center justify-center mr-2 flex-shrink-0`}>
        {symbol.substring(0, 1)}
      </div>
    );
  }
  
  return (
    <div className={`${sizeMap[size]} bg-white rounded overflow-hidden flex items-center justify-center mr-2 flex-shrink-0 border border-gray-200`}>
      <img 
        src={logoUrl} 
        alt={`${symbol} logo`} 
        className="w-full h-full object-contain p-1"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default StockLogo;
