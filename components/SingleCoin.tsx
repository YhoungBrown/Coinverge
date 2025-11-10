import { useThemeContext } from '@/context/ThemeContext'
import styles from '@/stylesheet/SingleCoinStylesheet'
import { SingleCoinProps } from '@/type'
import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { ThemedView } from './themed-view'

const SingleCoin =  ({ product, onPress }: SingleCoinProps) => {
    const {theme} = useThemeContext();
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={{
        ...styles.singleProductContainer,
        backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
        }}
    >
        <ThemedView style={{
            ...styles.coinNameAndImageContainer,
             backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff'
        }}>
            <Image 
            width={15}
            height={15}
            resizeMode='contain'
            source={{uri: product.image}}
            />
            <Text style={{
                color: theme === 'dark' ? "#FFF" : "#000",
                ...styles.coinName
                }}>
                {product.name}
            </Text>
        </ThemedView>

         <ThemedView style={{ 
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff'
            }}
        >
            <Text style={{
                ...styles.currentPrice,
                color: theme === 'dark' ? "#FFF" : "#000"
            }}>
                {product.current_price}
            </Text>

            <ThemedView 
                style={{
                    ...styles.percentageChangeContainer,
                    backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff'
                }}
            >
                {product.price_change_percentage_7d_in_currency &&  product.price_change_percentage_7d_in_currency > 0 ? (
                    <Feather name="arrow-up-right" size={15} color="green" />
                ) : (
                    <Feather name="arrow-down-right" size={15} color="red" />
                )}
            
                <Text style={{
                    color: product.price_change_percentage_7d_in_currency &&  product.price_change_percentage_7d_in_currency > 0 ? "green" : "red",
                    ...styles.percentageChangedText
                }}>
                    {product.price_change_percentage_7d_in_currency}
                </Text>
            </ThemedView>
        </ThemedView>
    </TouchableOpacity>
  )
}

export default SingleCoin