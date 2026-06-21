# Project Roadmap

## Phase 0: Scaffold
**Goal:** Initialize the project repository, install dependencies, configure Vercel deploy, and set up Redis/KV.
**Mode:** mvp
**Requirements:** None
**Success Criteria:**
1. Next.js 14 app deployed to Vercel and accessible via live URL.
2. Tailwind CSS and shadcn/ui configured.
3. Upstash Redis and Vercel KV environment variables set up.

## Phase 1: News Feed Core
**Goal:** Build the foundational RSS aggregation pipeline, deduplication, and main UI feed.
**Mode:** mvp
**Requirements:** CORE-01, CORE-02, CORE-03, CORE-04
**Success Criteria:**
1. Background worker fetches from 15+ RSS feeds successfully.
2. Deduplication hash prevents identical headlines from showing up multiple times.
3. UI displays categorized news cards that update every 10 minutes.

## Phase 2: Geo Tagging & India Map
**Goal:** Add spatial awareness to news stories and build the interactive map dashboard.
**Mode:** mvp
**Requirements:** GEO-01, GEO-02, GEO-03, GEO-04, GEO-05
**Success Criteria:**
1. Articles are accurately tagged with state metadata based on keyword matching.
2. Interactive SVG India map renders correctly.
3. Clicking a state filters the feed; hovering shows top headline.

## Phase 3: AI Summaries
**Goal:** Integrate Groq API to provide AI-generated cluster briefs and a daily morning digest.
**Mode:** mvp
**Requirements:** AI-01, AI-02, AI-03
**Success Criteria:**
1. Similar articles cluster correctly based on Levenshtein distance.
2. Groq generates neutral 3-5 sentence summaries for story clusters.
3. Daily Morning Brief appears at the top of the feed after 7 AM IST.

## Phase 4: Markets Panel
**Goal:** Provide financial awareness through a unified indices, crypto, and currency tracker.
**Mode:** mvp
**Requirements:** MKT-01, MKT-02
**Success Criteria:**
1. Scrolling ticker bar displays live NIFTY, SENSEX, BTC, ETH, and USD/INR rates.
2. Dedicated Markets panel displays 7-day sparkline charts for indices.

## Phase 5: Breaking News Alerts
**Goal:** Deliver browser push notifications for highly critical breaking news.
**Mode:** mvp
**Requirements:** ALRT-01, ALRT-02, ALRT-03
**Success Criteria:**
1. Users can opt-in to web push notifications successfully.
2. Scoring engine triggers alert only on critical stories exceeding the threshold.
3. Push notification appears and routes user to the story when clicked.

## Phase 6: Polish & Launch
**Goal:** Finalize SEO, PWA features, performance, and launch the application.
**Mode:** mvp
**Requirements:** None
**Success Criteria:**
1. Lighthouse score > 85.
2. Dark mode fully implemented and functional.
3. Sitemap, Open Graph images, and PWA manifest configured.
