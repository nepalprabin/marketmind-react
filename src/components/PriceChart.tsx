import React, { useState } from 'react';

interface PriceChartProps {
  symbol: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ symbol }) => {
  const [timeframe, setTimeframe] = useState<string>('1M');
  const [showIndicators, setShowIndicators] = useState<boolean>(false);
  
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', '5Y'];
  
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
      
      {/* Placeholder for actual chart */}
      <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Chart for {symbol} - {timeframe} timeframe</p>
          <p className="text-gray-400 text-sm">{showIndicators ? 'With technical indicators' : 'Without technical indicators'}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>In a real implementation, this would be an interactive chart</p>
            <p>using a library like Chart.js, Recharts, or a financial charting library</p>
          </div>
        </div>
      </div>
      
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
