import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { useEffect } from "react";


export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('SecureStore get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    async saveToken(key,value) {
      try {
        return SecureStore.setItemAsync(key, value)
      } catch (err) {
        return
      }
    },
  }

  
  

  const [loaded] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <Stack>
      <Stack.Screen name="index"  options={{
        headerShown:false
      }} />
      <Stack.Screen name="login/index" options={{
        headerShown:false
      }}/>
      <Stack.Screen name="(tabs)" options={{
        headerShown:false
      }}/>
      <Stack.Screen name="pet-details/index" options={{
        headerShown:false
      }}/>
  
      <Stack.Screen name="pet-creates/index" options={{
        headerShown:false
      }}/>
    </Stack>
    </ClerkProvider>
  
  );
}
 