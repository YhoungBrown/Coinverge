import { useThemeContext } from '@/context/ThemeContext';
import styles from '@/stylesheet/CoinInfoStylesheet';
import { CoinInfoProps } from '@/type';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';


  const formatNumber = (num: number | null) =>
    num ? num.toLocaleString() : "N/A";

  const formatCurrency = (num: number | null, prefix = "$ ") =>
    num ? `${prefix}${num.toLocaleString()}` : "N/A";
  

const CoinInfo = ({ coinData }: CoinInfoProps) => {
    const {theme} = useThemeContext();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>

        <ThemedView 
            style={{ 
                backgroundColor: theme === 'dark' ? "#000" : "#fff",
                ...styles.headerContainer
            }}
        >
            <Image
                source={{ uri: coinData?.image }}
                style={styles.image}
            />
        
            <ThemedView
                style={{ 
                backgroundColor: theme === 'dark' ? "#000" : "#fff",
                }}
            >
                <ThemedText
                    style={{ 
                        ...styles.coinTitle,
                        color: theme === "dark" ? "#fff" : "#000" 
                    }}
                >
                    {coinData?.name} ({coinData?.symbol.toUpperCase()})
                </ThemedText>
                <ThemedText style={styles.rank}>
                    Rank #{coinData?.market_cap_rank}
                </ThemedText>
            </ThemedView>
        </ThemedView>

                
        <ThemedView style={{
            ...styles.currentPriceContainer,
            backgroundColor: theme === 'dark' ? "#000" : "#fff"
            }}>
        <ThemedText 
            style={{
                ...styles.subTitle,
                color: theme === "dark" ? "#fff" : "#000",
                marginRight: 4,
                marginTop: -3
            }}
        >
            Current Price:
        </ThemedText>
            
        <ThemedText
            style={{
                color: theme === "dark" ? "#fea500" : "#ff9800",
                ...styles.currentPrice
            }}
        >
            {formatCurrency(coinData!.current_price)}
        </ThemedText>
        </ThemedView> 


        <ThemedText 
            style={{
                ...styles.subTitle,
                color: theme === "dark" ? "#fea500" : "#ff9800",
            }}
        >
            Market Info
        </ThemedText>

        <ThemedText style={{
            ...styles.marketInfoText,
            color: theme === "dark" ? "#fff" : "#000" 
        }}>
            Market Cap:   {formatCurrency(coinData!.market_cap)}
        </ThemedText>

        <ThemedText style={{
         ...styles.marketInfoText,
         color: theme === "dark" ? "#fff" : "#000" 
        }}>
            24h Volume:   {formatCurrency(coinData!.total_volume)}
        </ThemedText>

        <ThemedText style={{
         ...styles.marketInfoText,
         color: theme === "dark" ? "#fff" : "#000" 
        }}>
            Circulating Supply:   {formatNumber(coinData!.circulating_supply)}
        </ThemedText>

        {coinData!.total_supply && (
            <ThemedText style={{
                ...styles.marketInfoText,
                color: theme === "dark" ? "#fff" : "#000" 
            }}>
                Total Supply:   {formatNumber(coinData!.total_supply)}
            </ThemedText>
        )}

        {coinData!.max_supply && (
            <ThemedText style={{
                ...styles.marketInfoText,
                color: theme === "dark" ? "#fff" : "#000" 
            }}>
                Max Supply:   {formatNumber(coinData!.max_supply)}
            </ThemedText>
        )}


        <ThemedText  style={{
            ...styles.subTitle,
            color: theme === "dark" ? "#fea500" : "#ff9800",
        }}>
            Price Stats
        </ThemedText>

        <ThemedText style={{
         ...styles.marketInfoText,
         color: theme === "dark" ? "#fff" : "#000" 
        }}>
            24h High: {formatCurrency(coinData!.high_24h)}
        </ThemedText>

        <ThemedText style={{
         ...styles.marketInfoText,
         color: theme === "dark" ? "#fff" : "#000" 
        }}>
            24h Low: {formatCurrency(coinData!.low_24h)}
        </ThemedText>

        <ThemedText style={{
         ...styles.marketInfoText,
         color: theme === "dark" ? "#fff" : "#000" 
        }}>
            ATH: {formatCurrency(coinData!.ath)} ({coinData?.ath_change_percentage.toFixed(2)}%)
        </ThemedText>

        <ThemedText style={{
         ...styles.marketInfoText,
         color: theme === "dark" ? "#fff" : "#000" 
        }}>
            ATL: {formatCurrency(coinData!.atl)} ({coinData?.atl_change_percentage.toFixed(2)}%)
        </ThemedText>



        
        <ThemedText style={{ 
            ...styles.lastUpdate,
        }}>
            Last updated: {new Date(coinData!.last_updated).toLocaleString()}
        </ThemedText>

    </ScrollView>
  )
}

export default CoinInfo