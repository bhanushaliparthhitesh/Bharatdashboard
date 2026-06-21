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
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Tracking {tickers.length} Assets
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 bg-transparent border border-primary text-primary hover:bg-primary/20 px-2 py-1 rounded-sm text-xs font-bold tracking-widest transition-colors shadow-[0_0_5px_rgba(34,197,94,0.3)]"
        >
          <Plus className="h-3 w-3" />
          <span>ADD_ASSET</span>
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {tickers.map((ticker) => (
          <DetailedChart key={ticker.symbol} symbol={ticker.symbol} name={ticker.name} />
        ))}
      </div>

      {showAddModal && <AddTickerModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
