import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaListUl, FaCalendarWeek, FaCalendarDay, FaStar } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import StockLogo from '../components/StockLogo';
import { StockService, EarningsEvent } from '../services/StockService';

const EarningsPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [viewMode, setViewMode] = React.useState<'list' | 'week' | 'month'>('week');
  const [currentWeek, setCurrentWeek] = React.useState<string>('MAR 24 - 28');
  const [earningsData, setEarningsData] = React.useState<Record<number, EarningsEvent[]>>({});
  const [earningsFeed, setEarningsFeed] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filterActive, setFilterActive] = React.useState<boolean>(false);
  
  // Mock data for week days and dates
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const dates = [24, 25, 26, 27, 28];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch earnings calendar data
        const earningsCalendar = await StockService.getEarningsCalendar(currentWeek);
        setEarningsData(earningsCalendar);
        
        // Check if filtering is active (only importance 3 stocks are shown)
        const allEarnings = Object.values(earningsCalendar).flat();
        const hasHighImportance = allEarnings.some(e => e.importance !== undefined && e.importance >= 4);
        const hasImportance3 = allEarnings.some(e => e.importance === 3);
        setFilterActive(!hasHighImportance && hasImportance3);
        
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

  // Helper function to render importance indicator
  const renderImportanceIndicator = (importance?: number) => {
    if (!importance || importance < 3) return null;
    
    return (
      <div className="flex items-center ml-auto">
        <FaStar className="text-yellow-500" />
        {importance > 3 && <FaStar className="text-yellow-500" />}
      </div>
    );
  };

  // Function to navigate to stock details page
  const navigateToStockDetails = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  // Render a clickable stock card
  const renderStockCard = (earning: EarningsEvent) => (
    <div 
      key={earning.symbol} 
      className="bg-white p-3 rounded shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => navigateToStockDetails(earning.symbol)}
    >
      <div className="flex items-center mb-1">
        <StockLogo symbol={earning.symbol} size="md" />
        <div className="font-bold ml-2">{earning.symbol}</div>
        {renderImportanceIndicator(earning.importance)}
      </div>
      <div className="text-xs text-gray-500 truncate">{earning.name}</div>
    </div>
  );

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
              {filterActive && (
                <div className="ml-3 bg-yellow-500 text-dark text-xs px-2 py-1 rounded-full font-bold flex items-center">
                  <FaStar className="mr-1" /> HIGH IMPORTANCE ONLY
                </div>
              )}
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
                        .map(earning => renderStockCard(earning))}
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
                        .map(earning => renderStockCard(earning))}
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
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => navigateToStockDetails(item.symbol)}
                >
                  <div className="flex items-center mb-3">
                    <StockLogo symbol={item.symbol} size="lg" />
                    <div className="ml-3">
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
                          <li key={i} className="text-gray-700">{positive}</li>
                        ))}
                      </ol>
                    </>
                  )}
                  
                  {item.negatives && (
                    <>
                      <h4 className="font-bold mb-2">Negatives:</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {item.negatives.map((negative: string, i: number) => (
                          <li key={i} className="text-gray-700">{negative}</li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
