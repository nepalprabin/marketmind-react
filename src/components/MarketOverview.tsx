import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface MarketOverviewProps {
  markets: {
    name: string;
    value: string;
    change: number;
    changePercent: number;
  }[];
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ markets }) => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {markets.map((market, index) => {
            const isPositive = market.change >= 0;
            
            return (
              <div key={index} className="card border-l-4 border-primary">
                <h3 className="font-bold text-lg">{market.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold">{market.value}</span>
                  <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                    <span>{isPositive ? '+' : ''}{market.change.toFixed(2)}</span>
                    <span className="ml-1">({market.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
