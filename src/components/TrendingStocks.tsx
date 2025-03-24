import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import StockCard from './StockCard';

interface TrendingStocksProps {
  stocks: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    volume: string;
  }[];
}

const TrendingStocks: React.FC<TrendingStocksProps> = ({ stocks }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Stocks</h2>
          <button className="flex items-center text-primary hover:underline">
            View All <FaArrowRight className="ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stocks.map((stock, index) => (
            <StockCard
              key={index}
              symbol={stock.symbol}
              name={stock.name}
              price={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
              volume={stock.volume}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingStocks;
