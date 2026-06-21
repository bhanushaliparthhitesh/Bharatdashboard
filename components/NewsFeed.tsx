"use client";

import { useState } from "react";
import { Article } from "@/lib/rss";
import { CategoryFilter } from "./CategoryFilter";
import { NewsCard } from "./NewsCard";
import { motion, AnimatePresence } from "framer-motion";

interface NewsFeedProps {
  initialArticles: Article[];
}

export function NewsFeed({ initialArticles }: NewsFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = Array.from(new Set(initialArticles.map(a => a.category).filter(c => c !== "Top Stories")));

  const filteredArticles = activeCategory === "All" 
    ? initialArticles 
    : initialArticles.filter(a => a.category === activeCategory);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="sticky top-14 z-40 bg-background/95 backdrop-blur-md">
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelect={setActiveCategory} 
        />
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20"
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
            No articles found for this category.
          </div>
        )}
      </motion.div>
    </div>
  );
}
