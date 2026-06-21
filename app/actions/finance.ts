"use server";

// In yahoo-finance2 v3, the default export is a Class that must be instantiated.
const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });

export type TimeRange = "1d" | "5d" | "1mo" | "3mo" | "6mo" | "1y";

export interface ChartDataPoint {
  date: string;
  price: number;
}

export interface FinanceData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  chart: ChartDataPoint[];
}

const getInterval = (range: TimeRange): "1m" | "15m" | "1d" | "1wk" | "1mo" => {
  switch (range) {
    case "1d": return "15m";
    case "5d": return "15m";
    case "1mo": return "1d";
    case "3mo": return "1d";
    case "6mo": return "1d";
    case "1y": return "1wk";
    default: return "1d";
  }
};

const getPeriod1 = (range: TimeRange): Date => {
  const date = new Date();
  switch (range) {
    case "1d": date.setDate(date.getDate() - 1); break;
    case "5d": date.setDate(date.getDate() - 5); break;
    case "1mo": date.setMonth(date.getMonth() - 1); break;
    case "3mo": date.setMonth(date.getMonth() - 3); break;
    case "6mo": date.setMonth(date.getMonth() - 6); break;
    case "1y": date.setFullYear(date.getFullYear() - 1); break;
    default: date.setMonth(date.getMonth() - 1); break;
  }
  return date;
};

export async function fetchFinanceData(symbol: string, range: TimeRange = "1mo"): Promise<FinanceData | null> {
  try {
    const quote = (await yahooFinance.quote(symbol)) as any;
    const interval = getInterval(range);
    const period1Date = getPeriod1(range);
    // In yahoo-finance2 v3, historical() is deprecated and maps poorly to chart().
    // We use chart() directly and pass period1 as an ISO string.
    const chartData = (await yahooFinance.chart(symbol, {
      period1: period1Date.toISOString(),
      interval,
    })) as any;
    
    const chartRes = chartData.quotes || [];

    return {
      symbol: quote.symbol,
      name: quote.shortName || quote.longName || symbol,
      price: quote.regularMarketPrice || 0,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      currency: quote.currency || "INR",
      chart: chartRes.map((c: any) => ({
        date: c.date.toISOString(),
        price: c.close,
      })).filter((c: any) => c.price != null),
    };
  } catch (error) {
    console.error(`Error fetching finance data for ${symbol}:`, error);
    return null;
  }
}

export async function searchFinance(query: string) {
  try {
    const results = (await yahooFinance.search(query, { quotesCount: 5, newsCount: 0 })) as any;
    return results.quotes.map((q: any) => ({
      symbol: q.symbol,
      name: q.shortname || q.longname || q.symbol,
      exchange: q.exchange,
      type: q.quoteType
    }));
  } catch (error) {
    console.error(`Error searching finance for ${query}:`, error);
    return [];
  }
}
