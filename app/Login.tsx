import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ThemeSwitcher from '@/components/ThemeSwitcher';

import { useThemeContext } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../stylesheet/LoginStylesheet';

const index = () => {
    const inset = useSafeAreaInsets();
    const {theme} = useThemeContext();
    const router = useRouter();
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
    <ThemedView style={{ 
        paddingTop: inset.top, 
        paddingBottom: inset.bottom,
        ...styles.container
    }}>

        {/*Theme switcher */}
        <ThemeSwitcher />

        {/* Welcome Text */}
        <ThemedView >
            <ThemedView style={styles.welcomeTextView}>
                <ThemedText 
                    type='title'
                    style={{ color: theme === 'dark' ? 'white' : 'black' }}
                >
                    Hi Welcome
                </ThemedText>
                <ThemedText
                    style={{ 
                        ...styles.messageSubtitle,
                        color: theme === 'dark' ? 'white' : 'black' }}
                    type='default'
                >
                    Nice having you here
                </ThemedText>
            </ThemedView>

            <ThemedView style={{
                backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                shadowColor: theme === 'dark' ? '#ffffff' : '#000000',
                borderColor: theme === 'dark' ? '#333' : '#ddd',
                ...styles.welcomeContainer}}
            >
                <ThemedText
                    style={{ 
                        ...styles.welcomeMessage,
                        color: theme === 'dark' ? 'white' : 'black' }}
                    type='default'
                >
                    Welcomme once again
                </ThemedText>
                <ThemedText style={{
                    ...styles.textInputTitle,
                    color: theme === 'dark' ? '#ccc' : '#555'
                }}>
                    What Should We Call You?
                </ThemedText>
                <TextInput 
                    style={{
                        ...styles.textInput,
                        borderColor: theme === 'dark' ? '#4CAF50' : '#4CAF50',
                        backgroundColor: theme === 'dark' ? '#0d0d0d' : '#ffffff',
                        color: theme === 'dark' ? 'white' : 'black',
                    }}
                    placeholder="Enter your name"
                    placeholderTextColor={theme === 'dark' ? '#777' : '#999'}
                   // onChangeText={setUsername}
                />

                <TouchableOpacity 
                    style={styles.startQuizButtonTouchableOpacity} 
                    //onPress={() => router.push('/questionScreen')}
                >
                    <ThemedView style ={styles.startQuizButton}>
                        <ThemedText 
                            style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}
                        >
                            Start Quiz
                        </ThemedText>
                    </ThemedView>
                </TouchableOpacity>
            </ThemedView>

        </ThemedView>
    </ThemedView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default index;