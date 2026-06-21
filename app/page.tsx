import { fetchNewsFeed } from "@/lib/rss";
import { fetchMarketData } from "@/lib/markets";
import { NewsFeed } from "@/components/NewsFeed";
import { Ticker } from "@/components/Ticker";
import { BreakingAlertManager } from "@/components/BreakingAlertManager";
import { MarketDashboard } from "@/components/MarketDashboard";

// Revalidate this page every 5 minutes for relatively fresh market & news data
export const revalidate = 300;

export default async function Home() {
  const articles = await fetchNewsFeed();
  const marketData = await fetchMarketData();

  return (
    <div className="flex flex-col w-full">
      <BreakingAlertManager articles={articles} />
      <Ticker data={marketData} />
      
      <div className="flex flex-col gap-16 mt-8">
        {/* Primary Focus: Economics & Market Grid */}
        <section>
          <MarketDashboard />
        </section>

        {/* Secondary Focus: News & Geotagging */}
        <section className="border-t border-border/50 pt-10">
          <div className="space-y-1 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Market News & Intelligence</h2>
            <p className="text-muted-foreground">AI-summarized news aggregated in real-time across India.</p>
          </div>
          <NewsFeed initialArticles={articles} marketData={marketData} />
        </section>
      </div>
    </div>
  );
}
