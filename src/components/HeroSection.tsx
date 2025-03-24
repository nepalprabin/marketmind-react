import React from 'react';
import { FaChartLine, FaArrowRight } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-dark to-dark/90 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Trade Smarter, <span className="text-primary">Not Harder</span>
            </h1>
            <p className="text-lg mb-6">
              Get real-time market data, earnings reports, and expert analysis to make informed trading decisions.
            </p>
            <div className="flex space-x-4">
              <button className="btn btn-primary">
                Get Started
              </button>
              <button className="btn btn-outline border-white text-white hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/20 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/20 rounded-full"></div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <FaChartLine className="text-primary mr-2" />
                    <span className="font-bold">Market Trends</span>
                  </div>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">LIVE</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>S&P 500</span>
                    <div className="flex items-center text-green-400">
                      <span>5,563.98</span>
                      <span className="ml-2 text-xs">+0.22%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>NASDAQ</span>
                    <div className="flex items-center text-green-400">
                      <span>17,480.84</span>
                      <span className="ml-2 text-xs">+0.33%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>BTC/USD</span>
                    <div className="flex items-center text-red-400">
                      <span>65,821.52</span>
                      <span className="ml-2 text-xs">-1.65%</span>
                    </div>
                  </div>
                  <button className="flex items-center text-primary text-sm mt-2">
                    View all markets <FaArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
