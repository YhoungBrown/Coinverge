import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeContext } from '@/context/ThemeContext';
import { save } from '@/SecureStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../stylesheet/LoginStylesheet';




  const index = () => {
    const inset = useSafeAreaInsets();
    const {theme} = useThemeContext();
    const [username, setUsername] = useState<string>('');
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);


    const login = async (username: string) => {
    if (username === '') {
      Alert.alert('Invalid Name', 'Please enter a valid name.');
      return;
    }

    try {
      setLoading(true);
      username = username.toLowerCase().trim();

      await save('Username', username);

      router.push('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Error', 'Error occurred while logging in. Please reload the app and try again.');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };




  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <ThemedView 
    style={{
    paddingTop: inset.top,
    paddingBottom: inset.bottom,
    flex: 1,
    backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff', 
  }}
    >

        <ThemedView style={styles.welcomeTextContainer}>
          <ThemedText  
          type='title'
          style={{
            ...styles.welcomeText,
            color: theme === 'dark' ? '#fff' : '#000'
            }}>
            Catch every coin spike 
          </ThemedText>

          <ThemedText  
            style={{
             ...styles.welcomesubText,
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            Sieze your window into today’s crypto movements
          </ThemedText>
        </ThemedView>
      
      <ThemedView style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F8F8F8',
        shadowColor: theme === 'dark' ? '#F8F8F8' : '#1e0124ff',
        borderColor: theme === 'dark' ? '#333' : '#ddd',
        ...styles.welcomeUsernameContainer
        }}
      >
        <ThemedText
          style={{
            color: theme === 'dark' ? '#fff' : '#000',
            ...styles.textInputTitle,
          }}
        >
          Who is trading today?
        </ThemedText>

        <TextInput
          placeholder='Enter your name...'
          placeholderTextColor={theme === 'dark' ? '#666' : '#464444ff'}
          style={{
            ...styles.textInput,
            borderColor: theme === 'dark' ? '#fea500' : '#fea500',
            backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
            color: theme === 'dark' ? 'white' : 'black',
          }}
          onChangeText={setUsername}
        />


        {loading ? 
        (
          <ActivityIndicator 
            size='large' 
            color={theme === 'dark' ? '#fea500' : '#fea500'} 
            style={styles.activityIndicator} 
          />
        ) : (
          <TouchableOpacity
            style={styles.InventoryButtonTouchableOpacity} 
            onPress={() => login(username)}
          >
            <ThemedView style={styles.continueButton}>
               <ThemedText 
                  style={{
                    color: theme === 'dark' ? '#Fff' : 'black',
                    ...styles.continueText
                }}
                >
                  Continue To Market
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
        )}


      </ThemedView>
    </ThemedView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default index