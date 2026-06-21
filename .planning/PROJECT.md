# Bharat Monitor

## What This Is

A real-time India-focused news intelligence dashboard. It aggregates news from 30+ Indian and international sources, synthesises them into AI-powered briefs, visualises stories on an interactive India map, tracks domestic financial markets, and delivers breaking news alerts — all in a single, fast, deployable web app.

## Core Value

The single tab an Indian reader opens to stay informed — providing situational awareness through noise reduction and geographic context.

## Business Context

- **Customer**: Students, young professionals, journalists, investors, and NRIs
- **Revenue model**: Future scoping (Newsletter, API access, Sponsored sections, White-label)
- **Success metric**: DAU (Target: 5,000 at 90 days), Session duration (> 5 min)
- **Strategy notes**: Focus on utility and speed first; monetise post-traction.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Scaffold Phase 0 (Next.js 14, Tailwind, Upstash, Vercel deploy)
- [ ] Live News Feed (Phase 1) with RSS deduplication and category filters
- [ ] India Map with Regional News Pins (Phase 2)
- [ ] AI-Generated Briefs & Morning Digest via Groq (Phase 3)
- [ ] Markets Tracker Panel (Phase 4)
- [ ] Breaking News Push Alerts (Phase 5)

### Out of Scope

- [ ] Personalisation (Accounts, saved categories) — Deferred to v1.1
- [ ] Regional Language Support (Hindi/Marathi feeds) — Deferred to v1.2
- [ ] Election Mode & Live Results — Deferred to v1.3
- [ ] Deep Intelligence Layer (NER, sentiment analysis) — Deferred to v2.0
- [ ] Community Layer (Comments, upvotes) — Deferred to v2.1
- [ ] Native Mobile App (React Native) — Deferred to v3.0

## Context

The Indian news ecosystem is heavily fragmented and noisy. Bharat Monitor seeks to reduce this noise using aggressive clustering and AI synthesis (Groq) while adding geographic context (react-simple-maps) that national platforms lack. Data sources rely on free RSS feeds, unofficial Yahoo Finance APIs, and CoinGecko to keep running costs negligible on free tiers (Vercel, Upstash).

## Constraints

- **Tech Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui — Chosen for rapid UI iteration and API route colocation.
- **Timeline**: 30 days to v1.0 launch.
- **Budget**: Must operate entirely on free tiers (Vercel 100GB/100k, Upstash Redis/QStash, Groq free tier).
- **APIs**: Reliance on free RSS feeds to bypass commercial NewsAPI restrictions.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| RSS over NewsAPI | Free, no rate limits, fast updates for Indian sources | — Pending |
| Groq over OpenAI | Fast (~500 tokens/sec), cost-effective (free tier generous) | — Pending |
| react-simple-maps | No tile server needed, SVG based, fully styleable via Tailwind | — Pending |
| Service worker push | Native browser standard, no third-party lock-in (OneSignal/Firebase) | — Pending |
| Aggressive Caching | Caching Groq summaries and market data in Redis prevents API limit exhaustion | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Business Context check (if present) — customer, revenue model, success metric still accurate?
4. Audit Out of Scope — reasons still valid?
5. Update Context with current state

---
*Last updated: 2026-06-21 after initialization*
