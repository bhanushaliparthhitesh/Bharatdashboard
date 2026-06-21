"use client";

import { useState, useTransition } from "react";
import { Article } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateSummary } from "@/app/actions/summarize";
import { motion, AnimatePresence } from "framer-motion";

export function NewsCard({ article }: { article: Article }) {
  const timeAgo = formatDistanceToNow(new Date(article.pubDate), { addSuffix: true });
  
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSummarize = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if wrapped in an anchor
    e.stopPropagation(); // Stop event bubbling
    
    if (summary) {
      setIsExpanded(!isExpanded);
      return;
    }

    setIsExpanded(true);
    startTransition(async () => {
      const result = await generateSummary(article.title, article.contentSnippet);
      setSummary(result);
    });
  };

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-muted/40 flex flex-col relative">
      <a href={article.link} target="_blank" rel="noopener noreferrer" className="block flex-grow flex flex-col cursor-pointer">
        {article.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-muted flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <Badge className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur-md border-none text-white hover:bg-black/60">
              {article.category}
            </Badge>
          </div>
        )}
        <CardContent className={cn("p-5 flex-grow flex flex-col", !article.imageUrl && "pt-6")}>
          {!article.imageUrl && (
            <Badge variant="outline" className="mb-3 text-xs font-normal self-start">
              {article.category}
            </Badge>
          )}
          <h3 className="font-semibold text-lg leading-snug line-clamp-3 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardContent>
      </a>

      {/* Summary Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 overflow-hidden"
          >
            <div className="py-3 border-t border-muted/50 text-sm text-foreground/90 space-y-2">
              <div className="flex items-center gap-2 font-medium text-primary mb-2">
                <Sparkles className="h-4 w-4" /> AI Summary
              </div>
              {isPending ? (
                <div className="flex items-center gap-2 text-muted-foreground py-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Synthesizing...
                </div>
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed">
                  {summary}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardFooter className="px-5 pb-5 pt-3 flex items-center justify-between text-xs text-muted-foreground mt-auto bg-card/50">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-foreground/80">{article.source}</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSummarize}
            className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2.5 py-1.5 rounded-md font-medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{summary ? (isExpanded ? "Hide" : "Show") : "Summarize"}</span>
            {summary && (isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
          </button>
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
