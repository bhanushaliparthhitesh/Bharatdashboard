# Project Research: Features

## Table Stakes
Features users absolutely expect in a modern news dashboard:
- Continuous live aggregation from top sources
- Categorized feeds (Politics, Business, Tech, Sports, etc.)
- Clear attribution, source logos, and timestamps
- Responsive, mobile-first reading experience

## Differentiators
Features that set this product apart from standard RSS readers:
- **AI-Generated Briefs**: Clustering duplicate stories and providing a 3-5 sentence neutral synthesis via Groq.
- **Geographic Context**: An interactive India map (react-simple-maps) highlighting regional story density and top headlines per state.
- **Unified Markets Tracker**: Combining NIFTY, SENSEX, Crypto, and Currency in a single glance.
- **Smart Breaking News Alerts**: Browser push notifications triggered by keyword density and source credibility scoring.

## Anti-features (What NOT to build yet)
- **User Accounts & Personalization**: Too much friction for v1. Focus on a zero-login unified feed first.
- **Native Mobile Apps**: Requires maintaining separate codebases. A responsive PWA is sufficient for v1.
- **Complex NLP (Entity Extraction)**: Heavy and expensive for v1. Defer to v2.0.
