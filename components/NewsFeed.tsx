"use client";

import { Article } from "@/lib/rss";
import { MarketData } from "@/lib/markets";
import { ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NewsFeedProps {
  initialArticles: Article[];
  marketData: MarketData[];
}

export function NewsFeed({ initialArticles }: NewsFeedProps) {
  // Take only the latest 15 articles to keep the feed scrolling
  const visibleArticles = initialArticles.slice(0, 15);

  return (
    <div className="w-full flex flex-col gap-2 pb-2">
      {visibleArticles.length === 0 ? (
        <div className="p-4 border border-destructive/50 bg-black/40 text-center">
          <span className="text-destructive text-[10px] tracking-widest uppercase animate-pulse">NO INTEL DETECTED</span>
        </div>
      ) : (
        visibleArticles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-l-2 border-primary/40 pl-3 py-2 hover:bg-primary/5 hover:border-primary transition-all relative"
          >
            {/* Tactical category tag */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold tracking-widest uppercase text-primary/70 group-hover:text-primary">
                [{article.category || 'INTEL'}] {article.source}
              </span>
              <span className="text-[9px] text-muted-foreground tracking-widest">
                -{formatDistanceToNow(new Date(article.pubDate))}
              </span>
            </div>
            
            {/* Title */}
            <h4 className="text-xs font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>

            {/* Content Snippet */}
            {article.contentSnippet && (
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {article.contentSnippet}
              </p>
            )}

            <ExternalLink className="absolute right-2 top-2 h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
          </a>
        ))
      )}
    </div>
  );
}
