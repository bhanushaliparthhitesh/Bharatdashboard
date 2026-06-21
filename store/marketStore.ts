import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TickerConfig {
  symbol: string;
  name: string;
}

interface MarketState {
  tickers: TickerConfig[];
  addTicker: (ticker: TickerConfig) => void;
  removeTicker: (symbol: string) => void;
  reorderTickers: (startIndex: number, endIndex: number) => void;
}

const defaultTickers: TickerConfig[] = [
  { symbol: '^NSEI', name: 'Nifty 50' },
  { symbol: '^BSESN', name: 'BSE Sensex' },
  { symbol: 'INR=X', name: 'USD/INR' },
  { symbol: 'GC=F', name: 'Gold' },
  { symbol: 'RELIANCE.NS', name: 'Reliance' },
  { symbol: 'TCS.NS', name: 'TCS' },
];

export const useMarketStore = create<MarketState>()(
  persist(
    (set) => ({
      tickers: defaultTickers,
      addTicker: (ticker) => set((state) => {
        if (state.tickers.some(t => t.symbol === ticker.symbol)) return state;
        return { tickers: [ticker, ...state.tickers] };
      }),
      removeTicker: (symbol) => set((state) => ({
        tickers: state.tickers.filter((t) => t.symbol !== symbol),
      })),
      reorderTickers: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.tickers);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { tickers: result };
      }),
    }),
    {
      name: 'bharat-market-storage',
    }
  )
);
