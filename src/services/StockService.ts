// Base API URL would be used in a real app
import axios from "axios";
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
  time: "before" | "after" | "during";
  eps: {
    estimate: number;
    actual?: number;
    surprise?: number;
  };
}

export interface StockDetails {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketStatus: "open" | "closed";
  lastUpdated: string;
  marketCap: string;
  peRatio: number;
  eps: number;
  beta: number;
  dividendYield: string;
  averageVolume: string;
  high52Week: number;
  low52Week: number;
  industry: string;
  sector: string;
  description: string;
  ceo: string;
  founded: string;
  headquarters: string;
  employees: string;
  website: string;
}

// Helper function to parse week string (e.g., "MAR 24 - 28")
const parseWeekString = (
  week: string
): { startDate: string; endDate: string } => {
  // Default to current week if parsing fails
  const currentYear = new Date().getFullYear();

  // Extract month and dates from the week string
  const regex = /([A-Z]{3})\s+(\d+)\s*-\s*(?:([A-Z]{3})\s+)?(\d+)/i;
  const match = week.match(regex);

  if (!match) {
    // Fallback to current week if parsing fails
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4); // Friday

    return {
      startDate: startOfWeek.toISOString().split("T")[0],
      endDate: endOfWeek.toISOString().split("T")[0],
    };
  }

  const startMonth = match[1];
  const startDay = parseInt(match[2]);
  const endMonth = match[3] || startMonth;
  const endDay = parseInt(match[4]);

  // Map month abbreviation to month number
  const monthMap: Record<string, number> = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };

  const startDate = new Date(
    currentYear,
    monthMap[startMonth.toUpperCase()],
    startDay
  );
  const endDate = new Date(
    currentYear,
    monthMap[endMonth.toUpperCase()],
    endDay
  );

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

// Helper function to determine if earnings are before or after market
const determineEarningsTime = (
  timeString: string
): "before" | "after" | "during" => {
  if (!timeString) return "during";

  const hour = parseInt(timeString.split(":")[0]);

  // Before market hours (before 9:30 AM ET)
  if (hour < 9 || (hour === 9 && parseInt(timeString.split(":")[1]) < 30)) {
    return "before";
  }
  // After market hours (after 4:00 PM ET)
  else if (hour >= 16) {
    return "after";
  }
  // During market hours
  else {
    return "during";
  }
};

// Helper function to transform API data to expected format
const transformEarningsData = (
  apiData: any[]
): Record<number, EarningsEvent[]> => {
  const result: Record<number, EarningsEvent[]> = {};

  apiData.forEach((item) => {
    if (!item.earningsDate) return;

    // Extract day from the date
    const day = parseInt(item.earningsDate.split("-")[2]);

    // Initialize array for this day if it doesn't exist
    if (!result[day]) {
      result[day] = [];
    }

    // Transform API item to EarningsEvent format
    const earningsEvent: EarningsEvent = {
      symbol: item.symbol,
      name: item.assetName || `${item.symbol} Inc.`,
      date: item.earningsDate,
      time: determineEarningsTime(item.earningsTime),
      eps: {
        estimate: item.epsEstimate || 0,
        actual: item.epsActual,
        surprise: item.epsSurprise,
      },
    };

    result[day].push(earningsEvent);
  });

  return result;
};

// API service
export const StockService = {
  // Get trending stocks
  getTrendingStocks: async (): Promise<Stock[]> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/stocks/trending`);
      // return response.data;

      // Mock data for now
      return [
        {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 175.34,
          change: 2.45,
          changePercent: 1.42,
          volume: "32.5M",
        },
        {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          price: 425.22,
          change: 5.67,
          changePercent: 1.35,
          volume: "28.1M",
        },
        {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          price: 152.87,
          change: -1.23,
          changePercent: -0.8,
          volume: "18.7M",
        },
        {
          symbol: "AMZN",
          name: "Amazon.com, Inc.",
          price: 182.75,
          change: 3.21,
          changePercent: 1.79,
          volume: "25.3M",
        },
        {
          symbol: "TSLA",
          name: "Tesla, Inc.",
          price: 175.34,
          change: -7.89,
          changePercent: -4.31,
          volume: "45.2M",
        },
        {
          symbol: "META",
          name: "Meta Platforms, Inc.",
          price: 485.39,
          change: 10.25,
          changePercent: 2.16,
          volume: "22.8M",
        },
        {
          symbol: "NVDA",
          name: "NVIDIA Corporation",
          price: 925.63,
          change: 15.78,
          changePercent: 1.73,
          volume: "38.4M",
        },
        {
          symbol: "JPM",
          name: "JPMorgan Chase & Co.",
          price: 198.45,
          change: -2.34,
          changePercent: -1.17,
          volume: "15.6M",
        },
      ];
    } catch (error) {
      console.error("Error fetching trending stocks:", error);
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
        {
          name: "S&P 500",
          value: "5,563.98",
          change: 12.34,
          changePercent: 0.22,
        },
        {
          name: "NASDAQ",
          value: "17,480.84",
          change: 57.62,
          changePercent: 0.33,
        },
        {
          name: "DOW",
          value: "38,239.98",
          change: -45.12,
          changePercent: -0.12,
        },
        {
          name: "BTC/USD",
          value: "$65,821.52",
          change: -1103.45,
          changePercent: -1.65,
        },
      ];
    } catch (error) {
      console.error("Error fetching market indices:", error);
      throw error;
    }
  },

  // Get earnings calendar for a specific week
  getEarningsCalendar: async (
    week: string
  ): Promise<Record<number, EarningsEvent[]>> => {
    try {
      // Parse week string to get start and end dates
      const { startDate, endDate } = parseWeekString(week);

      // Make API call to SavvyTrader
      const response = await axios.get(
        `https://api.savvytrader.com/pricing/assets/earnings/calendar?start=${startDate}&end=${endDate}`
      );

      // Transform API response to expected format
      const transformedData = transformEarningsData(response.data);

      // Ensure all days in the range have entries (even if empty)
      const start = new Date(startDate);
      const end = new Date(endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = d.getDate();
        if (!transformedData[day]) {
          transformedData[day] = [];
        }
      }

      return transformedData;
    } catch (error) {
      console.error("Error fetching earnings calendar:", error);

      // Fallback to mock data in case of API failure
      console.warn("Falling back to mock earnings data");
      return {
        24: [
          {
            symbol: "LUNR",
            name: "Lunar Industries",
            date: "2025-03-24",
            time: "before",
            eps: { estimate: 0.45 },
          },
          {
            symbol: "OKLO",
            name: "Oklo Power",
            date: "2025-03-24",
            time: "after",
            eps: { estimate: -0.12 },
          },
        ],
        25: [
          {
            symbol: "RUM",
            name: "Rumble Inc.",
            date: "2025-03-25",
            time: "before",
            eps: { estimate: 0.32 },
          },
          {
            symbol: "GME",
            name: "GameStop Corp.",
            date: "2025-03-25",
            time: "after",
            eps: { estimate: 0.18 },
          },
        ],
        26: [
          {
            symbol: "CHWY",
            name: "Chewy Inc.",
            date: "2025-03-26",
            time: "before",
            eps: { estimate: 0.15 },
          },
          {
            symbol: "CTAS",
            name: "Cintas Corporation",
            date: "2025-03-26",
            time: "before",
            eps: { estimate: 3.78 },
          },
          {
            symbol: "DLTR",
            name: "Dollar Tree Inc.",
            date: "2025-03-26",
            time: "before",
            eps: { estimate: 2.65 },
          },
          {
            symbol: "PAYX",
            name: "Paychex Inc.",
            date: "2025-03-26",
            time: "before",
            eps: { estimate: 1.12 },
          },
          {
            symbol: "JEF",
            name: "Jefferies Financial Group",
            date: "2025-03-26",
            time: "after",
            eps: { estimate: 0.76 },
          },
        ],
        27: [
          {
            symbol: "BITF",
            name: "Bitfarms Ltd.",
            date: "2025-03-27",
            time: "before",
            eps: { estimate: -0.03 },
          },
          {
            symbol: "LULU",
            name: "Lululemon Athletica",
            date: "2025-03-27",
            time: "after",
            eps: { estimate: 5.42 },
          },
          {
            symbol: "KULR",
            name: "KULR Technology Group",
            date: "2025-03-27",
            time: "after",
            eps: { estimate: -0.04 },
          },
        ],
        28: [],
      };
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
          symbol: "LEN",
          name: "Lennar Corporation",
          title: "LEN Q1 2025 Recap",
          summary:
            "Lennar Corporation reported strong Q1 2025 results, with revenue of $8.73 billion, up 12% year-over-year, and earnings per share of $2.84, exceeding analyst estimates of $2.56. The homebuilder delivered 16,798 homes during the quarter, a 15% increase from the same period last year, while new orders rose 18% to 19,324 homes.",
        },
        {
          id: 2,
          symbol: "CCL",
          name: "Carnival Corporation",
          title: "Summary of Carnival Corporation's Q1 2025 Earnings Call",
          positives: [
            "Strong Financial Performance: Carnival reported record highs in revenue, EBITDA, operating income, and customer deposits for Q1 2025, with net income exceeding guidance by over $170 million.",
            "Yield Improvement: The company achieved a 7.3% yield increase, surpassing previous guidance and building on a 17% improvement from the prior year.",
          ],
        },
      ];
    } catch (error) {
      console.error("Error fetching earnings feed:", error);
      throw error;
    }
  },

  // Get detailed stock information
  getStockDetails: async (symbol: string): Promise<StockDetails> => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.get(`${API_URL}/stocks/${symbol}/details`);
      // return response.data;

      // Mock data based on the symbol
      const stockDetailsMap: Record<string, StockDetails> = {
        AAPL: {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 175.34,
          change: 2.45,
          changePercent: 1.42,
          volume: "32.5M",
          marketStatus: "open",
          lastUpdated: "Mar 24, 2025, 10:30 AM ET",
          marketCap: "$2.78T",
          peRatio: 28.45,
          eps: 6.16,
          beta: 1.28,
          dividendYield: "0.52%",
          averageVolume: "58.7M",
          high52Week: 198.23,
          low52Week: 143.9,
          industry: "Consumer Electronics",
          sector: "Technology",
          description:
            "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod.",
          ceo: "Tim Cook",
          founded: "April 1, 1976",
          headquarters: "Cupertino, California, United States",
          employees: "164,000",
          website: "https://www.apple.com",
        },
        MSFT: {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          price: 425.22,
          change: 5.67,
          changePercent: 1.35,
          volume: "28.1M",
          marketStatus: "open",
          lastUpdated: "Mar 24, 2025, 10:30 AM ET",
          marketCap: "$3.16T",
          peRatio: 36.82,
          eps: 11.55,
          beta: 0.92,
          dividendYield: "0.73%",
          averageVolume: "26.4M",
          high52Week: 430.82,
          low52Week: 309.98,
          industry: "Software—Infrastructure",
          sector: "Technology",
          description:
            "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company operates in three segments: Productivity and Business Processes, Intelligent Cloud, and More Personal Computing.",
          ceo: "Satya Nadella",
          founded: "April 4, 1975",
          headquarters: "Redmond, Washington, United States",
          employees: "221,000",
          website: "https://www.microsoft.com",
        },
      };

      // Return the stock details if found, otherwise return a default
      return (
        stockDetailsMap[symbol] || {
          symbol,
          name: `${symbol} Inc.`,
          price: 100.0,
          change: 0,
          changePercent: 0,
          volume: "N/A",
          marketStatus: "closed",
          lastUpdated: "N/A",
          marketCap: "N/A",
          peRatio: 0,
          eps: 0,
          beta: 1,
          dividendYield: "N/A",
          averageVolume: "N/A",
          high52Week: 0,
          low52Week: 0,
          industry: "N/A",
          sector: "N/A",
          description: "No description available.",
          ceo: "N/A",
          founded: "N/A",
          headquarters: "N/A",
          employees: "N/A",
          website: "N/A",
        }
      );
    } catch (error) {
      console.error("Error fetching stock details:", error);
      throw error;
    }
  },
};

export default StockService;
