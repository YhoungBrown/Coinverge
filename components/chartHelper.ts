import { PricePoint } from "@/type";

export const formatChartData = (prices: [number, number][]): PricePoint[] => {
  return prices.map(([timestamp, price]) => ({
    x: new Date(timestamp),
    y: price,
  }));
};

export const fetchChartData = async (coinId: string): Promise<PricePoint[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );

    const data = await response.json();

    if (!data.prices || !Array.isArray(data.prices)) {
      console.warn("No chart data available for coin:", coinId, data);
      return []; 
    }

    return formatChartData(data.prices);
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
    return []; 
  }
};
