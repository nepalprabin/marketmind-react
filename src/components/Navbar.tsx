import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaChartLine } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <nav className="bg-dark text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaChartLine className="text-primary text-2xl" />
            <span className="text-xl font-bold">MarketMind</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/earnings" className="hover:text-primary transition-colors">Earnings</Link>
            <Link to="/markets" className="hover:text-primary transition-colors">Markets</Link>
            <Link to="/news" className="hover:text-primary transition-colors">News</Link>
            <Link to="/watchlist" className="hover:text-primary transition-colors">Watchlist</Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search stocks..."
                className="px-4 py-2 rounded-l-md focus:outline-none text-dark"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="px-4 py-2 rounded-l-md focus:outline-none w-full text-dark"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/earnings" className="hover:text-primary transition-colors">Earnings</Link>
              <Link to="/markets" className="hover:text-primary transition-colors">Markets</Link>
              <Link to="/news" className="hover:text-primary transition-colors">News</Link>
              <Link to="/watchlist" className="hover:text-primary transition-colors">Watchlist</Link>
              <div className="pt-2 flex space-x-4">
                <button className="btn btn-primary">Sign In</button>
                <button className="btn btn-outline">Register</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
