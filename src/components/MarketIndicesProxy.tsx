import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the proxy URL
const PROXY_URL = 'http://localhost:3000';

interface MarketIndicesProps {
  onDataLoaded?: (data: any) => void;
}

const MarketIndicesProxy: React.FC<MarketIndicesProps> = ({ onDataLoaded }) => {
  const [indicesData, setIndicesData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketIndices = async () => {
      try {
        setLoading(true);
        
        // Use the proxy server to fetch market indices
        const response = await axios.get(`${PROXY_URL}/api/market-indices`);
        
        setIndicesData(response.data);
        if (onDataLoaded) {
          onDataLoaded(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching market indices:', err);
        setError('Failed to load market indices. Please try again later.');
        setLoading(false);
      }
    };

    fetchMarketIndices();
  }, [onDataLoaded]);

  if (loading) {
    return <div className="text-center p-4">Loading market indices...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>;
  }

  // For demonstration purposes, just show that we received data
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="font-bold mb-2">Market Indices Data Loaded</h3>
      <p className="text-sm text-gray-600">Successfully fetched market indices through proxy server</p>
      {indicesData && (
        <div className="mt-2 text-xs text-gray-500">
          <p>Indices loaded: {Object.keys(indicesData).length}</p>
        </div>
      )}
    </div>
  );
};

export default MarketIndicesProxy;
