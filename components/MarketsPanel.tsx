"use client";

import { MarketData } from "@/lib/markets";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketsPanelProps {
  data: MarketData[];
}

export function MarketsPanel({ data }: MarketsPanelProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 flex flex-col p-4 shadow-sm">
      <h3 className="font-semibold text-lg text-foreground/90 mb-4">Markets Overview</h3>
      <div className="flex flex-col gap-3">
        {data.map((item) => {
          const isPositive = item.change24h >= 0;
          const strokeColor = isPositive ? "#22c55e" : "#ef4444"; // green-500 or red-500
          
          // Map history array to recharts object format
          const chartData = item.history7d?.map((val, i) => ({ value: val, index: i })) || [];
          
          const min = Math.min(...(item.history7d || [0]));
          const max = Math.max(...(item.history7d || [100]));
          
          // Add a small padding to domain so sparklines don't touch the top/bottom edges
          const padding = (max - min) * 0.1;

          return (
            <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-border/40 hover:bg-background/60 transition-colors">
              <div className="flex flex-col w-1/3">
                <span className="font-medium text-foreground text-sm">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.symbol}</span>
              </div>
              
              <div className="h-10 w-1/3 opacity-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <YAxis domain={[min - padding, max + padding]} hide />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={strokeColor} 
                      strokeWidth={1.5} 
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col items-end w-1/3">
                <span className="font-medium text-foreground text-sm">
                  {item.type === 'crypto' || item.type === 'currency' ? '$' : '₹'}
                  {item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={cn(
                  "flex items-center text-xs px-1.5 py-0.5 rounded-sm mt-1",
                  isPositive ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
                )}>
                  {isPositive ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                  {Math.abs(item.change24h).toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
