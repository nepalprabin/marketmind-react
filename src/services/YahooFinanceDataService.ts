import axios from "axios";

// Types for Yahoo Finance API response
interface YahooFinanceChartResponse {
  chart: {
    result: Array<{
      meta: {
        currency: string;
        symbol: string;
        exchangeName: string;
        instrumentType: string;
        firstTradeDate: number;
        regularMarketTime: number;
        gmtoffset: number;
        timezone: string;
        exchangeTimezoneName: string;
        regularMarketPrice: number;
        chartPreviousClose: number;
        previousClose: number;
        scale: number;
        priceHint: number;
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          high: number[];
          open: number[];
          low: number[];
          close: number[];
          volume: number[];
        }>;
        adjclose?: Array<{
          adjclose: number[];
        }>;
      };
    }>;
    error: null | string;
  };
}

/**
 * Service for fetching real-time market data from Yahoo Finance API
 */
class YahooFinanceDataService {
  /**
   * Fetches stock chart data from Yahoo Finance API
   *
   * @param symbol - The stock symbol to fetch data for
   * @param interval - The data interval (e.g., '1d', '1h')
   * @param range - The time range (e.g., '1d', '5d', '1mo')
   * @returns The chart data response
   */
  async getStockChart(
    symbol: string,
    interval: string = "1d",
    range: string = "1d"
  ): Promise<YahooFinanceChartResponse> {
    try {
      // In a production environment, this would typically go through your backend
      // which would handle API keys and rate limiting
      const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
        {
          params: {
            interval,
            range,
            includePrePost: false,
            events: "div,split",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(`Error fetching stock chart for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Formats a number for display (e.g., 1000000 -> 1M)
   *
   * @param num - The number to format
   * @returns The formatted number string
   */
  formatNumber(num: number): string {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toFixed(2);
  }

  /**
   * Formats a price value based on the symbol type
   *
   * @param symbol - The stock symbol
   * @param price - The price value
   * @returns The formatted price string
   */
  formatPrice(symbol: string, price: number): string {
    if (symbol.includes("-USD")) {
      return `$${price.toLocaleString()}`;
    }

    // For indices, format with commas
    if (symbol.startsWith("^")) {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return price.toFixed(2);
  }
}

export default new YahooFinanceDataService();
