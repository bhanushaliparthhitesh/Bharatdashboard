import { Article } from "@/lib/rss";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsCard({ article }: { article: Article }) {
  const timeAgo = formatDistanceToNow(new Date(article.pubDate), { addSuffix: true });

  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="block group h-full">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-muted/40 flex flex-col">
        {article.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden bg-muted flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            {/* Using standard img to bypass Next.js image domain configs for MVP */}
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
        <CardContent className={cn("p-5 flex-grow", !article.imageUrl && "pt-6")}>
          {!article.imageUrl && (
            <Badge variant="outline" className="mb-3 text-xs font-normal">
              {article.category}
            </Badge>
          )}
          <h3 className="font-semibold text-lg leading-snug line-clamp-3 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-foreground/80">{article.source}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </CardFooter>
      </Card>
    </a>
  );
}
