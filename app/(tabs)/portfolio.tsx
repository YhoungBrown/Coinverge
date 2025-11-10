import SingleCoin from '@/components/SingleCoin';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import { RootState } from '@/reduxStore';
import { get } from '@/SecureStore';
import styles from '@/stylesheet/portfolioStylesheet';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';




export default function portfolio() {
  const inset = useSafeAreaInsets();
  const {theme} = useThemeContext();
  const router = useRouter();
  
  

   const [username, setUsername] = useState<string | null>(null);
  
   const [loading, setLoading] = useState<boolean>(false);

  const assets = useSelector((state: RootState) => state.portfolio.assets);

  

  const ITEM_HEIGHT = 70;
  const { height } = Dimensions.get('window')
  const initialBatch = Math.ceil(height / ITEM_HEIGHT);

 

 useFocusEffect(
    useCallback(() => {
      setLoading(true)
      const fetchUsername = async () => {
        try {
          const storedUsername = await get('Username'); 
          setUsername(storedUsername);
          setLoading(false);
        } catch (error) {
           setLoading(false);
          console.error("Error fetching username or assets:", error);
        }
      };

      fetchUsername();
    }, [])
  );




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
          <ThemedView style={{
            width: `${username?.length! * 2 + 35}%`,
            backgroundColor: theme === 'dark' ? "#fea500" : "#d3840eff",
            ...styles.yourAssetsBackground
          }}>
            <ThemedText style={{
              color: theme === 'dark' ? "#fff" : "#000",
              ...styles.yourWallet}}>
              {`${username}'s assets`}
            </ThemedText>
          </ThemedView>

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
                {assets[0]?.price_change_percentage_7d_in_currency &&  assets[0]?.price_change_percentage_7d_in_currency > 0 ? 
                (
                  <Feather name="arrow-up-right" size={15} color="green" />
                ) : (
                  <Feather name="arrow-down-right" size={15} color="red" />
                )}

              </ThemedView>
                <ThemedText style={{
                    color: assets[0]?.price_change_percentage_7d_in_currency &&  assets[0]?.price_change_percentage_7d_in_currency > 0 ? "green" : "red",
                    ...styles.percentageChangedText
                }}>
                    {assets[0]?.price_change_percentage_7d_in_currency}
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
              {assets.length > 1 &&
                ("Your Available Assets") 
              }
            </ThemedText>
          </ThemedView>


          {assets.length < 1 && (
            <ThemedView style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '40%',
              backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            }}>
              <Entypo name="wallet" size={100} color={theme === 'dark' ? "#fea500" : "#ffb74d" }/>
              <ThemedText style={{
                color: theme === 'dark' ? "#fea500" : "#ffb74d"
              }}>
                   You currently have no assets
              </ThemedText>
            </ThemedView>
          )}


        
              <FlatList
                data={assets}
                renderItem={({ item }) => 
                <SingleCoin 
                  key={item.id}
                  product={item} 
                  onPress={() => router.push({
                     pathname: "/[id]", 
                     params: { id: item.id, coin: JSON.stringify(item) }
                  })}
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
                showsVerticalScrollIndicator={false}
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