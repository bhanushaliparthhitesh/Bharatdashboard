"use client";

import { useEffect } from "react";
import { Article } from "@/lib/rss";

export function BreakingAlertManager({ articles }: { articles: Article[] }) {
  useEffect(() => {
    // Only proceed if notifications are supported and granted
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return;
    }

    // Scoring engine: highly critical keywords
    const breakingKeywords = [
      "breaking", "urgent", "just in", "exclusive", 
      "alert", "massive", "live updates", "flash"
    ];
    
    const now = new Date().getTime();
    
    const breakingArticles = articles.filter(a => {
      const pubTime = new Date(a.pubDate).getTime();
      const hoursDiff = (now - pubTime) / (1000 * 60 * 60);
      
      // Only care about news from the last 12 hours
      if (hoursDiff > 12) return false;
      
      const titleLower = a.title.toLowerCase();
      return breakingKeywords.some(kw => titleLower.includes(kw));
    });

    if (breakingArticles.length === 0) return;

    // Get already notified IDs from localStorage
    const notifiedIdsStr = localStorage.getItem("bharat_notified_articles") || "[]";
    let notifiedIds: string[] = [];
    try {
      notifiedIds = JSON.parse(notifiedIdsStr);
    } catch(e) {
      console.error("Failed to parse notified IDs");
    }

    // Find new breaking news we haven't alerted the user about yet
    const newBreaking = breakingArticles.filter(a => !notifiedIds.includes(a.id));

    if (newBreaking.length > 0) {
      // Just take the absolute most recent one to avoid spamming 10 notifications
      const target = newBreaking[0];
      
      const n = new Notification("🚨 Breaking News", {
        body: target.title,
        // Only use the image if it's securely available, otherwise fallback to default
        icon: "/favicon.ico", 
        tag: "breaking-news-" + target.id
      });

      n.onclick = () => {
        // Route user to the story
        window.open(target.link, "_blank");
        window.focus();
        n.close();
      };

      // Mark as notified and keep only the last 50 to prevent localStorage bloat
      notifiedIds.push(target.id);
      localStorage.setItem("bharat_notified_articles", JSON.stringify(notifiedIds.slice(-50)));
    }
  }, [articles]);

  // This component handles logic only; it renders nothing.
  return null;
}
