import { fetchNewsFeed } from "@/lib/rss";
import { fetchMarketData } from "@/lib/markets";
import { NewsFeed } from "@/components/NewsFeed";
import { Ticker } from "@/components/Ticker";
import { BreakingAlertManager } from "@/components/BreakingAlertManager";

// Revalidate this page every 5 minutes for relatively fresh market & news data
export const revalidate = 300;

export default async function Home() {
  const articles = await fetchNewsFeed();
  const marketData = await fetchMarketData();

  return (
    <div className="flex flex-col w-full">
      <BreakingAlertManager articles={articles} />
      <Ticker data={marketData} />
      
      <div className="flex flex-col gap-6 mt-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Top Stories</h1>
          <p className="text-muted-foreground">Aggregated in real-time across India's top sources.</p>
        </div>
        
        <NewsFeed initialArticles={articles} marketData={marketData} />
      </div>
    </div>
  );
}
