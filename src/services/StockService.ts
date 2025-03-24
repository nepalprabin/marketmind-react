// Base API URL would be used in a real app
// import axios from 'axios';
// const API_URL = 'https://api.example.com';

// Types
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: number;
  changePercent: number;
}

export interface EarningsEvent {
  symbol: string;
  name: string;
  date: string;
  time: 'before' | 'after' | 'during';
  eps: {
    estimate: number;
    actual?: number;
    surprise?: number;
  };
}

// API service
const StockService = {
  // Get trending stocks
  getTrendingStocks: async (): Promise<Stock[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/stocks/trending`);
      // return response.data;
      
      // Mock data for now
      return [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175.34, change: 2.45, changePercent: 1.42, volume: '32.5M' },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 425.22, change: 5.67, changePercent: 1.35, volume: '28.1M' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 152.87, change: -1.23, changePercent: -0.80, volume: '18.7M' },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 182.75, change: 3.21, changePercent: 1.79, volume: '25.3M' },
        { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.34, change: -7.89, changePercent: -4.31, volume: '45.2M' },
        { symbol: 'META', name: 'Meta Platforms, Inc.', price: 485.39, change: 10.25, changePercent: 2.16, volume: '22.8M' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 925.63, change: 15.78, changePercent: 1.73, volume: '38.4M' },
        { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.45, change: -2.34, changePercent: -1.17, volume: '15.6M' }
      ];
    } catch (error) {
      console.error('Error fetching trending stocks:', error);
      throw error;
    }
  },

  // Get market indices
  getMarketIndices: async (): Promise<MarketIndex[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/markets/indices`);
      // return response.data;
      
      // Mock data for now
      return [
        { name: 'S&P 500', value: '5,563.98', change: 12.34, changePercent: 0.22 },
        { name: 'NASDAQ', value: '17,480.84', change: 57.62, changePercent: 0.33 },
        { name: 'DOW', value: '38,239.98', change: -45.12, changePercent: -0.12 },
        { name: 'BTC/USD', value: '$65,821.52', change: -1103.45, changePercent: -1.65 }
      ];
    } catch (error) {
      console.error('Error fetching market indices:', error);
      throw error;
    }
  },

  // Get earnings calendar for a specific week
  getEarningsCalendar: async (_week: string): Promise<Record<number, EarningsEvent[]>> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/earnings/calendar?week=${week}`);
      // return response.data;
      
      // Mock data for now
      return {
        24: [
          { symbol: 'LUNR', name: 'Lunar Industries', date: '2025-03-24', time: 'before', eps: { estimate: 0.45 } },
          { symbol: 'OKLO', name: 'Oklo Power', date: '2025-03-24', time: 'after', eps: { estimate: -0.12 } }
        ],
        25: [
          { symbol: 'RUM', name: 'Rumble Inc.', date: '2025-03-25', time: 'before', eps: { estimate: 0.32 } },
          { symbol: 'GME', name: 'GameStop Corp.', date: '2025-03-25', time: 'after', eps: { estimate: 0.18 } }
        ],
        26: [
          { symbol: 'CHWY', name: 'Chewy Inc.', date: '2025-03-26', time: 'before', eps: { estimate: 0.15 } },
          { symbol: 'CTAS', name: 'Cintas Corporation', date: '2025-03-26', time: 'before', eps: { estimate: 3.78 } },
          { symbol: 'DLTR', name: 'Dollar Tree Inc.', date: '2025-03-26', time: 'before', eps: { estimate: 2.65 } },
          { symbol: 'PAYX', name: 'Paychex Inc.', date: '2025-03-26', time: 'before', eps: { estimate: 1.12 } },
          { symbol: 'JEF', name: 'Jefferies Financial Group', date: '2025-03-26', time: 'after', eps: { estimate: 0.76 } }
        ],
        27: [
          { symbol: 'BITF', name: 'Bitfarms Ltd.', date: '2025-03-27', time: 'before', eps: { estimate: -0.03 } },
          { symbol: 'LULU', name: 'Lululemon Athletica', date: '2025-03-27', time: 'after', eps: { estimate: 5.42 } },
          { symbol: 'KULR', name: 'KULR Technology Group', date: '2025-03-27', time: 'after', eps: { estimate: -0.04 } }
        ],
        28: []
      };
    } catch (error) {
      console.error('Error fetching earnings calendar:', error);
      throw error;
    }
  },

  // Get earnings feed
  getEarningsFeed: async (): Promise<any[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/earnings/feed`);
      // return response.data;
      
      // Mock data for now
      return [
        {
          id: 1,
          symbol: 'LEN',
          name: 'Lennar Corporation',
          title: 'LEN Q1 2025 Recap',
          summary: 'Lennar Corporation reported strong Q1 2025 results, with revenue of $8.73 billion, up 12% year-over-year, and earnings per share of $2.84, exceeding analyst estimates of $2.56. The homebuilder delivered 16,798 homes during the quarter, a 15% increase from the same period last year, while new orders rose 18% to 19,324 homes.'
        },
        {
          id: 2,
          symbol: 'CCL',
          name: 'Carnival Corporation',
          title: 'Summary of Carnival Corporation\'s Q1 2025 Earnings Call',
          positives: [
            'Strong Financial Performance: Carnival reported record highs in revenue, EBITDA, operating income, and customer deposits for Q1 2025, with net income exceeding guidance by over $170 million.',
            'Yield Improvement: The company achieved a 7.3% yield increase, surpassing previous guidance and building on a 17% improvement from the prior year.'
          ]
        }
      ];
    } catch (error) {
      console.error('Error fetching earnings feed:', error);
      throw error;
    }
  },

  // Search stocks
  searchStocks: async (query: string): Promise<Stock[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/stocks/search?q=${query}`);
      // return response.data;
      
      // Mock data for now - filter the trending stocks based on query
      const mockStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 175.34, change: 2.45, changePercent: 1.42, volume: '32.5M' },
        { symbol: 'MSFT', name: 'Microsoft Corporation', price: 425.22, change: 5.67, changePercent: 1.35, volume: '28.1M' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 152.87, change: -1.23, changePercent: -0.80, volume: '18.7M' },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 182.75, change: 3.21, changePercent: 1.79, volume: '25.3M' },
        { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.34, change: -7.89, changePercent: -4.31, volume: '45.2M' },
        { symbol: 'META', name: 'Meta Platforms, Inc.', price: 485.39, change: 10.25, changePercent: 2.16, volume: '22.8M' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 925.63, change: 15.78, changePercent: 1.73, volume: '38.4M' },
        { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.45, change: -2.34, changePercent: -1.17, volume: '15.6M' }
      ];
      
      return mockStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
        stock.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching stocks:', error);
      throw error;
    }
  }
};

export default StockService;
