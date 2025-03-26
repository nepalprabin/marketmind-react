import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the proxy URL
const PROXY_URL = 'http://localhost:3000';

interface ChartProps {
  symbol: string;
  interval?: string;
  range?: string;
}

const YahooFinanceChart: React.FC<ChartProps> = ({ 
  symbol, 
  interval = '1d', 
  range = '1mo' 
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        
        // Use the proxy server instead of direct Yahoo Finance API call
        const response = await axios.get(`${PROXY_URL}/api/yahoo-finance/chart`, {
          params: {
            symbol,
            interval,
            range,
            includePrePost: 'false',
            events: 'div,split'
          }
        });
        
        setChartData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data. Please try again later.');
        setLoading(false);
      }
    };

    fetchChartData();
  }, [symbol, interval, range]);

  if (loading) {
    return <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">Loading chart data...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>;
  }

  // For demonstration purposes, just show that we received data
  return (
    <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-2">Chart data loaded for {symbol} - {range} range</p>
        <p className="text-gray-400 text-sm">Interval: {interval}</p>
        {chartData && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Data successfully fetched through proxy server</p>
            <p>Points: {chartData.chart?.result?.[0]?.timestamp?.length || 0}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YahooFinanceChart;
