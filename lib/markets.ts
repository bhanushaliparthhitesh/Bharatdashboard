import { cache } from './redis';

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  history7d: number[];
  type: 'index' | 'crypto' | 'currency';
}

// Generate realistic mock history so sparklines always have data
const generateMockHistory = (basePrice: number, volatility: number = 0.02): number[] => {
  let currentPrice = basePrice;
  const history = [currentPrice];
  for (let i = 0; i < 6; i++) {
    const change = currentPrice * (Math.random() * volatility * 2 - volatility);
    currentPrice += change;
    history.unshift(currentPrice); // Oldest first
  }
  return history;
};

const MOCK_DATA: MarketData[] = [
  {
    symbol: '^NSEI',
    name: 'NIFTY 50',
    price: 23567.85,
    change24h: 0.45,
    history7d: generateMockHistory(23567.85, 0.01),
    type: 'index'
  },
  {
    symbol: '^BSESN',
    name: 'SENSEX',
    price: 77200.50,
    change24h: 0.32,
    history7d: generateMockHistory(77200.50, 0.01),
    type: 'index'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 64230.00,
    change24h: -1.2,
    history7d: generateMockHistory(64230.00, 0.05),
    type: 'crypto'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3450.20,
    change24h: 2.1,
    history7d: generateMockHistory(3450.20, 0.06),
    type: 'crypto'
  },
  {
    symbol: 'USDINR',
    name: 'USD / INR',
    price: 83.55,
    change24h: -0.05,
    history7d: generateMockHistory(83.55, 0.002),
    type: 'currency'
  }
];

export async function fetchMarketData(): Promise<MarketData[]> {
  const cacheKey = 'market_data_cache';
  
  const cachedData = await cache.get<MarketData[]>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // In a production app, we would make calls to Yahoo Finance or CoinGecko here.
    // For example:
    // const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
    // const data = await cryptoRes.json();
    
    // Given the severe rate limits of free financial APIs, and to ensure the MVP is robust,
    // we will rely on realistic simulated mock data for this iteration.
    
    const freshData = MOCK_DATA.map(item => ({
      ...item,
      // Add slight random variations to simulate live changes if we're constantly re-fetching
      price: item.price * (1 + (Math.random() * 0.002 - 0.001)),
      change24h: item.change24h + (Math.random() * 0.2 - 0.1),
      history7d: generateMockHistory(item.price, item.type === 'crypto' ? 0.05 : 0.01)
    }));

    // Cache for 5 minutes
    await cache.set(cacheKey, freshData, 300);
    return freshData;

  } catch (error) {
    console.error("Failed to fetch market data, falling back to static mock", error);
    return MOCK_DATA;
  }
}
