import CryptoChart from '@/components/chart';
import CoinInfo from '@/components/coinInfo';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import styles from '@/stylesheet/SingleCoinPageStylesheet';
import { CoinData, PricePoint } from '@/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchChartData } from "../components/chartHelper";


export default function CoinPage() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const {theme} = useThemeContext();
  const { id, coin } = useLocalSearchParams<{ id: string; coin?: string }>();


  const [chartData, setChartData] = useState<PricePoint[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

  const coinData: CoinData | null = coin ? JSON.parse(coin) : null;





  useEffect(() => {
    const loadChart = async () => {
      if (!id) return;
  
      setLoading(true);
      const chart = await fetchChartData(id);
      
      setChartData(chart);
      setLoading(false);
    };
  
    loadChart();
  }, [id]);


  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <ThemedView style={{
      paddingTop: inset.top, 
      paddingBottom: inset.bottom - 10,
      backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
      flex: 1,
      ...styles.container
    }}>
       
       <TouchableOpacity
          onPress={router.back} 
          style={{
            ...styles.arrowback,
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
          }}
        >
          <Ionicons 
            name="arrow-back" 
            size={30} 
            color={theme === 'dark' ? "#fff" : "#000"}
          />
       </TouchableOpacity>
     
        <ThemedView style={{ backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', marginTop: 35}}/>

          {coinData && chartData && (
            <CryptoChart
              coinId={coinData.id}
              title={`${coinData.name} (${coinData.symbol.toUpperCase()})`}
              data={chartData}
            />
          )}
          

          <ThemedView style={{
            ...styles.percentageChangeOuterContainer, 
              backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff'
          }}>

            <ThemedView style={{
              ...styles.percentageChangeContainer,
               backgroundColor: theme === 'dark' ? "#d4d4d4ff" : "#d4d4d4ff",
            }}>
              <ThemedText
                style= {{
                  color: coinData?.price_change_percentage_1h_in_currency &&  coinData?.price_change_percentage_1h_in_currency > 0 ? "green" : "red",
                  ...styles.percentageChangeText
                }}
              >
                {coinData?.price_change_percentage_1h_in_currency?.toFixed(2)}% change / hr
              </ThemedText>
            </ThemedView>

            <ThemedView
              style={{
                ...styles.percentageChangeContainer,
                 backgroundColor: theme === 'dark' ? "#d4d4d4ff" : "#d4d4d4ff",
              }}
            >
              <ThemedText
               style= {{
                color: coinData?.price_change_percentage_24h_in_currency &&  coinData?.price_change_percentage_24h_in_currency > 0 ? "green" : "red",
                  ...styles.percentageChangeText
                }}
              >
                {coinData?.price_change_percentage_24h_in_currency?.toFixed(2)}% change / 1d
              </ThemedText>
            </ThemedView>

            <ThemedView
              style={{
                ...styles.percentageChangeContainer,
                backgroundColor: theme === 'dark' ? "#d4d4d4ff" : "#d4d4d4ff",
              }}
            >
              <ThemedText
               style= {{
                color: coinData?.price_change_percentage_7d_in_currency &&  coinData?.price_change_percentage_7d_in_currency > 0 ? "green" : "red",
                  ...styles.percentageChangeText
                }}
              >
                {coinData?.price_change_percentage_7d_in_currency?.toFixed(2)}% change / 7d
              </ThemedText>
            </ThemedView>

          </ThemedView>         
    
          <CoinInfo coinData={coinData} />

            
            <ThemedView style= {{
              ...styles.buttonContainer, 
              backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff'
              }}
            >
              <TouchableOpacity style={{
                backgroundColor: theme === 'dark' ? "#fea500" : "#ffb74d",
                ...styles.btn}}>
                <ThemedText style= {{
                  ...styles.btnText,
                  color: theme === 'dark' ? "#fff" : "#000"
                }}>
                  Buy Coin
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={{
                backgroundColor: 'red',
                ...styles.btn
                }}
                >
                <ThemedText style= {{
                  ...styles.btnText,
                  color: theme === 'dark' ? "#fff" : "#000"
                }}>
                  Sell Coin
                </ThemedText>
              </TouchableOpacity>

            </ThemedView>
         



       {loading && (
          <ThemedView style={[
            styles.activityIndicator, 
            { backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', }]}
          >
            <ActivityIndicator size="large" color={theme === 'dark' ? "#fea500" : "#ffb74d"} />
          </ThemedView>
        )}
    </ThemedView>
  );
}
