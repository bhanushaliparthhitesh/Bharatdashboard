"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchFinanceData, FinanceData, TimeRange } from "@/app/actions/finance";
import { Loader2, TrendingUp, TrendingDown, Trash2 } from "lucide-react";
import { useMarketStore } from "@/store/marketStore";

interface DetailedChartProps {
  symbol: string;
  name: string;
}

export function DetailedChart({ symbol, name }: DetailedChartProps) {
  const [data, setData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<TimeRange>("1mo");
  const removeTicker = useMarketStore((state) => state.removeTicker);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchFinanceData(symbol, range).then((res) => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [symbol, range]);

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] bg-black/40 border border-primary/20 rounded-sm">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-[10px] text-primary mt-2 uppercase tracking-widest animate-pulse">Acquiring Data...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] bg-black/40 border border-destructive/50 rounded-sm">
        <p className="text-destructive text-xs uppercase tracking-widest">SIGNAL LOST: {name}</p>
        <button onClick={() => removeTicker(symbol)} className="mt-2 text-destructive/80 text-[10px] uppercase hover:text-destructive hover:underline">ABORT_TRACKING</button>
      </div>
    );
  }

  const isPositive = data.change >= 0;
  const strokeColor = isPositive ? "#22c55e" : "#ef4444";
  const fillColor = isPositive ? "url(#colorPositive)" : "url(#colorNegative)";

  return (
    <div className="flex flex-col bg-black/60 border border-primary/20 rounded-sm overflow-hidden group relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="p-3 flex items-start justify-between border-b border-primary/10">
        <div>
          <h3 className="font-bold text-sm text-primary uppercase tracking-widest truncate max-w-[150px]">{data.name}</h3>
          <p className="text-[10px] text-muted-foreground">{symbol}</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{data.price.toFixed(2)}</span>
            <button 
              onClick={() => removeTicker(symbol)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive/50 hover:text-destructive p-1"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
          <span className={`flex items-center text-[10px] font-bold tracking-widest ${isPositive ? 'text-primary' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {data.change > 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="h-[120px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.chart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`colorPositive-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id={`colorNegative-${symbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid var(--primary)', borderRadius: '2px', fontFamily: 'monospace' }}
              itemStyle={{ color: 'var(--primary)' }}
              labelStyle={{ color: '#888', marginBottom: '4px', fontSize: '10px' }}
              formatter={(value: any) => [typeof value === 'number' ? value.toFixed(2) : value, "VAL"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area 
              type="step" 
              dataKey="price" 
              stroke={strokeColor} 
              strokeWidth={1.5}
              fillOpacity={1} 
              fill={`url(#color${isPositive ? 'Positive' : 'Negative'}-${symbol})`} 
            />
            <YAxis domain={['auto', 'auto']} hide />
            <XAxis dataKey="date" hide />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between gap-1 p-1 border-t border-primary/10 bg-black/40">
        {(["1d", "5d", "1mo", "3mo", "6mo", "1y"] as TimeRange[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`text-[9px] px-2 py-1 rounded-sm uppercase tracking-widest transition-all ${range === r ? 'bg-primary text-black font-bold shadow-[0_0_5px_rgba(34,197,94,0.5)]' : 'text-muted-foreground hover:bg-primary/10'}`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
