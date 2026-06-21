"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/rss";
import { CategoryFilter } from "./CategoryFilter";
import { NewsCard } from "./NewsCard";
import { IndiaMap } from "./IndiaMap";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Inbox } from "lucide-react";

interface NewsFeedProps {
  initialArticles: Article[];
}

const ITEMS_PER_PAGE = 12;

export function NewsFeed({ initialArticles }: NewsFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeState, setActiveState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const categories = Array.from(new Set(initialArticles.map(a => a.category).filter(c => c !== "Top Stories")));

  // Calculate state counts based on ALL articles
  const stateCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialArticles.forEach(a => {
      if (a.state) {
        counts[a.state] = (counts[a.state] || 0) + 1;
      }
    });
    return counts;
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter(a => {
      const categoryMatch = activeCategory === "All" || a.category === activeCategory;
      const stateMatch = activeState === null || a.state === activeState;
      const searchMatch = searchQuery === "" || 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (a.contentSnippet && a.contentSnippet.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return categoryMatch && stateMatch && searchMatch;
    });
  }, [initialArticles, activeCategory, activeState, searchQuery]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on search
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleStateSelect = (state: string | null) => {
    setActiveState(state);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-20">
      
      {/* Main Feed Column */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md pb-2 pt-2 shadow-sm border-b border-border/40">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center w-full mb-3 px-1">
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelect={handleCategorySelect} 
            />
            <div className="relative w-full md:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search news..." 
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/70"
              />
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {visibleArticles.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <NewsCard article={article} />
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredArticles.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Inbox className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground/90 mb-2">No news found</h3>
              <p className="text-muted-foreground max-w-sm">
                We couldn't find any articles matching your filters or search query. Try clearing your filters or map selection.
              </p>
            </div>
          )}
        </motion.div>

        {filteredArticles.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="px-6 py-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full font-medium transition-colors shadow-sm"
            >
              Load More News
            </button>
          </div>
        )}
      </div>

      {/* Side Panel: India Map */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:mt-[72px]">
        <div className="sticky top-20">
          <IndiaMap 
            stateCounts={stateCounts}
            activeState={activeState}
            onStateSelect={handleStateSelect}
          />
        </div>
      </div>

    </div>
  );
}
