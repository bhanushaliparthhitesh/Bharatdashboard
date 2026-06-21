# Requirements

## v1 Requirements

### Core
- [ ] **CORE-01**: User can view a continuous live feed of news aggregated from 15+ Indian outlets.
- [ ] **CORE-02**: System automatically deduplicates articles using title similarity hash.
- [ ] **CORE-03**: User can filter the feed by categories (Politics, Business, Tech, Sports, Entertainment, Science, World, Crime, Environment).
- [ ] **CORE-04**: Feed updates automatically every 10 minutes via background revalidation.

### Geo
- [ ] **GEO-01**: User can view an interactive SVG India map.
- [ ] **GEO-02**: System automatically tags articles to states via keyword dictionary (state names + major cities + districts).
- [ ] **GEO-03**: User can click a state on the map to see a filtered news feed for that state.
- [ ] **GEO-04**: User can hover over a state to see its top headline in a tooltip.
- [ ] **GEO-05**: Map displays a heatmap overlay based on story density in the last 24 hours.

### AI
- [ ] **AI-01**: System clusters articles on the same story across sources (>60% similarity).
- [ ] **AI-02**: System generates a 3-5 sentence neutral brief for story clusters using Groq API.
- [ ] **AI-03**: User can read a daily "Morning Brief" digest card updated at 7 AM IST.

### Markets
- [ ] **MKT-01**: User can view a scrolling ticker bar with indices (NIFTY 50, SENSEX), Crypto (BTC, ETH, SOL), and Currency.
- [ ] **MKT-02**: User can view a dedicated Markets panel with top gainers/losers and 7-day sparkline charts.

### Alerts
- [ ] **ALRT-01**: User can opt-in to breaking news alerts via browser Web Push API.
- [ ] **ALRT-02**: System triggers push notifications for articles scoring above threshold (keyword density + source credibility).
- [ ] **ALRT-03**: Notification links directly to the full article.

## v2 Requirements (Deferred)
- **V2-01**: User accounts and personalization (saved categories).
- **V2-02**: Regional Language Support (Hindi/Marathi feeds).
- **V2-03**: Election Mode & Live Results.
- **V2-04**: Deep Intelligence Layer (Named Entity Recognition, sentiment analysis).
- **V2-05**: Community features (comments, upvotes).
- **V2-06**: Native Mobile App.

## Out of Scope
- **User Authentication in v1**: Friction is too high for initial launch; focus is on anonymous utility.
- **Complex NLP/Entity Extraction in v1**: Too computationally expensive and complex for initial timeline; deferred to v2.

## Traceability

| Requirement | Phase |
|-------------|-------|
| CORE-01 | Phase 1 |
| CORE-02 | Phase 1 |
| CORE-03 | Phase 1 |
| CORE-04 | Phase 1 |
| GEO-01 | Phase 2 |
| GEO-02 | Phase 2 |
| GEO-03 | Phase 2 |
| GEO-04 | Phase 2 |
| GEO-05 | Phase 2 |
| AI-01 | Phase 3 |
| AI-02 | Phase 3 |
| AI-03 | Phase 3 |
| MKT-01 | Phase 4 |
| MKT-02 | Phase 4 |
| ALRT-01 | Phase 5 |
| ALRT-02 | Phase 5 |
| ALRT-03 | Phase 5 |
