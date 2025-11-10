import CryptoChart from '@/components/chart';
import SingleCoin from '@/components/SingleCoin';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import { setCoins } from '@/reduxSlice/CoinsSlice';
import { RootState } from '@/reduxStore';
import { fetchAllCoins } from '@/service/httpsRequest';
import styles from '@/stylesheet/HomeScreenStylesheet';
import { CoinData, PricePoint } from '@/type';
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from "../../components/chartHelper";




export default function HomeScreen() {
  const inset = useSafeAreaInsets();
  const {theme} = useThemeContext();
  const dispatch = useDispatch();
  
  
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCoin, setSelectedCoin] = useState<CoinData>()
   const [chartData, setChartData] = useState<PricePoint[] | null>(null);

  const coins = useSelector((state: RootState) => state.coins.coins);
  
  console.log(chartData)
  const ITEM_HEIGHT = 70;
  const { height } = Dimensions.get('window')
  const initialBatch = Math.ceil(height / ITEM_HEIGHT);

 

useEffect(() => {
  const loadCoins = async () => {
    try {
      setLoading(true);
      const allProd = await fetchAllCoins();
      dispatch(setCoins(allProd));
      setSelectedCoin(allProd[0]);
    } catch (err: any) {
      console.log(err.message);
      alert("Failed to fetch coins");
    } finally {
      setLoading(false);
    }
  };

  if (!coins.length) {
    loadCoins();
  }
}, []); 


useEffect(() => {
  const loadChart = async () => {
    if (!selectedCoin) return;

    setLoading(true);
    const chart = await fetchChartData(selectedCoin.id);
    console.log("Chart data loaded:", chart);
    setChartData(chart);
    setLoading(false);
  };

  loadChart();
}, [selectedCoin]);



  return (
    <ThemedView style={{
      paddingTop: inset.top,
      paddingBottom: inset.bottom - 45 ,
      backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', 
      ...styles.container,
      }}>

        <ThemedView style={{
          borderColor: theme === 'dark' ? "#fea500" : "#d3840eff",
          ...styles.walletAmountSection
          }}
        >
          <ThemedText style={{
            color: theme === 'dark' ? "#7A7A7A" : "#837d7dff",
          ...styles.yourWallet}}>
            Your Wallet
          </ThemedText>

            <ThemedView style={styles.AmountContainer}>
              <ThemedText style={{
                 color: theme === 'dark' ? "#7A7A7A" : "#837d7dff",
                ...styles.currencySymbol
                }}
              >
                 ₦
              </ThemedText>
              <ThemedText style={{
                 color: theme === 'dark' ? "#FFF" : "#000",
                ...styles.AmountFigure
                }}
              >
                 584,984,257.6
              </ThemedText>
            </ThemedView>

            <ThemedView style={{
              ...styles.AmountContainer
              }}
            >

              <ThemedView style={{
                backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', 
                marginLeft: 15
              }}>
                {coins[0]?.price_change_percentage_7d_in_currency &&  coins[0]?.price_change_percentage_7d_in_currency > 0 ? 
                (
                  <Feather name="arrow-up-right" size={15} color="green" />
                ) : (
                  <Feather name="arrow-down-right" size={15} color="red" />
                )}

              </ThemedView>
                <ThemedText style={{
                    color: coins[0]?.price_change_percentage_7d_in_currency &&  coins[0]?.price_change_percentage_7d_in_currency > 0 ? "green" : "red",
                    ...styles.percentageChangedText
                }}>
                    {coins[0]?.price_change_percentage_7d_in_currency}
                </ThemedText>
            <ThemedText style={{
              color: theme === 'dark' ? "#7A7A7A" : "#837d7dff",
              ...styles.changeTime
              }}
            >
              7d change
            </ThemedText>

          </ThemedView>

        </ThemedView>

       {selectedCoin && chartData && (
        <CryptoChart
          coinId={selectedCoin.id}
          title={`${selectedCoin.name} (${selectedCoin.symbol.toUpperCase()})`}
          data={chartData} 
        />
      )}
          
          <ThemedView style={{ 
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            ...styles.favouriteCategory
            }}
          >
            <ThemedText style={{
              color: theme === 'dark' ? "#fea500" : "#ffb74d",
              ...styles.favouriteCategoryText
              }}
            >
              Favourites Coins
            </ThemedText>
          </ThemedView>


        
              <FlatList
                data={coins}
                renderItem={({ item }) => 
                <SingleCoin 
                  key={item.id}
                  product={item} 
                  onPress= {() => setSelectedCoin(item)}
                />}
                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                initialNumToRender={initialBatch}
                maxToRenderPerBatch={initialBatch * 2}
                removeClippedSubviews={true}
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
              />

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