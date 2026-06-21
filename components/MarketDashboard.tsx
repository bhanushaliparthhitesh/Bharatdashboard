"use client";

import { useState, useEffect } from "react";
import { useMarketStore } from "@/store/marketStore";
import { DetailedChart } from "./DetailedChart";
import { AddTickerModal } from "./AddTickerModal";
import { Plus } from "lucide-react";

export function MarketDashboard() {
  const tickers = useMarketStore((state) => state.tickers);
  const [showAddModal, setShowAddModal] = useState(false);

  // We ensure this component only renders properly after hydration to prevent hydration mismatch
  // since Zustand persist loads from localStorage.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Market Terminal</h1>
          <p className="text-muted-foreground">Customize your macro and micro economics dashboard.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Graph</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tickers.map((ticker) => (
          <DetailedChart key={ticker.symbol} symbol={ticker.symbol} name={ticker.name} />
        ))}
      </div>

      {showAddModal && <AddTickerModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
