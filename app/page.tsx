import { fetchNewsFeed } from "@/lib/rss";
import { fetchMarketData } from "@/lib/markets";
import { NewsFeed } from "@/components/NewsFeed";
import { Ticker } from "@/components/Ticker";
import { MarketDashboard } from "@/components/MarketDashboard";
import { TacticalMap } from "@/components/TacticalMap";

// Revalidate this page every 5 minutes for relatively fresh market & news data
export const revalidate = 300;

export default async function Home() {
  const articles = await fetchNewsFeed();
  const marketData = await fetchMarketData();

  return (
    <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden bg-black text-primary font-mono">
      {/* Background Map Layer */}
      <TacticalMap />

      {/* Floating Tactical Overlay Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between">
        
        {/* Top Floating Ticker */}
        <div className="pointer-events-auto bg-black/80 border border-primary/30 backdrop-blur-sm rounded-sm mb-4">
          <Ticker data={marketData} />
        </div>
        
        <div className="flex h-full gap-4 overflow-hidden">
          {/* Left Panel: Market Data */}
          <div className="w-[450px] flex-shrink-0 h-full overflow-y-auto overflow-x-hidden pointer-events-auto bg-black/60 border border-border/50 backdrop-blur-md rounded-sm p-4 custom-scrollbar">
            <h2 className="text-sm font-bold tracking-widest text-primary border-b border-primary/30 pb-2 mb-4 uppercase">Economic Intelligence</h2>
            <MarketDashboard />
          </div>

          {/* Right Panel: News Feed */}
          <div className="w-[400px] flex-shrink-0 h-full overflow-y-auto overflow-x-hidden pointer-events-auto bg-black/60 border border-border/50 backdrop-blur-md rounded-sm p-4 custom-scrollbar absolute right-4">
            <div className="flex items-center justify-between border-b border-primary/30 pb-2 mb-4">
              <h2 className="text-sm font-bold tracking-widest text-destructive uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
                Intercepted Intel
              </h2>
            </div>
            <NewsFeed initialArticles={articles} marketData={marketData} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
