import CryptoChart from '@/components/chart';
import CoinInfo from '@/components/coinInfo';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import { addAssets, sellAssets } from '@/reduxSlice/PortfolioSlice';
import styles from '@/stylesheet/SingleCoinPageStylesheet';
import { CoinData, PricePoint } from '@/type';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { fetchChartData } from "../components/chartHelper";

export default function CoinPage() {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const router = useRouter();
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const { id, coin } = useLocalSearchParams<{ id: string; coin?: string }>();

  const [chartData, setChartData] = useState<PricePoint[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [actionType, setActionType] = useState<'buy' | 'sell' | null>(null);
  const [quantity, setQuantity] = useState<string>("");

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

  const handleOpenModal = (type: 'buy' | 'sell') => {
    setActionType(type);
    setModalVisible(true);
  };



 const handleConfirm = () => {
  if (quantity === "")
    return alert("Quantity can't be empty");

  try {
    setLoading(true);

    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0)
      return alert("Enter a valid quantity");

    const asset = {
      ...coinData!,
      quantity: parsedQuantity,
    };

    if (actionType === 'buy') {
      dispatch(addAssets(asset));
      alert('Purchase Successful');
    } else if (actionType === 'sell') {
      dispatch(sellAssets(asset));
      alert('Sales Successful');
    }

    setModalVisible(false);
    setQuantity("");
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};



  const handleCancel = () => {
    setModalVisible(false);
    setQuantity("");
  };



  return (
    <ThemedView
      style={{
        paddingTop: inset.top,
        paddingBottom: inset.bottom - 10,
        backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
        flex: 1,
        ...styles.container
      }}
    >
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

      <ThemedView style={{ backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', marginTop: 35 }} />

      {coinData && chartData && (
        <CryptoChart
          coinId={coinData.id}
          title={`${coinData.name} (${coinData.symbol.toUpperCase()})`}
          data={chartData}
        />
      )}

      <ThemedView style={{
        ...styles.percentageChangeOuterContainer,
        backgroundColor: theme === 'dark' ? '#000' : '#ffffff',
        }}
      >

        <ThemedView style={{
          backgroundColor: '#f2f2f2', 
          ...styles.percentageChangeContainer
          }}>
            <ThemedText
            style={{
              ...styles.percentageChangeText,
              color: coinData?.price_change_percentage_1h_in_currency &&  coinData?.price_change_percentage_1h_in_currency! > 0 ? "green" : "red",
            }}
            >
              {coinData?.price_change_percentage_1h_in_currency?.toFixed(2)}% change / 1h
            </ThemedText>
        </ThemedView>

        <ThemedView style={{
            backgroundColor: '#f2f2f2', 
          ...styles.percentageChangeContainer
          }}>
            <ThemedText
            style={{
              ...styles.percentageChangeText,
              color: coinData?.price_change_percentage_24h_in_currency &&  coinData?.price_change_percentage_24h_in_currency! > 0 ? "green" : "red",
            }}
            >
              {coinData?.price_change_percentage_24h_in_currency?.toFixed(2)}% change / 1d
            </ThemedText>
        </ThemedView>

        <ThemedView style={{
            backgroundColor: '#f2f2f2', 
          ...styles.percentageChangeContainer
          }}>
            <ThemedText
            style={{
              ...styles.percentageChangeText,
              color: coinData?.price_change_percentage_7d_in_currency &&  coinData?.price_change_percentage_7d_in_currency! > 0 ? "green" : "red",
            }}
            >
              {coinData?.price_change_percentage_7d_in_currency?.toFixed(2)}% change / 7d
            </ThemedText>
        </ThemedView>

      </ThemedView>

      <CoinInfo coinData={coinData} />

     

      {!modalVisible && (
      <ThemedView
        style={{
          ...styles.buttonContainer,
          backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff'
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme === 'dark' ? "#fea500" : "#ffb74d",
            ...styles.btn
          }}
          onPress={() => handleOpenModal('buy')}
        >
          <ThemedText
            style={{
              ...styles.btnText,
              color: theme === 'dark' ? "#fff" : "#000"
            }}
          >
            Buy Coin
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            ...styles.btn
          }}
          onPress={() => handleOpenModal('sell')}
        >
          <ThemedText
            style={{
              ...styles.btnText,
              color: theme === 'dark' ? "#fff" : "#000"
            }}
          >
            Sell Coin
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      )}



      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView
          style={{
            ...styles.modalInnerContainer
          }}
        >
          <ThemedView
            style={{
              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
              ...styles.modalContentContainer
            }}
          >
            <ThemedText
              style={{
                ...styles.modalTitle,
                color: theme === 'dark' ? '#fff' : '#000',
              }}
            >
              {actionType === 'buy' ? 'Buy' : 'Sell'} {coinData?.name}
            </ThemedText>

            <ThemedText
              style={{
                color: theme === 'dark' ? '#ccc' : '#333',
                marginBottom: 8,
              }}
            >
              Current Price: ${coinData?.current_price?.toLocaleString()}
            </ThemedText>

            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              placeholder="Enter quantity"
              keyboardType="numeric"
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
              style={{
                borderColor: theme === 'dark' ? '#555' : '#ccc',
                color: theme === 'dark' ? '#fff' : '#000',
                ...styles.modalTextInput
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: actionType === 'buy'
                  ? (theme === 'dark' ? "#fea500" : "#ffb74d")
                  : 'red',
                ...styles.modalActionOpacity
              }}
              onPress={handleConfirm}
            >
              <ThemedText
                style={{
                  color: theme === 'dark' ? '#fff' : '#000',
                  ...styles.actionBtnText
                }}
              >
                {actionType === 'buy' ? 'Buy' : 'Sell'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCancel}
              style={{ 
                borderColor: theme === 'dark' ? '#555' : '#ccc', 
                ...styles.modalCancelButton
              }}
            >
              <ThemedText style={{ 
                color: theme === 'dark' ? '#aaa' : '#555' 
                }}
              >
                Cancel
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>



     
      {loading && (
        <ThemedView
          style={[
            styles.activityIndicator,
            { backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', }
          ]}
        >
          <ActivityIndicator size="large" color={theme === 'dark' ? "#fea500" : "#ffb74d"} />
        </ThemedView>
      )}
    </ThemedView>
  );
}
