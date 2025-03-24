import React from 'react';

interface CompanyInfoProps {
  symbol: string;
  description: string;
  ceo: string;
  founded: string;
  headquarters: string;
  employees: string;
  website: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  symbol,
  description,
  ceo,
  founded,
  headquarters,
  employees,
  website
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Company Information</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">About {symbol}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500 text-sm">CEO</p>
          <p className="font-medium">{ceo}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Founded</p>
          <p className="font-medium">{founded}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Headquarters</p>
          <p className="font-medium">{headquarters}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Employees</p>
          <p className="font-medium">{employees}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-500 text-sm">Website</p>
          <p className="font-medium">
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {website}
            </a>
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-3">Recent News</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border-b pb-4 last:border-b-0">
              <h4 className="font-medium mb-1">
                <a href="#" className="hover:text-primary">
                  {symbol} Announces New Product Line for 2024
                </a>
              </h4>
              <p className="text-gray-500 text-sm mb-1">March 20, 2024</p>
              <p className="text-gray-700 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
