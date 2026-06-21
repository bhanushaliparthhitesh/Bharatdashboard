# Project Research: Architecture

## Component Boundaries

1. **RSS Aggregator Layer (Server)**
   - Fetches XML from 15+ sources in parallel
   - Parses, normalizes, and dedupes (by title hash)
   - Caches normalized feed in Redis

2. **AI Synthesis Engine (Server)**
   - Groups similar articles using Levenshtein distance
   - Prompts Groq API for summarized briefs
   - Caches generated briefs by cluster ID

3. **Geo-Tagging Engine (Server/Edge)**
   - Matches article text against a city/district/state dictionary
   - Appends state metadata to normalized articles

4. **Markets Data Fetcher (Server)**
   - Periodically polls Yahoo Finance and CoinGecko
   - Caches results for rapid client delivery

5. **Client UI (Browser)**
   - Renders Server Components (App Router)
   - Manages local state (active category, active map state) using Zustand
   - Service worker listens for Web Push alerts

## Data Flow
- **RSS Ingestion**: Cron/ISR -> RSS Parser -> Deduplicator -> Redis -> API Route -> UI
- **Summarization**: Cron (QStash) -> Top Stories -> Groq API -> Vercel KV -> UI
- **Push Alerts**: Ingestion -> Scoring Engine -> Exceeds Threshold? -> Vercel KV Subscription Lookup -> Web Push -> Browser

## Build Order
1. RSS Ingestion & Normalization
2. Frontend Feed & Category UI
3. Geo-tagging & Map UI
4. AI Summarization Integration
5. Markets Data & Ticker UI
6. Web Push Alerts
