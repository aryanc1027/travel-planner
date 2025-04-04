import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;
  
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: { 
        backgroundColor: colors.background,
        borderTopColor: colors.lightGrey
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.grey,
      tabBarLabelStyle: {
        fontFamily: 'outfit-medium'
      }
    }}>
      <Tabs.Screen
        name="mytrip"
        options={{
          title: 'My Trip',
          tabBarIcon: ({ color }) => (
            <Entypo name="location" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="globe" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="person-running" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
