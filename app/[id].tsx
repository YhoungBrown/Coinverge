import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CoinData } from '@/type';
import { useLocalSearchParams } from 'expo-router';

export default function CoinPage() {
  const { id, coin } = useLocalSearchParams<{ id: string; coin?: string }>();

  const coinData: CoinData | null = coin ? JSON.parse(coin) : null;

  return (
    <ThemedView>
       <ThemedText>Coin ID: {id}</ThemedText>
      {coinData && <ThemedText>Name: {coinData.name}</ThemedText>}
    </ThemedView>
  );
}
