import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const StockCard: React.FC<StockCardProps> = ({
  symbol,
  name,
  price,
  change,
  changePercent,
  volume
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{symbol}</h3>
          <p className="text-sm text-gray-600 truncate max-w-[200px]">{name}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
          <span className="font-medium">{changePercent.toFixed(2)}%</span>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-end">
        <div>
          <p className="text-2xl font-bold">${price.toFixed(2)}</p>
          <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          <p>Vol: {volume}</p>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
