import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EarningsPage from './pages/EarningsPage';
import StockDetailPage from './pages/StockDetailPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/earnings" element={<EarningsPage />} />
          <Route path="/stock/:symbol" element={<StockDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/success" element={<LoginPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
