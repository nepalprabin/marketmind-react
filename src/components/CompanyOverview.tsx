import React from 'react';

interface CompanyOverviewProps {
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
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  marketCap,
  peRatio,
  eps,
  beta,
  dividendYield,
  averageVolume,
  high52Week,
  low52Week,
  industry,
  sector
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Company Overview</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
        <div>
          <p className="text-gray-500 text-sm">Market Cap</p>
          <p className="font-medium">{marketCap}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">P/E Ratio</p>
          <p className="font-medium">{peRatio.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">EPS (TTM)</p>
          <p className="font-medium">${eps.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Beta</p>
          <p className="font-medium">{beta.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Dividend Yield</p>
          <p className="font-medium">{dividendYield}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Average Volume</p>
          <p className="font-medium">{averageVolume}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">52 Week High</p>
          <p className="font-medium">${high52Week.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">52 Week Low</p>
          <p className="font-medium">${low52Week.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Industry</p>
          <p className="font-medium">{industry}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Sector</p>
          <p className="font-medium">{sector}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
