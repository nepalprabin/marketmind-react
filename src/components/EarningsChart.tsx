import React from 'react';

interface EarningsChartProps {
  symbol: string;
}

const EarningsChart: React.FC<EarningsChartProps> = ({ symbol }) => {
  // Mock data for earnings comparison
  const quarterlyData = [
    { quarter: 'Q1 2023', estimatedEPS: 1.75, actualEPS: 1.88, revenue: '90.15B', revenueGrowth: 8.1 },
    { quarter: 'Q2 2023', estimatedEPS: 1.82, actualEPS: 1.88, revenue: '81.80B', revenueGrowth: 1.9 },
    { quarter: 'Q3 2023', estimatedEPS: 1.89, actualEPS: 2.02, revenue: '89.50B', revenueGrowth: 7.8 },
    { quarter: 'Q4 2023', estimatedEPS: 2.10, actualEPS: 2.07, revenue: '119.58B', revenueGrowth: 2.1 },
    { quarter: 'Q1 2024', estimatedEPS: 1.95, actualEPS: 2.18, revenue: '94.83B', revenueGrowth: 5.2 },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Earnings Comparison</h2>
      
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold mb-3">Quarterly EPS: Actual vs Estimated</h3>
        <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">EPS Comparison Chart for {symbol}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>In a real implementation, this would be a bar chart</p>
              <p>comparing actual vs estimated EPS for each quarter</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold mb-3">Revenue Trend</h3>
        <div className="h-64 bg-white rounded-lg p-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Revenue Trend Chart for {symbol}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>In a real implementation, this would be a line chart</p>
              <p>showing revenue growth over time</p>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-3">Quarterly Earnings Data</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Quarter</th>
              <th className="py-2 px-3 text-right">Est. EPS</th>
              <th className="py-2 px-3 text-right">Actual EPS</th>
              <th className="py-2 px-3 text-right">Surprise</th>
              <th className="py-2 px-3 text-right">Revenue</th>
              <th className="py-2 px-3 text-right">YoY Growth</th>
            </tr>
          </thead>
          <tbody>
            {quarterlyData.map((quarter, index) => {
              const surprise = ((quarter.actualEPS - quarter.estimatedEPS) / quarter.estimatedEPS) * 100;
              const isPositive = surprise >= 0;
              
              return (
                <tr key={index} className={index < quarterlyData.length - 1 ? "border-b" : ""}>
                  <td className="py-2 px-3">{quarter.quarter}</td>
                  <td className="py-2 px-3 text-right">${quarter.estimatedEPS.toFixed(2)}</td>
                  <td className="py-2 px-3 text-right">${quarter.actualEPS.toFixed(2)}</td>
                  <td className={`py-2 px-3 text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{surprise.toFixed(1)}%
                  </td>
                  <td className="py-2 px-3 text-right">{quarter.revenue}</td>
                  <td className={`py-2 px-3 text-right ${quarter.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {quarter.revenueGrowth >= 0 ? '+' : ''}{quarter.revenueGrowth.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsChart;
