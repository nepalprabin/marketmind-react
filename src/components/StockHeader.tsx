import React from 'react';

interface StockHeaderProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketStatus: 'open' | 'closed';
  lastUpdated: string;
}

const StockHeader: React.FC<StockHeaderProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume,
  marketStatus,
  lastUpdated
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-dark text-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{name} ({symbol})</h1>
          <p className="text-gray-400 text-sm">
            {marketStatus === 'open' ? (
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
                Market Open
              </span>
            ) : (
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                Market Closed
              </span>
            )}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex items-center">
            <span className="text-3xl md:text-4xl font-bold">${price.toFixed(2)}</span>
            <div className={`ml-3 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-lg font-medium">{isPositive ? '+' : ''}{change.toFixed(2)}</span>
              <span className="text-lg ml-1">({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center">
        <div className="bg-dark/70 p-3 rounded">
          <p className="text-gray-400 text-sm">Volume</p>
          <p className="text-lg font-medium">{volume}</p>
        </div>
        <div className="bg-dark/70 p-3 rounded">
          <p className="text-gray-400 text-sm">Day Range</p>
          <p className="text-lg font-medium">${(price - Math.random() * 5).toFixed(2)} - ${(price + Math.random() * 5).toFixed(2)}</p>
        </div>
        <div className="bg-dark/70 p-3 rounded">
          <p className="text-gray-400 text-sm">52 Week Range</p>
          <p className="text-lg font-medium">${(price - Math.random() * 30).toFixed(2)} - ${(price + Math.random() * 30).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default StockHeader;
