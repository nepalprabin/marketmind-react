import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StockHeader from '../components/StockHeader';
import PriceChart from '../components/PriceChart';
import CompanyOverview from '../components/CompanyOverview';
import FundamentalTabs from '../components/FundamentalTabs';
import EarningsChart from '../components/EarningsChart';
import CompanyInfo from '../components/CompanyInfo';
import { StockService } from '../services/StockService';
import Navbar from '../components/Navbar';

const StockDetailPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [stockData, setStockData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        setLoading(true);
        if (symbol) {
          const data = await StockService.getStockDetails(symbol);
          setStockData(data);
        }
      } catch (err) {
        setError('Failed to load stock data. Please try again later.');
        console.error('Error fetching stock data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStockData();
  }, [symbol]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-dark h-48 rounded-lg mb-6"></div>
          <div className="bg-white h-80 rounded-lg mb-6"></div>
          <div className="bg-white h-64 rounded-lg mb-6"></div>
          <div className="bg-white h-96 rounded-lg mb-6"></div>
          <div className="bg-white h-80 rounded-lg mb-6"></div>
          <div className="bg-white h-64 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }
  
  if (!stockData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">No data available!</strong>
          <span className="block sm:inline"> Could not find data for symbol: {symbol}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
    <div className="container mx-auto px-4 py-8">
      <StockHeader 
        symbol={stockData.symbol}
        name={stockData.name}
        price={stockData.price}
        change={stockData.change}
        changePercent={stockData.changePercent}
        volume={stockData.volume}
        marketStatus={stockData.marketStatus}
        lastUpdated={stockData.lastUpdated}
      />
      
      <PriceChart symbol={stockData.symbol} />
      
      <CompanyOverview 
        marketCap={stockData.marketCap}
        peRatio={stockData.peRatio}
        eps={stockData.eps}
        beta={stockData.beta}
        dividendYield={stockData.dividendYield}
        averageVolume={stockData.averageVolume}
        high52Week={stockData.high52Week}
        low52Week={stockData.low52Week}
        industry={stockData.industry}
        sector={stockData.sector}
      />
      
      <FundamentalTabs symbol={stockData.symbol} />
      
      <EarningsChart symbol={stockData.symbol} />
      
      <CompanyInfo 
        symbol={stockData.symbol}
        description={stockData.description}
        ceo={stockData.ceo}
        founded={stockData.founded}
        headquarters={stockData.headquarters}
        employees={stockData.employees}
        website={stockData.website}
      />
    </div>
    </div>
  );
};

export default StockDetailPage;
