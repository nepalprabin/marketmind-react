// Base API URL would be used in a real app
import axios from "axios";
import yahooFinanceService from "./YahooFinanceDataService";

const API_URL = "http://localhost:3000";

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
  importance?: number; // Added importance field to the interface
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

// Market index symbols and their display names
const MARKET_INDICES = [
  { symbol: "^GSPC", name: "S&P 500" },
  { symbol: "^IXIC", name: "NASDAQ" },
  { symbol: "^DJI", name: "DOW" },
  { symbol: "BTC-USD", name: "BTC/USD" },
];

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
  console.log("API Data received:", apiData.length, "items");

  // Debug: Log importance values in the API data
  const importanceValues = apiData
    .map((item) => item.importance)
    .filter(Boolean);
  console.log(
    "Importance values in API data:",
    [...new Set(importanceValues)].sort()
  );

  const result: Record<number, EarningsEvent[]> = {};

  // First, transform all data to EarningsEvent format for easier processing
  const transformedEvents: EarningsEvent[] = [];

  apiData.forEach((item) => {
    if (!item.earningsDate) return;

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
      importance: item.importance, // Include importance in the transformed data
    };

    transformedEvents.push(earningsEvent);
  });

  console.log("Transformed events:", transformedEvents.length);

  // Check if any stock has importance >= 4
  const hasHighImportance = transformedEvents.some(
    (item) => item.importance !== undefined && item.importance >= 4
  );

  console.log("Has high importance (>=4):", hasHighImportance);

  // Filter events based on importance criteria
  let filteredEvents;
  if (hasHighImportance) {
    // If any stock has importance >= 4, show all stocks
    filteredEvents = transformedEvents;
    console.log("Showing all stocks due to high importance presence");
  } else {
    // Otherwise, only show stocks with importance = 3
    filteredEvents = transformedEvents.filter(
      (item) => item.importance !== undefined && item.importance === 3
    );
    console.log(
      "Filtered to importance = 3 only:",
      filteredEvents.length,
      "stocks"
    );
  }

  // Organize filtered events by day
  filteredEvents.forEach((event) => {
    const day = parseInt(event.date.split("-")[2]);

    // Initialize array for this day if it doesn't exist
    if (!result[day]) {
      result[day] = [];
    }

    result[day].push(event);
  });

  // Debug: Log the final result structure
  Object.keys(result).forEach((day) => {
    console.log(`Day ${day}: ${result[parseInt(day)].length} events`);
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
      // Fetch real-time data for each market index
      const marketIndicesPromises = MARKET_INDICES.map(async (index) => {
        try {
          const data = await yahooFinanceService.getStockChart(
            index.symbol,
            "1d",
            "1d"
          );

          // Extract the latest data point
          const result = data.chart.result[0];
          const meta = result.meta;
          const quotes = result.indicators.quote[0];
          const timestamps = result.timestamp;

          // Get the latest price
          const latestIndex = timestamps.length - 1;
          const currentPrice = quotes.close[latestIndex];
          const previousClose = meta.chartPreviousClose;

          // Calculate change and change percent
          const change = currentPrice - previousClose;
          const changePercent = (change / previousClose) * 100;

          // Format the value based on the index
          const formattedValue = yahooFinanceService.formatPrice(
            index.symbol,
            currentPrice
          );

          return {
            name: index.name,
            value: formattedValue,
            change: change,
            changePercent: changePercent,
          };
        } catch (error) {
          console.error(`Error fetching data for ${index.symbol}:`, error);
          // Fallback to mock data if API call fails
          return {
            name: index.name,
            value: index.symbol === "BTC-USD" ? "$65,821.52" : "0.00",
            change: 0,
            changePercent: 0,
          };
        }
      });

      // Wait for all API calls to complete
      const marketIndices = await Promise.all(marketIndicesPromises);
      return marketIndices;
    } catch (error) {
      console.error("Error fetching market indices:", error);

      // Fallback to mock data if API calls fail
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
    }
  },
  // Get earnings calendar for a specific week
  getEarningsCalendar: async (
    week: string
  ): Promise<Record<number, EarningsEvent[]>> => {
    try {
      console.log("Fetching earnings calendar for week:", week);

      // Parse week string to get start and end dates
      const { startDate, endDate } = parseWeekString(week);
      console.log("Date range:", startDate, "to", endDate);

      // Make API call to SavvyTrader
      const response = await axios.get(
        `https://api.savvytrader.com/pricing/assets/earnings/calendar?start=${startDate}&end=${endDate}`
      );

      console.log("API response received with", response.data.length, "items");

      // Transform API response to expected format with importance filtering
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

      // Create raw mock data with importance values
      const rawMockData = [
        {
          symbol: "LUNR",
          assetName: "Lunar Industries",
          earningsDate: "2025-03-24",
          earningsTime: "08:30",
          epsEstimate: 0.45,
          importance: 3,
        },
        {
          symbol: "OKLO",
          assetName: "Oklo Power",
          earningsDate: "2025-03-24",
          earningsTime: "16:30",
          epsEstimate: -0.12,
          importance: 2,
        },
        {
          symbol: "RUM",
          assetName: "Rumble Inc.",
          earningsDate: "2025-03-25",
          earningsTime: "08:30",
          epsEstimate: 0.32,
          importance: 3,
        },
        {
          symbol: "GME",
          assetName: "GameStop Corp.",
          earningsDate: "2025-03-25",
          earningsTime: "16:30",
          epsEstimate: 0.18,
          importance: 2,
        },
        {
          symbol: "CHWY",
          assetName: "Chewy Inc.",
          earningsDate: "2025-03-26",
          earningsTime: "08:30",
          epsEstimate: 0.15,
          importance: 3,
        },
        {
          symbol: "CTAS",
          assetName: "Cintas Corporation",
          earningsDate: "2025-03-26",
          earningsTime: "08:30",
          epsEstimate: 3.78,
          importance: 3,
        },
        {
          symbol: "DLTR",
          assetName: "Dollar Tree Inc.",
          earningsDate: "2025-03-26",
          earningsTime: "08:30",
          epsEstimate: 2.65,
          importance: 2,
        },
        {
          symbol: "PAYX",
          assetName: "Paychex Inc.",
          earningsDate: "2025-03-26",
          earningsTime: "08:30",
          epsEstimate: 1.12,
          importance: 2,
        },
        {
          symbol: "JEF",
          assetName: "Jefferies Financial Group",
          earningsDate: "2025-03-26",
          earningsTime: "16:30",
          epsEstimate: 0.76,
          importance: 1,
        },
        {
          symbol: "BITF",
          assetName: "Bitfarms Ltd.",
          earningsDate: "2025-03-27",
          earningsTime: "08:30",
          epsEstimate: -0.03,
          importance: 2,
        },
        {
          symbol: "LULU",
          assetName: "Lululemon Athletica",
          earningsDate: "2025-03-27",
          earningsTime: "16:30",
          epsEstimate: 5.42,
          importance: 3,
        },
        {
          symbol: "KULR",
          assetName: "KULR Technology Group",
          earningsDate: "2025-03-27",
          earningsTime: "16:30",
          epsEstimate: -0.04,
          importance: 1,
        },
      ];

      console.log("Using mock data with", rawMockData.length, "items");

      // Use the same transformEarningsData function to process mock data
      // This ensures consistent filtering logic for both API and mock data
      return transformEarningsData(rawMockData);
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

  // Get stock details

  async getStockDetails(symbol: string): Promise<StockDetails> {
    const resp = await axios.get(`${API_URL}/api/stocks/${symbol}`);
    const r = resp.data as any;

    // shorthand for raw vs fmt fields
    const p = r.price;
    const sd = r.summaryDetail;
    const ks = r.defaultKeyStatistics;
    const fd = r.financialData;
    const prof = r.summaryProfile;
    const earnHist = r.earningsHistory;

    return {
      symbol: p.symbol,
      name: p.longName || p.shortName,
      price: p.regularMarketPrice.raw,
      change: p.regularMarketChange.raw,
      changePercent: p.regularMarketChangePercent.raw,
      volume: p.regularMarketVolume.raw,
      marketStatus: p.marketState,
      lastUpdated: new Date(p.regularMarketTime * 1000).toISOString(),

      marketCap: p.marketCap.fmt,
      peRatio: sd.trailingPE?.raw ?? NaN,
      eps: ks.trailingEps?.raw ?? NaN,
      beta: sd.beta?.raw ?? NaN,
      dividendYield: sd.dividendYield?.raw
        ? `${(sd.dividendYield.raw * 100).toFixed(2)}%`
        : "N/A",
      averageVolume: sd.averageVolume.raw,
      high52Week: sd.fiftyTwoWeekHigh.raw,
      low52Week: sd.fiftyTwoWeekLow.raw,

      industry: prof.industry,
      sector: prof.sector,
      description: prof.longBusinessSummary,
      ceo: prof.companyOfficers?.[0]?.name ?? "N/A",
      founded: prof.founded ?? "N/A",
      headquarters: [prof.city, prof.state, prof.country]
        .filter(Boolean)
        .join(", "),
      employees: sd.fullTimeEmployees ?? NaN,
      website: prof.website,

      // you can also expose earningsHistory for your EarningsChart:
      // earnings: earnHist.history.map((e:any) => ({ date: e.date, epsActual: e.epsActual.raw }))
    };
    // }
    // getStockDetails: async (symbol: string): Promise<StockDetails> => {
    //   try {
    //     // In a real app, this would be an API call
    //     // const response = await axios.get(`${API_URL}/stocks/${symbol}`);
    //     // return response.data;

    //     // Mock data for now
    //     return {
    //       symbol,
    //       name: `${symbol} Inc.`,
    //       price: 175.34,
    //       change: 2.45,
    //       changePercent: 1.42,
    //       volume: "32.5M",
    //       marketStatus: "open",
    //       lastUpdated: new Date().toISOString(),
    //       marketCap: "2.85T",
    //       peRatio: 28.5,
    //       eps: 6.15,
    //       beta: 1.2,
    //       dividendYield: "0.5%",
    //       averageVolume: "28.7M",
    //       high52Week: 198.23,
    //       low52Week: 142.19,
    //       industry: "Technology",
    //       sector: "Consumer Electronics",
    //       description:
    //         "This is a leading technology company that designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories.",
    //       ceo: "John Doe",
    //       founded: "1976",
    //       headquarters: "Cupertino, CA",
    //       employees: "154,000",
    //       website: `https://www.${symbol.toLowerCase()}.com`,
    //     };
    //   } catch (error) {
    //     console.error(`Error fetching details for ${symbol}:`, error);
    //     throw error;
    //   }
    // },
  },
};
