import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

// TypeScript interfaces
interface Stock { id: string; symbol: string; name: string }
interface Watchlist { id: string; name: string; description?: string; stocks: Stock[] }

const WatchlistPage: React.FC = () => {
  // State
  const navigate = useNavigate();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSymbol, setNewSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autocomplete state
  const [suggestions, setSuggestions] = useState<Stock[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Axios instance
  const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
  });

  // Fetch watchlists
  const fetchWatchlists = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/api/watchlists");
      const data = Array.isArray(res.data) ? res.data : [];
      const lists = data.map((w: any) => ({
        id: w.id,
        name: w.name,
        description: w.description,
        stocks: (w.watchlistStocks || []).map((ws: any) => ws.stock),
      }));
      setWatchlists(lists);
      if (!activeWatchlist && lists.length) setActiveWatchlist(lists[0]);
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Failed to load watchlists.");
    }
    setIsLoading(false);
  };

  useEffect(() => { fetchWatchlists(); }, []);

  // Create new watchlist
  const createList = async () => {
    if (!newName.trim()) return;
    try {
      const res = await api.post("/api/watchlists", { name: newName, description: newDesc });
      const created: Watchlist = { ...(res.data), stocks: [] };
      setWatchlists(prev => [...prev, created]);
      setActiveWatchlist(created);
      setIsCreating(false);
      setNewName("");
      setNewDesc("");
    } catch (e) {
      console.error(e);
    }
  };

  // Autocomplete fetch
  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await api.get(`/api/stocks/search`, { params: { query: query } });
      setSuggestions(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  // Add stock by symbol
  const addStock = async (symbol: string) => {
    if (!activeWatchlist || !symbol.trim()) return;
    try {
      await api.post(`/api/watchlists/${activeWatchlist.id}/stocks`, { symbol: symbol.toUpperCase() });
      // Refresh active watchlist
      const res = await api.get(`/api/watchlists/${activeWatchlist.id}`);
      const d = res.data;
      setActiveWatchlist({
        id: d.id,
        name: d.name,
        description: d.description,
        stocks: (d.watchlistStocks || []).map((ws: any) => ws.stock),
      });
      setNewSymbol("");
      setSuggestions([]);
      setShowSuggestions(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Remove stock
  const removeStock = async (id: string) => {
    if (!activeWatchlist) return;
    try {
      await api.delete(`/api/watchlists/${activeWatchlist.id}/stocks/${id}`);
      setActiveWatchlist(prev => prev ? ({ ...prev, stocks: prev.stocks.filter(s => s.id !== id) }) : null);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle selecting suggestion
  const handleSelectSuggestion = (s: Stock) => {
    setNewSymbol(s.symbol);
    addStock(s.symbol);
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-dark text-white">
        <h1 className="text-2xl font-bold">Stock Watchlists</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-dark text-white rounded hover:bg-dark/70"
        >
          New Watchlist
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r overflow-y-auto">
          {isLoading ? (
            <p className="p-4">Loading...</p>
          ) : error ? (
            <p className="p-4 text-red-600">{error}</p>
          ) : (
            <ul>
              {watchlists.map(w => (
                <li key={w.id}>
                  <button
                    onClick={() => setActiveWatchlist(w)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition ${activeWatchlist?.id === w.id ? "bg-dark text-white" : ""}`}
                  >
                    {w.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Create Form Inline */}
          {isCreating && (
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow mb-6">
              <h2 className="text-xl font-semibold mb-4">New Watchlist</h2>
              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
              <textarea
                className="w-full mb-3 p-2 border rounded"
                placeholder="Description"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setIsCreating(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button onClick={createList} className="px-4 py-2 bg-dark text-white rounded hover:bg-dark/70">Create</button>
              </div>
            </div>
          )}

          {/* Active Watchlist Details */}
          {activeWatchlist ? (
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{activeWatchlist.name}</h2>
                <p className="text-sm text-gray-500">{activeWatchlist.stocks.length} stocks</p>
              </div>
              {activeWatchlist.description && <p className="mb-4 text-gray-700">{activeWatchlist.description}</p>}

              {/* Add Stock with autocomplete */}
              <div className="relative mb-4 max-w-md">
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Search symbol or name..."
                  value={newSymbol}
                  onChange={e => {
                    const q = e.target.value;
                    setNewSymbol(q);
                    fetchSuggestions(q);
                    setShowSuggestions(true);
                  }}
                />
                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div ref={suggestionsRef} className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto z-10">
                    {suggestions.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectSuggestion(s)}
                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        <strong>{s.symbol}</strong> - <span className="text-sm text-gray-600">{s.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Stock List */}
              {activeWatchlist.stocks.length > 0 ? (
                <ul className="space-y-2">
                  {activeWatchlist.stocks.map(s => (
                    <li key={s.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div className="cursor-pointer" onClick={() => navigate(`/stock/${s.symbol}`)}>
                        <p className="font-medium">{s.symbol}</p>
                        <p className="text-sm text-gray-600">{s.name}</p>
                      </div>
                      <button
                        onClick={() => removeStock(s.id)}
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No stocks added yet.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Select a watchlist to view details.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default WatchlistPage;
