import { RootState } from '@/reduxStore';
import { PricePoint } from '@/type';
import { useSelector } from 'react-redux';


export const useChartDataFromStore = (coinId: string): PricePoint[] => {
  
  const coins = useSelector((state: RootState) => state.coins.coins);

 
  const coin = coins.find(c => c.id === coinId);

  if (!coin) return [];

  const dataPoints = [
    { x: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), y: coin.current_price / (1 + (coin.price_change_percentage_7d_in_currency ?? 0) / 100) },
    { x: new Date(Date.now() - 24 * 60 * 60 * 1000), y: coin.current_price / (1 + (coin.price_change_percentage_24h_in_currency ?? 0) / 100) },
    { x: new Date(Date.now() - 60 * 60 * 1000), y: coin.current_price / (1 + (coin.price_change_percentage_1h_in_currency ?? 0) / 100) },
    { x: new Date(), y: coin.current_price },
  ];

  return dataPoints;
};
