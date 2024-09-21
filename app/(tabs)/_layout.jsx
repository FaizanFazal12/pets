import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '../../constants/Colors'
export default function Layout() {
  return (
    <Tabs screenOptions={{
       headerShown: false,
       tabBarActiveTintColor:Colors.PRIMARY
       }}>
      <Tabs.Screen 
        name="home" 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen name="favourite" options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bookmarks" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen name="inbox" options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble" size={24} color={color} />
          ),
        }} 
      />
      <Tabs.Screen name="profile" options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
