import { get } from '@/SecureStore';
import { PricePoint } from '@/type';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? require('@/apiKey').default;


export const fetchAllCoins = async () => {
  try {
    
    const apiKey = await get('COINGECKO_API_KEY');
    
    if (!apiKey) throw new Error('API key not found in SecureStore');

    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h,24h,7d',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};


export const fetchCoinChartData = async (
  coinId: string,
  vsCurrency = "usd",
  days = 1
): Promise<PricePoint[]> => {
  try {
    const apiKey = await get('COINGECKO_API_KEY');
    if (!apiKey) throw new Error('API key not found in SecureStore');

   
    let interval: string | undefined;
    if (days === 1) {
      interval = undefined; 
    } else if (days <= 90) {
      interval = 'hourly';
    } else {
      interval = 'daily';
    }

    const url = new URL(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`);
    url.searchParams.append('vs_currency', vsCurrency);
    url.searchParams.append('days', days.toString());
    if (interval) url.searchParams.append('interval', interval);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

 
    const formatted: PricePoint[] = data.prices.map(
      ([timestamp, price]: [number, number]) => ({
        x: new Date(timestamp),
        y: price,
      })
    );

    return formatted;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    throw error;
  }
};
