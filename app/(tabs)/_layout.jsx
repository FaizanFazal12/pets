import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Wait for user data to load
    if (isLoaded && user) {
      setTimeout(() => {
        setLoading(false); // Stop loading once user details are ready
      }, 1000); // Simulate a short loading time for better UX
    }
  }, [isLoaded, user,loading]);

  if (loading || !isLoaded || !user) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmarks" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_PRIMARY,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.GRAY,
  },
});
