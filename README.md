<div align="center">
  <img src="https://img.shields.io/badge/STATUS-ACTIVE-brightgreen?style=for-the-badge&logo=appveyor" alt="Status Active" />
  <img src="https://img.shields.io/badge/DEFCON-2-red?style=for-the-badge" alt="DEFCON 2" />
  <img src="https://img.shields.io/badge/VERSION-2.8.0-blue?style=for-the-badge" alt="Version 2.8.0" />
</div>

<br />

<div align="center">
  <h1 align="center">🌍 BHARAT MONITOR</h1>
  <p align="center">
    <strong>A real-time India-focused open-source intelligence (OSINT) and economic dashboard.</strong>
  </p>
</div>

<br />

Bharat Monitor is a high-performance, tactical "Situation Room" dashboard designed to provide situational awareness through noise reduction and geographic context. It aggregates news from 30+ sources, synthesizes them into AI-powered briefs, tracks domestic and global financial markets, and visualizes geopolitical stories on an interactive map.

---

## ⚡ Features

- **🌐 Global Situation Map:** Interactive `react-simple-maps` instance displaying live intercepted incidents and high-alert conflict zones.
- **📈 Market Intelligence Terminal:** Real-time tracking of micro and macro economic data (Stocks, Crypto, Currencies) using Yahoo Finance data streams.
- **🧠 AI-Powered Intercepts:** Uses Groq AI to read, synthesize, and summarize high-density news feeds into actionable intelligence.
- **🖥️ Tactical HUD Interface:** A premium, dark-mode-exclusive OSINT aesthetic utilizing `JetBrains Mono`, neon tactical accents, and micro-animations.
- **🚨 Breaking News Alerts:** Native browser notifications for critical intercepted intel.

## 🛠️ Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Data Fetching & APIs:** `rss-parser`, `yahoo-finance2`
- **AI Integration:** [Groq SDK](https://console.groq.com/) (Llama-3 models)
- **Caching & State:** [Upstash Redis](https://upstash.com/), Zustand
- **Visuals & Charts:** `recharts`, `react-simple-maps`, `framer-motion`

---

## 🚀 Getting Started

### Prerequisites

You will need Node.js 18+ and accounts for the following services to obtain API keys:
- [Groq](https://console.groq.com/) (Free Tier)
- [Upstash](https://upstash.com/) (Free Redis Database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bharat-monitor.git
   cd bharat-monitor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required variables:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   UPSTASH_REDIS_REST_URL=your_upstash_url_here
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The terminal will be available at [http://localhost:3000](http://localhost:3000).*

---

## 🌐 Deployment (Vercel)

Bharat Monitor is heavily optimized for zero-configuration deployment on Vercel.

1. Push your code to a GitHub repository.
2. Import the repository into your Vercel Dashboard.
3. In the Vercel project settings, navigate to **Environment Variables** and add your `GROQ_API_KEY`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN`.
4. Click **Deploy**. Vercel will automatically detect the Next.js framework and handle the build process.

---

## 🔒 Security & Privacy
This dashboard operates entirely on client-provided API keys and does not store user telemetry or tracking data. All external data fetches are performed securely server-side.

<br/>

<div align="center">
  <p><i>"The single tab you need to stay informed."</i></p>
</div>
