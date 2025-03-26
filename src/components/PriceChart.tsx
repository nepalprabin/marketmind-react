import React from 'react';
import YahooFinanceChart from './YahooFinanceChart';

interface PriceChartProps {
  symbol: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ symbol }) => {
  const [timeframe, setTimeframe] = React.useState<string>('1M');
  const [showIndicators, setShowIndicators] = React.useState<boolean>(false);
  
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'];
  
  // Map timeframe to Yahoo Finance range parameter
  const getRange = () => {
    switch(timeframe) {
      case '1D': return '1d';
      case '1W': return '5d';
      case '1M': return '1mo';
      case '3M': return '3mo';
      case '6M': return '6mo';
      case '1Y': return '1y';
      case '5Y': return '5y';
      default: return '1mo';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Price Chart</h2>
        <div className="flex items-center">
          <div className="mr-4">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="mr-2"
                checked={showIndicators}
                onChange={() => setShowIndicators(!showIndicators)}
              />
              <span>Technical Indicators</span>
            </label>
          </div>
          <div className="flex border rounded overflow-hidden">
            {timeframes.map((tf) => (
              <button
                key={tf}
                className={`px-3 py-1 text-sm ${timeframe === tf ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Use the YahooFinanceChart component to fetch and display chart data */}
      <YahooFinanceChart 
        symbol={symbol} 
        interval="1d" 
        range={getRange()} 
      />
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-gray-500 text-sm">Open</p>
          <p className="font-medium">${(Math.random() * 10 + 170).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">High</p>
          <p className="font-medium">${(Math.random() * 10 + 175).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Low</p>
          <p className="font-medium">${(Math.random() * 10 + 165).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Close</p>
          <p className="font-medium">${(Math.random() * 10 + 170).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
