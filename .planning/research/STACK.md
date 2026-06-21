# Project Research: Stack

## Summary
The standard stack for a real-time, highly-cached, low-latency news dashboard in 2026 relies heavily on edge compute and serverless caching to handle high traffic and frequent data polling without breaking the bank.

## Recommended Stack

**Core Framework**: Next.js 14 (App Router)
*Rationale*: Provides built-in ISR (Incremental Static Regeneration) and server components, essential for a news dashboard that updates every 10 minutes but must remain blazing fast.

**Language**: TypeScript
*Rationale*: Strong typing is critical when merging data from 30+ disparate RSS feeds and multiple third-party APIs.

**Styling**: Tailwind CSS + shadcn/ui
*Rationale*: Standard for rapid, consistent UI development.

**Caching & State**: Upstash Redis + Vercel KV
*Rationale*: A news dashboard must aggressively cache external API responses (RSS, Groq, Markets) to stay within free tier limits. Upstash provides serverless-friendly Redis.

**AI Processing**: Groq (llama-3.1-8b-instant)
*Rationale*: Speed is paramount. Groq delivers ~500 tokens/second, allowing near-instantaneous summarization of story clusters at very low/zero cost on free tiers.

**Map Visualization**: react-simple-maps + TopoJSON
*Rationale*: Avoids the need for a heavy tile server (like Leaflet). Renders directly to SVG, offline-capable, and easily styled with Tailwind.

## What NOT to use
- **Heavy Client-Side State Management (Redux)**: Overkill for a dashboard. Use Zustand or React Context for simple filters.
- **Traditional RDBMS (PostgreSQL/MySQL)**: Unnecessary for v1 since data is ephemeral (cached RSS and market data).
