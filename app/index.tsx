import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import styles from '@/stylesheet/welcomescreenStylesheet';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Index = () => {
  const inset = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const router = useRouter();

  const slideAnim = useRef(new Animated.Value(-5000)).current;

  useEffect(() => {
    
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 30, 
        speed: 0.3,       
        bounciness: 0.3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim]);

  return (
    <ThemedView
      style={{
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
        flex: 1,
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
      }}>
      <ImageBackground
        source={require('../assets/images/welcome.jpg')}
        resizeMode="cover"
        style={styles.background}>
        <LinearGradient
          colors={
            theme === 'dark'
              ? ['transparent', '#000000', '#0a0a0a']
              : ['transparent', '#ffffff', '#f2f2f2']
          }
          locations={[0.4, 0.8, 1]}
          style={styles.gradientOverlay}
        />

        
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}>
         

          <Text
            style={[
              styles.welcomeNote,
              { color: theme === 'dark' ? '#fff' : '#000' },
            ]}>
            Welcome to
          </Text>

          <Text style={styles.BrandName}>Coinverge</Text>

          <Text
            style={[
              styles.tagline,
              { color: theme === 'dark' ? '#fff' : '#000' },
            ]}>
            Where your crypto assets comes together...
          </Text>
        </Animated.View>

        <TouchableOpacity 
            onPress={() => router.push('/Login')}
            style={styles.WelcomeBtn}
            activeOpacity={0.4}
        >
            <ThemedText
                style={{
                    ...styles.continueBtnText,
                    color: theme === 'dark' ? '#fff' : '#000'
                }}
            >
                Continue
            </ThemedText>
            <Feather 
                name="arrow-right" 
                size={24} 
                color= {theme === 'dark' ? '#fff' : '#000'} 
            />
        </TouchableOpacity>
      </ImageBackground>
    </ThemedView>
  );
};

export default Index;
