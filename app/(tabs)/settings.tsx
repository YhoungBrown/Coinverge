import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { useThemeContext } from '@/context/ThemeContext'
import { get } from '@/SecureStore'
import styles from '@/stylesheet/settingsStylesheet'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const settings = () => {
    const {theme} = useThemeContext();
    const inset = useSafeAreaInsets();
      const [username, setUsername] = useState<string | null>(null);

   useFocusEffect(
    useCallback(() => {
      const fetchUsername = async () => {
        try {
          const storedUsername = await get('Username'); 
          setUsername(storedUsername);
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      };

      fetchUsername();
    }, [])
  );

  return (
    <ThemedView style={{
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
        backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', 
        ...styles.conatiner}}
    >
        <ThemedView style={{
            backgroundColor: 'transparent',
            ...styles.bioSection
            }}
        >
            <ThemedView style={{
                backgroundColor: theme === 'dark' ? '#fff' : '#000',
                ...styles.profilePixContainer
                }}
            >
                <ThemedText style={{
                      color: theme === 'dark' ? '#000' : '#fff' ,
                    ...styles.profilePix
                    }}>
                    {username ? username.slice(0, 2).toUpperCase() : ''}
                </ThemedText>
            </ThemedView>

            <Text style={{
                ...styles.bioTitle,
                color: theme === 'dark' ? '#fff' : '#000'
                }}
            >
                {username}
            </Text>
        </ThemedView>

        <ThemedView 
            style={{
                backgroundColor: theme === 'dark' ? '#dfdedeff' : '#1d1c1cff',
                ...styles.lineBreaker
            }}
        />

        <ThemedView style={styles.settingsCard}>
            <ThemedText 
                style={{
                    ...styles.themeSwitchingText,
                    color: theme === 'dark' ? '#fff' : '#000'
                }}
            >
                Theme
            </ThemedText>

            <ThemeSwitcher />
        </ThemedView>
    </ThemedView>
  )
}

export default settings