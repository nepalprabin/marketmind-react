import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, login, logout, refreshAuthState } = useAuth();
  
  useEffect(() => {
    // Refresh auth state when component mounts
    console.log('Navbar mounted, refreshing auth state');
    refreshAuthState();
    // Remove refreshAuthState from the dependency array to prevent infinite loops
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
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
          <div className="hidden md:flex items-center space-x-4">
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

            {/* User Authentication */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button 
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <img 
                    src={user.picture || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')} 
                    alt={user.name || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.name || 'User'}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-dark rounded-md shadow-lg py-2 z-10 border border-gray-700">
                    {/* User Profile Header */}
                    <div className="px-4 py-3 border-b border-gray-700">
                      <div className="flex items-center">
                        <img 
                          src={user.picture || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')} 
                          alt={user.name || 'User'} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-medium text-white">{user.name || 'User'}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    {/* Sign Out Button */}
                    <div className="border-t border-gray-700 mt-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              >
                Sign In
              </button>
            )}
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
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 py-2 bg-primary text-white rounded-md px-4 hover:bg-primary/90 transition-colors"
                    >
                      <img 
                        src={user.picture || 'https://ui-avatars.com/api/?name=' + (user.name || 'User')} 
                        alt={user.name || 'User'} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
