import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProviderCustom, useThemeContext } from '@/context/ThemeContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Provider } from 'react-redux';
import { store } from '../reduxStore';

export const unstable_settings = {
  anchor: '(tabs)',
};


export default function RootLayout() {
  return (
    <ThemeProviderCustom>
      <AppLayout />
    </ThemeProviderCustom>
  );
}

export const AppLayout = () => {
  const colorScheme = useColorScheme();
const { theme } = useThemeContext();

  return (
    <Provider store={store}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <Stack initialRouteName='index'>
        <Stack.Screen name="index" options={{ headerShown: false }} />
         <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>

      
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
    </Provider>
  );
}
