"use client";

import { MarketData } from "@/lib/markets";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TickerProps {
  data: MarketData[];
}

export function Ticker({ data }: TickerProps) {
  if (!data || data.length === 0) return null;

  // Duplicate the data to create a seamless infinite scroll effect
  const tickerItems = [...data, ...data, ...data, ...data];

  return (
    <div className="w-full bg-card/80 backdrop-blur-md border-b border-border/40 overflow-hidden flex items-center h-10 text-sm">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {tickerItems.map((item, index) => {
          const isPositive = item.change24h >= 0;
          return (
            <div 
              key={`${item.symbol}-${index}`} 
              className="flex items-center gap-2 mx-8 text-foreground/90 font-medium"
            >
              <span className="text-muted-foreground">{item.name}</span>
              <span>{item.type === 'crypto' || item.type === 'currency' ? '$' : '₹'}{item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className={cn(
                "flex items-center text-xs px-1.5 py-0.5 rounded-sm",
                isPositive ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
              )}>
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(item.change24h).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
