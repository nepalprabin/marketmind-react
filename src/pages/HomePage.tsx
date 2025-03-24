import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MarketOverview from '../components/MarketOverview';
import TrendingStocks from '../components/TrendingStocks';
import { StockService, MarketIndex, Stock } from '../services/StockService';

const HomePage: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketIndex[]>([]);
  const [trendingStocks, setTrendingStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch market indices
        const marketIndices = await StockService.getMarketIndices();
        setMarketData(marketIndices);
        
        // Fetch trending stocks
        const stocks = await StockService.getTrendingStocks();
        setTrendingStocks(stocks);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <HeroSection />
      
      {loading ? (
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      ) : error ? (
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
        </div>
      ) : (
        <>
          <MarketOverview markets={marketData} />
          <TrendingStocks stocks={trendingStocks} />
        </>
      )}
      
      {/* Upcoming Earnings Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Earnings</h2>
            <a href="/earnings" className="text-primary hover:underline flex items-center">
              View Calendar <span className="ml-1">→</span>
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border-r border-gray-200">
                <h3 className="font-bold text-lg mb-2">Today</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">AAPL</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">MSFT</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">GOOGL</span>
                </div>
              </div>
              
              <div className="text-center p-4 border-r border-gray-200">
                <h3 className="font-bold text-lg mb-2">Tomorrow</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">AMZN</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">TSLA</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">META</span>
                </div>
              </div>
              
              <div className="text-center p-4">
                <h3 className="font-bold text-lg mb-2">This Week</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">NVDA</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">JPM</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">+15 more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StockTrader</h3>
              <p className="text-gray-400">
                Your all-in-one platform for stock trading, market analysis, and earnings tracking.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/earnings" className="text-gray-400 hover:text-white">Earnings</a></li>
                <li><a href="/markets" className="text-gray-400 hover:text-white">Markets</a></li>
                <li><a href="/news" className="text-gray-400 hover:text-white">News</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="/disclaimer" className="text-gray-400 hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} StockTrader. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
