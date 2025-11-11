import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import { RootState } from '@/reduxStore';
import { CoinData } from '@/type';
import { addToFav, removeFromFav } from '../../reduxSlice/FavouriteSlice';
import styles from '../../stylesheet/marketStylesheet';

const ITEM_HEIGHT = 100;
const INITIAL_BATCH = 10;

const MarketScreen = () => {
  const inset = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const router = useRouter();
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>('');

  const coins = useSelector((state: RootState) => state.coins.coins);
  const favouriteAssets = useSelector((state: RootState) => state.favourite.assets);

  
  const filteredCoins = search
    ? coins.filter(
        (x) =>
          x.name?.toLowerCase().includes(search.toLowerCase()) ||
          x.id?.toLowerCase().includes(search.toLowerCase())
      )
    : coins;


  const isFav = (coinId: string) => favouriteAssets.some((c) => c.id === coinId);

  const toggleFav = (coin: CoinData) => {
    if (isFav(coin.id)) {
      dispatch(removeFromFav(coin));
    } else {
      dispatch(addToFav(coin));
    }
  };

  const renderItem = ({ item }: { item: CoinData }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
          borderBottomColor: '#666',
          ...styles.singleCoinOpacity,
        }}
        onPress={() =>
          router.push({
            pathname: '/[id]',
            params: { id: item.id, coin: JSON.stringify(item) },
          })
        }
      >
        <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={{ uri: item.image }} />

        <ThemedText
          style={{
            color: theme === 'dark' ? '#FFF' : '#000',
            ...styles.coinName,
          }}
        >
          {item.name}
        </ThemedText>

        <ThemedView
          style={{
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            marginLeft: 10,
          }}
        >
          <ThemedText
            style={{
              ...styles.currentPrice,
              color: theme === 'dark' ? '#FFF' : '#000',
            }}
          >
            ${item.current_price}
          </ThemedText>

          <ThemedView
            style={{
              ...styles.percentageChangeContainer,
              backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            }}
          >
            {item.price_change_percentage_7d_in_currency &&
            item.price_change_percentage_7d_in_currency > 0 ? (
              <Feather name="arrow-up-right" size={15} color="green" />
            ) : (
              <Feather name="arrow-down-right" size={15} color="red" />
            )}

            <ThemedText
              style={{
                color:
                  item.price_change_percentage_7d_in_currency &&
                  item.price_change_percentage_7d_in_currency > 0
                    ? 'green'
                    : 'red',
                ...styles.percentageChangedText,
              }}
            >
              {item.price_change_percentage_7d_in_currency?.toFixed(2)}%
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <TouchableOpacity
          onPress={() => toggleFav(item)}
          style={{
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',            
          }}
        >
          <FontAwesome
            name={isFav(item.id) ? 'heart' : 'heart-o'}
            size={24}
            color={theme === 'dark' ? '#fea500' : '#ffb74d'}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView
      style={{
        paddingTop: inset.top,
        paddingBottom: inset.bottom - 45,
        backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
        ...styles.container,
      }}
    >
      <TextInput
        placeholder="Search coins..."
        placeholderTextColor={theme === 'dark' ? '#666' : '#464444ff'}
        style={{
          ...styles.textInput,
          borderColor: '#fea500',
          backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
          color: theme === 'dark' ? 'white' : 'black',
        }}
        onChangeText={(x) => setSearch(x)}
      />

      <FlatList
        data={filteredCoins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={INITIAL_BATCH}
        maxToRenderPerBatch={INITIAL_BATCH * 2}
        removeClippedSubviews={true}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
};

export default MarketScreen;
