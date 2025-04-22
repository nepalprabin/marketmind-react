import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from "axios";

// TypeScript interfaces
interface Stock {
  id: string;
  symbol: string;
  name: string;
}

interface Watchlist {
  id: string;
  name: string;
  description?: string;
  stocks: Stock[];
}

const WatchlistPage: React.FC = () => {
  //navigate
  const navigate =  useNavigate();
  // State
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSymbol, setNewSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const navigateToStockDetails = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

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

  // Add stock
  const addStock = async () => {
    if (!activeWatchlist || !newSymbol.trim()) return;
    try {
      await api.post(`/api/watchlists/${activeWatchlist.id}/stocks`, { symbol: newSymbol.toUpperCase() });
      // Refresh active watchlist stocks
      const res = await api.get(`/api/watchlists/${activeWatchlist.id}`);
      const d = res.data;
      setActiveWatchlist({
        id: d.id,
        name: d.name,
        description: d.description,
        stocks: (d.watchlistStocks || []).map((ws: any) => ws.stock),
      });
      setNewSymbol("");
    } catch (e) {
      console.error(e);
    }
  };

  // Remove stock
  const removeStock = async (id: string) => {
    if (!activeWatchlist) return;
    try {
      await api.delete(`/api/watchlists/${activeWatchlist.id}/stocks/${id}`);
      setActiveWatchlist(prev => prev ? {
        ...prev,
        stocks: prev.stocks.filter(s => s.id !== id)
      } : null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-dark text-white">
        <h1 className="text-2xl font-bold">Stock Watchlists</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-white text-dark rounded hover:opacity-90"
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
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition ${activeWatchlist?.id === w.id ? "bg-primary text-white" : ""}`}
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
                <button onClick={createList} className="px-4 py-2 bg-dark text-white rounded">Create</button>
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
              {/* Add Stock */}
              <div className="flex mb-4 space-x-2">
                <input
                  className="flex-1 p-2 border rounded"
                  placeholder="Symbol e.g. AAPL"
                  value={newSymbol}
                  onChange={e => setNewSymbol(e.target.value.toUpperCase())}
                />
                <button
                  onClick={addStock}
                  className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90"
                >
                  Add
                </button>
              </div>
              {/* Stock List */}
              {activeWatchlist.stocks.length > 0 ? (
                <ul className="space-y-2">
                  {activeWatchlist.stocks.map(s => (
                    <li key={s.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div className="cursor-pointer" onClick={() => navigateToStockDetails(s.symbol)}>
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
