import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import AuthService from '../services/AuthService';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
//   const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if this is a redirect from authentication
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    
    if (token) {
      console.log('Auth callback received with JWT token:', token);
      
      // Handle authentication callback
      const handleCallback = async () => {
        try {
          const user = await AuthService.handleAuthCallback(params);
          console.log('User data from JWT callback:', user);
          
          if (user) {
            // Force reload to ensure the app recognizes the authenticated state
            setShowSuccessModal(true);
            
            // Redirect to homepage after showing success modal
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          } else {
            setError('Failed to authenticate. Please try again.');
          }
        } catch (err) {
          console.error('Error in auth callback:', err);
          setError('An error occurred during authentication.');
        }
      };
      
      handleCallback();
    }
  }, [location]);

  const handleGoogleLogin = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-dark text-white py-6 px-8">
            <h2 className="text-2xl font-bold text-center">Sign In / Sign Up</h2>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <p className="text-gray-600 text-center mb-8">
              Sign in with your Google account to access your StockTrader dashboard and personalized features.
            </p>
            
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <FaGoogle className="text-red-500 mr-2" />
              <span>Continue with Google</span>
            </button>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-center mb-4">Success!</h3>
            <p className="text-center text-gray-600 mb-6">
              Your account has been successfully created. You will be redirected to the homepage.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
