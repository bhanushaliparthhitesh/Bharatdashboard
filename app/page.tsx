import { fetchNewsFeed } from "@/lib/rss";
import { NewsFeed } from "@/components/NewsFeed";

// Revalidate this page every 10 minutes
export const revalidate = 600;

export default async function Home() {
  const articles = await fetchNewsFeed();

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Top Stories</h1>
        <p className="text-muted-foreground">Aggregated in real-time across India's top sources.</p>
      </div>
      
      <NewsFeed initialArticles={articles} />
    </div>
  );
}
