# Project Research Summary

## Key Findings

**Stack:** Next.js 14, Tailwind CSS, Upstash Redis, Groq (llama-3.1-8b-instant), react-simple-maps.
**Table Stakes:** Real-time RSS aggregation, fast deduplication, category filtering.
**Watch Out For:** API rate limit exhaustion (needs aggressive Redis caching) and RSS format inconsistencies.

## Implications for Roadmap
- Prioritize the core RSS parsing, normalization, and Redis caching pipeline as the absolute foundation (Phase 1).
- Keep UI components separate from data ingestion logic to allow Next.js ISR and background polling to work efficiently.
- Roll out features sequentially: Feed -> Map -> AI Briefs -> Markets -> Alerts.

## Sources
Synthesized from project requirements and standard web architecture practices for high-volume aggregators.
