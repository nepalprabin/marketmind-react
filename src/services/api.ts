import axios from "axios";

// Create a base API client for Yahoo Finance data
const yahooFinanceApi = {
  getStockChart: async (
    symbol: string,
    interval: string = "1d",
    range: string = "1d"
  ) => {
    try {
      // In a production environment, this would be a call to your backend API
      // which would then make the call to Yahoo Finance API with proper authentication
      // For this example, we'll simulate the API response structure

      // This is where you would integrate with the YahooFinance/get_stock_chart API
      // const response = await axios.get(`/api/yahoo-finance/chart`, {
      //   params: { symbol, interval, range }
      // });

      // For now, we'll fetch data from a mock API endpoint
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
  },
};

export default yahooFinanceApi;
