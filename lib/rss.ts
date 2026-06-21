import Parser from 'rss-parser';
import { cache } from './redis';

export type Article = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  imageUrl?: string;
};

const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure'],
  },
});

const FEEDS = [
  { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', source: 'Times of India', category: 'Top Stories' },
  { url: 'https://feeds.feedburner.com/ndtvnews-top-stories', source: 'NDTV', category: 'Top Stories' },
  { url: 'https://www.thehindu.com/news/national/feeder/default.rss', source: 'The Hindu', category: 'Politics' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms', source: 'Times of India', category: 'Business' },
  { url: 'https://feeds.feedburner.com/ndtvprofit-latest', source: 'NDTV Profit', category: 'Business' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms', source: 'Times of India', category: 'Tech' },
  { url: 'https://www.thehindu.com/sport/feeder/default.rss', source: 'The Hindu', category: 'Sports' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms', source: 'Times of India', category: 'Entertainment' },
];

function generateId(title: string): string {
  // Simple hash/slug for deduplication
  return title.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export async function fetchNewsFeed(): Promise<Article[]> {
  const cacheKey = 'unified_news_feed';
  
  // Try to get from cache
  const cachedFeed = await cache.get<Article[]>(cacheKey);
  if (cachedFeed) {
    return cachedFeed;
  }

  const allArticles: Article[] = [];

  // Fetch all feeds in parallel
  const requests = FEEDS.map(async (feed) => {
    try {
      const parsed = await parser.parseURL(feed.url);
      return parsed.items.map(item => {
        // Attempt to extract image
        let imageUrl: string | undefined = undefined;
        if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
          imageUrl = item['media:content']['$'].url;
        } else if (item.enclosure && item.enclosure.url) {
          imageUrl = item.enclosure.url;
        } else {
          // Fallback image regex extraction from content if needed
          const imgRegex = /<img[^>]+src="([^">]+)"/g;
          const match = imgRegex.exec(item.content || '');
          if (match && match[1]) {
            imageUrl = match[1];
          }
        }

        return {
          id: generateId(item.title || ''),
          title: item.title || 'Untitled',
          link: item.link || '',
          pubDate: item.pubDate || new Date().toISOString(),
          source: feed.source,
          category: feed.category,
          imageUrl,
        } as Article;
      });
    } catch (e) {
      console.error(`Error fetching feed ${feed.url}:`, e);
      return [];
    }
  });

  const results = await Promise.all(requests);
  const flatResults = results.flat();

  // Deduplicate and sort by date descending
  const uniqueArticlesMap = new Map<string, Article>();
  for (const article of flatResults) {
    if (!article.title) continue;
    // Prefer articles with images if duplicates exist
    const existing = uniqueArticlesMap.get(article.id);
    if (!existing || (!existing.imageUrl && article.imageUrl)) {
      uniqueArticlesMap.set(article.id, article);
    }
  }

  const uniqueArticles = Array.from(uniqueArticlesMap.values()).sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  // Cache for 10 minutes (600 seconds)
  await cache.set(cacheKey, uniqueArticles, 600);

  return uniqueArticles;
}
