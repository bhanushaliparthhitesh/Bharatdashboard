"use client";

import { useState } from "react";
import { searchFinance } from "@/app/actions/finance";
import { useMarketStore } from "@/store/marketStore";
import { Search, Plus, Loader2, X } from "lucide-react";

interface SearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

export function AddTickerModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  
  const addTicker = useMarketStore(state => state.addTicker);
  const existingTickers = useMarketStore(state => state.tickers);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    const res = await searchFinance(query);
    setResults(res as SearchResult[]);
    setLoading(false);
  };

  const handleAdd = (result: SearchResult) => {
    addTicker({ symbol: result.symbol, name: result.name });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card w-full max-w-md border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Add Company Graph</h2>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSearch} className="relative flex items-center mb-4">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search TCS, Reliance, NIFTY..."
              className="w-full bg-muted/50 border border-border/50 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              autoFocus
            />
            <button type="submit" disabled={loading} className="absolute right-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md disabled:opacity-50">
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Search'}
            </button>
          </form>

          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {results.length === 0 && !loading && query && (
              <p className="text-center text-sm text-muted-foreground py-4">No results found.</p>
            )}
            {results.map((r) => {
              const isAdded = existingTickers.some(t => t.symbol === r.symbol);
              return (
                <div key={r.symbol} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-medium text-sm truncate">{r.name}</span>
                    <span className="text-xs text-muted-foreground">{r.symbol} • {r.exchange}</span>
                  </div>
                  <button 
                    onClick={() => handleAdd(r)}
                    disabled={isAdded}
                    className="shrink-0 ml-4 flex items-center gap-1 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAdded ? 'Added' : <><Plus className="h-3 w-3" /> Add</>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
