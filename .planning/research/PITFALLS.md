# Project Research: Pitfalls

## Common Mistakes in News Dashboards

**1. API Rate Limit Exhaustion**
- *Warning signs*: UI breaking during high traffic; 429 Too Many Requests errors from NewsAPI or external services.
- *Prevention*: Aggressive Redis caching. The browser should rarely, if ever, hit an external API directly. It should only hit Next.js API routes, which read from Upstash.
- *Phase Mapping*: Must be addressed immediately in Phase 1 (News Feed Core).

**2. RSS Feed Format Inconsistencies**
- *Warning signs*: Missing titles, empty images, or malformed dates from certain publishers.
- *Prevention*: Use a robust parsing library like `rss-parser` and implement a strict normalization function that provides fallbacks for missing fields before caching.
- *Phase Mapping*: Addressed in Phase 1.

**3. State Tagging False Positives**
- *Warning signs*: An article about a "New Delhi" restaurant being tagged as a major national political event, or misinterpreting a person's name as a city.
- *Prevention*: Keep the keyword dictionary focused on highly specific regional markers and exclude highly ambiguous terms. Consider adding a manual flag mechanism for users.
- *Phase Mapping*: Addressed in Phase 2.

**4. Push Notification Spam**
- *Warning signs*: High opt-out rates from users receiving too many alerts.
- *Prevention*: strict scoring thresholds. Only trigger alerts for articles that exceed a high threshold of breaking keywords AND source credibility.
- *Phase Mapping*: Addressed in Phase 5.
