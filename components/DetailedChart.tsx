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
      <div className="flex flex-col items-center justify-center h-[300px] bg-card border border-border/50 rounded-xl">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] bg-card border border-border/50 rounded-xl">
        <p className="text-muted-foreground">Failed to load {name}</p>
        <button onClick={() => removeTicker(symbol)} className="mt-2 text-red-500 text-sm hover:underline">Remove</button>
      </div>
    );
  }

  const isPositive = data.change >= 0;
  const strokeColor = isPositive ? "#22c55e" : "#ef4444";
  const fillColor = isPositive ? "url(#colorPositive)" : "url(#colorNegative)";

  return (
    <div className="flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden group">
      <div className="p-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-foreground truncate max-w-[200px]">{data.name}</h3>
          <p className="text-sm text-muted-foreground">{symbol}</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">{data.price.toFixed(2)}</span>
            <button 
              onClick={() => removeTicker(symbol)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-500 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {data.change > 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="h-[200px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.chart} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #262626', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#a3a3a3', marginBottom: '4px' }}
              formatter={(value: any) => [typeof value === 'number' ? value.toFixed(2) : value, "Price"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke={strokeColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={fillColor} 
            />
            <YAxis domain={['auto', 'auto']} hide />
            <XAxis dataKey="date" hide />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-2 p-2 border-t border-border/30 bg-muted/20">
        {(["1d", "5d", "1mo", "3mo", "6mo", "1y"] as TimeRange[]).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`text-xs px-2 py-1 rounded transition-colors ${range === r ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
