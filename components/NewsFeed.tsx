"use client";

import { useState, useMemo } from "react";
import { Article } from "@/lib/rss";
import { CategoryFilter } from "./CategoryFilter";
import { NewsCard } from "./NewsCard";
import { IndiaMap } from "./IndiaMap";
import { motion, AnimatePresence } from "framer-motion";

interface NewsFeedProps {
  initialArticles: Article[];
}

export function NewsFeed({ initialArticles }: NewsFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeState, setActiveState] = useState<string | null>(null);

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

  const filteredArticles = initialArticles.filter(a => {
    const categoryMatch = activeCategory === "All" || a.category === activeCategory;
    const stateMatch = activeState === null || a.state === activeState;
    return categoryMatch && stateMatch;
  });

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-20">
      
      {/* Main Feed Column */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md">
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => (
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
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No articles found matching the selected filters.
            </div>
          )}
        </motion.div>
      </div>

      {/* Side Panel: India Map */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 lg:mt-[72px]">
        <div className="sticky top-20">
          <IndiaMap 
            stateCounts={stateCounts}
            activeState={activeState}
            onStateSelect={setActiveState}
          />
        </div>
      </div>

    </div>
  );
}
