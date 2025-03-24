import React, { useState } from 'react';

interface FundamentalTabsProps {
  symbol: string;
}

const FundamentalTabs: React.FC<FundamentalTabsProps> = ({ symbol }) => {
  const [activeTab, setActiveTab] = useState<string>('summary');
  
  const tabs = [
    { id: 'summary', label: 'Summary' },
    { id: 'financials', label: 'Financials' },
    { id: 'earnings', label: 'Earnings' },
    { id: 'valuation', label: 'Valuation' }
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="border-b mb-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="tab-content">
        {activeTab === 'summary' && (
          <div>
            <h3 className="text-lg font-bold mb-3">Key Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm">Revenue (TTM)</p>
                <p className="font-medium">$394.33B</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Gross Profit (TTM)</p>
                <p className="font-medium">$170.78B</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Net Income (TTM)</p>
                <p className="font-medium">$97.18B</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Profit Margin</p>
                <p className="font-medium">24.65%</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Operating Margin</p>
                <p className="font-medium">30.13%</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Return on Equity</p>
                <p className="font-medium">160.09%</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-3">Growth Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Revenue Growth (YoY)</p>
                <p className="font-medium text-green-600">+7.8%</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">EPS Growth (YoY)</p>
                <p className="font-medium text-green-600">+13.2%</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Dividend Growth (5Y)</p>
                <p className="font-medium text-green-600">+6.5%</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'financials' && (
          <div>
            <h3 className="text-lg font-bold mb-3">Income Statement Highlights</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Item</th>
                    <th className="py-2 px-3 text-right">2023</th>
                    <th className="py-2 px-3 text-right">2022</th>
                    <th className="py-2 px-3 text-right">2021</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Revenue</td>
                    <td className="py-2 px-3 text-right">$394.33B</td>
                    <td className="py-2 px-3 text-right">$365.82B</td>
                    <td className="py-2 px-3 text-right">$365.82B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Cost of Revenue</td>
                    <td className="py-2 px-3 text-right">$223.55B</td>
                    <td className="py-2 px-3 text-right">$212.98B</td>
                    <td className="py-2 px-3 text-right">$212.98B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Gross Profit</td>
                    <td className="py-2 px-3 text-right">$170.78B</td>
                    <td className="py-2 px-3 text-right">$152.84B</td>
                    <td className="py-2 px-3 text-right">$152.84B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Operating Income</td>
                    <td className="py-2 px-3 text-right">$118.83B</td>
                    <td className="py-2 px-3 text-right">$109.20B</td>
                    <td className="py-2 px-3 text-right">$109.20B</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Net Income</td>
                    <td className="py-2 px-3 text-right">$97.18B</td>
                    <td className="py-2 px-3 text-right">$94.68B</td>
                    <td className="py-2 px-3 text-right">$94.68B</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-3">Balance Sheet Highlights</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Item</th>
                    <th className="py-2 px-3 text-right">2023</th>
                    <th className="py-2 px-3 text-right">2022</th>
                    <th className="py-2 px-3 text-right">2021</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Total Assets</td>
                    <td className="py-2 px-3 text-right">$352.76B</td>
                    <td className="py-2 px-3 text-right">$338.22B</td>
                    <td className="py-2 px-3 text-right">$338.22B</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Total Liabilities</td>
                    <td className="py-2 px-3 text-right">$290.45B</td>
                    <td className="py-2 px-3 text-right">$287.91B</td>
                    <td className="py-2 px-3 text-right">$287.91B</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Total Equity</td>
                    <td className="py-2 px-3 text-right">$62.31B</td>
                    <td className="py-2 px-3 text-right">$50.31B</td>
                    <td className="py-2 px-3 text-right">$50.31B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div>
            <h3 className="text-lg font-bold mb-3">Earnings History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Quarter</th>
                    <th className="py-2 px-3 text-right">EPS Estimate</th>
                    <th className="py-2 px-3 text-right">EPS Actual</th>
                    <th className="py-2 px-3 text-right">Surprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">Q1 2024</td>
                    <td className="py-2 px-3 text-right">$1.95</td>
                    <td className="py-2 px-3 text-right">$2.18</td>
                    <td className="py-2 px-3 text-right text-green-600">+11.8%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Q4 2023</td>
                    <td className="py-2 px-3 text-right">$2.10</td>
                    <td className="py-2 px-3 text-right">$2.07</td>
                    <td className="py-2 px-3 text-right text-red-600">-1.4%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Q3 2023</td>
                    <td className="py-2 px-3 text-right">$1.89</td>
                    <td className="py-2 px-3 text-right">$2.02</td>
                    <td className="py-2 px-3 text-right text-green-600">+6.9%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Q2 2023</td>
                    <td className="py-2 px-3 text-right">$1.82</td>
                    <td className="py-2 px-3 text-right">$1.88</td>
                    <td className="py-2 px-3 text-right text-green-600">+3.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-3">Earnings Chart</h3>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Quarterly Earnings Comparison Chart</p>
                <p className="text-gray-400 text-sm">Actual vs Estimated EPS</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>In a real implementation, this would be a bar chart</p>
                  <p>comparing actual vs estimated earnings per quarter</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mt-6 mb-3">Upcoming Earnings</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Next Earnings Date</p>
                  <p className="text-gray-500">April 27, 2024 (Estimated)</p>
                </div>
                <div>
                  <p className="font-medium">EPS Estimate</p>
                  <p className="text-gray-500">$1.98</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'valuation' && (
          <div>
            <h3 className="text-lg font-bold mb-3">Valuation Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm">P/E Ratio (TTM)</p>
                <p className="font-medium">28.45</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Forward P/E</p>
                <p className="font-medium">25.12</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">PEG Ratio</p>
                <p className="font-medium">2.18</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Price/Sales (TTM)</p>
                <p className="font-medium">7.01</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Price/Book (MRQ)</p>
                <p className="font-medium">44.56</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Enterprise Value/EBITDA</p>
                <p className="font-medium">21.34</p>
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-3">Industry Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left">Metric</th>
                    <th className="py-2 px-3 text-right">{symbol}</th>
                    <th className="py-2 px-3 text-right">Industry Avg.</th>
                    <th className="py-2 px-3 text-right">S&P 500</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-3">P/E Ratio</td>
                    <td className="py-2 px-3 text-right">28.45</td>
                    <td className="py-2 px-3 text-right">24.32</td>
                    <td className="py-2 px-3 text-right">22.18</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Price/Sales</td>
                    <td className="py-2 px-3 text-right">7.01</td>
                    <td className="py-2 px-3 text-right">5.23</td>
                    <td className="py-2 px-3 text-right">2.64</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-3">Price/Book</td>
                    <td className="py-2 px-3 text-right">44.56</td>
                    <td className="py-2 px-3 text-right">8.75</td>
                    <td className="py-2 px-3 text-right">4.15</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Dividend Yield</td>
                    <td className="py-2 px-3 text-right">0.52%</td>
                    <td className="py-2 px-3 text-right">1.25%</td>
                    <td className="py-2 px-3 text-right">1.42%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundamentalTabs;
