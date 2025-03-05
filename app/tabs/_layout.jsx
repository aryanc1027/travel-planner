import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name='mytrip' 
        options={{
            title: 'My Trip',
            tabBarIcon: ({ color }) => (
              <Entypo name="location" size={24} color={color} />
            ),
        }}
        
        />
        <Tabs.Screen name='discover' 
        options={{
            title: 'Discover',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="globe" size={24} color={color} />
            ),
        }}
        />
        <Tabs.Screen name='profile'
        options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="person-running" size={24} color={color} />
            ),
        }}
        />
    </Tabs>
  )
}