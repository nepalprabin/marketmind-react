import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaListUl, FaCalendarWeek, FaCalendarDay } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import StockService, { EarningsEvent } from '../services/StockService';

const EarningsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'week' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = useState<string>('MAR 24 - 28');
  const [earningsData, setEarningsData] = useState<Record<number, EarningsEvent[]>>({});
  const [earningsFeed, setEarningsFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data for week days and dates
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const dates = [24, 25, 26, 27, 28];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch earnings calendar data
        const earningsCalendar = await StockService.getEarningsCalendar(currentWeek);
        setEarningsData(earningsCalendar);
        
        // Fetch earnings feed
        const feed = await StockService.getEarningsFeed();
        setEarningsFeed(feed);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching earnings data:', err);
        setError('Failed to load earnings data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [currentWeek]);

  const handlePreviousWeek = () => {
    setCurrentWeek('MAR 17 - 21');
    // This would trigger the useEffect to fetch data for the previous week
  };

  const handleNextWeek = () => {
    setCurrentWeek('MAR 31 - APR 4');
    // This would trigger the useEffect to fetch data for the next week
  };

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      {/* Earnings Header */}
      <div className="bg-dark text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FaCalendarAlt className="text-primary mr-3 text-xl" />
              <h1 className="text-2xl font-bold">EARNINGS THIS WEEK</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePreviousWeek}
                className="bg-dark/50 hover:bg-dark/70 p-2 rounded-full"
              >
                <FaChevronLeft />
              </button>
              
              <div className="bg-dark/50 px-4 py-2 rounded-md">
                <span className="text-sm block text-center">M</span>
                <span className="font-bold block text-center">{currentWeek}</span>
              </div>
              
              <button 
                onClick={handleNextWeek}
                className="bg-dark/50 hover:bg-dark/70 p-2 rounded-full"
              >
                <FaChevronRight />
              </button>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary' : 'bg-dark/50 hover:bg-dark/70'}`}
              >
                <FaListUl />
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={`p-2 rounded ${viewMode === 'week' ? 'bg-primary' : 'bg-dark/50 hover:bg-dark/70'}`}
              >
                <FaCalendarWeek />
              </button>
              <button 
                onClick={() => setViewMode('month')}
                className={`p-2 rounded ${viewMode === 'month' ? 'bg-primary' : 'bg-dark/50 hover:bg-dark/70'}`}
              >
                <FaCalendarDay />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Earnings Calendar - Week View */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-lg h-64"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weekDays.map((day, index) => (
              <div key={day} className="bg-gray-100 rounded-lg overflow-hidden">
                {/* Day Header */}
                <div className="text-center p-4 border-b border-gray-200">
                  <div className="text-gray-600 font-medium">{day}</div>
                  <div className={`text-3xl font-bold inline-flex justify-center items-center w-12 h-12 rounded-full ${dates[index] === 24 ? 'bg-primary text-white' : ''}`}>
                    {dates[index]}
                  </div>
                  <div className="text-xs text-gray-500 uppercase mt-2 font-medium">EARNINGS</div>
                </div>
                
                {/* Before Open */}
                {earningsData[dates[index]]?.filter(e => e.time === 'before').length > 0 && (
                  <div className="p-4 bg-orange-100">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Before Open</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {earningsData[dates[index]]
                        .filter(e => e.time === 'before')
                        .map(earning => (
                          <div key={earning.symbol} className="bg-white p-3 rounded shadow-sm">
                            <div className="flex items-center mb-1">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center mr-2">
                                {earning.symbol.substring(0, 1)}
                              </div>
                              <div className="font-bold">{earning.symbol}</div>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{earning.name}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* After Close */}
                {earningsData[dates[index]]?.filter(e => e.time === 'after').length > 0 && (
                  <div className="p-4 bg-blue-100">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">After Close</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {earningsData[dates[index]]
                        .filter(e => e.time === 'after')
                        .map(earning => (
                          <div key={earning.symbol} className="bg-white p-3 rounded shadow-sm">
                            <div className="flex items-center mb-1">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center mr-2">
                                {earning.symbol.substring(0, 1)}
                              </div>
                              <div className="font-bold">{earning.symbol}</div>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{earning.name}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                
                {/* No Earnings */}
                {(!earningsData[dates[index]] || earningsData[dates[index]].length === 0) && (
                  <div className="p-4 text-center text-gray-500">
                    <div className="border border-gray-200 rounded-md py-3 px-4">
                      No Earnings
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Earnings Feed */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Earnings Feed</h2>
          
          {loading ? (
            <div className="animate-pulse space-y-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-md mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-md">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              {earningsFeed.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className={`w-10 h-10 ${item.symbol === 'LEN' ? 'bg-blue-100' : 'bg-red-100'} rounded-md flex items-center justify-center mr-3`}>
                      <span className={`${item.symbol === 'LEN' ? 'text-blue-600' : 'text-red-600'} font-bold`}>
                        {item.symbol.substring(0, 1)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-gray-500">Generated by AI, may be inaccurate</p>
                    </div>
                  </div>
                  
                  {item.summary && (
                    <>
                      <h4 className="font-bold mb-2">Summary of {item.name}'s First Quarter Earnings</h4>
                      <p className="text-gray-700 mb-4">{item.summary}</p>
                    </>
                  )}
                  
                  {item.positives && (
                    <>
                      <h4 className="font-bold mb-2">Positives:</h4>
                      <ol className="list-decimal list-inside space-y-2 mb-4">
                        {item.positives.map((positive: string, i: number) => (
                          <li key={i} className="text-gray-700">
                            {positive}
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                  
                  <div className="flex justify-end">
                    <button className="text-primary hover:underline text-sm">Read More</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
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

export default EarningsPage;