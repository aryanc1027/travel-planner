import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Login() {
  const { height } = Dimensions.get('window');
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      {/* Background Image */}
      <Image
        source={require('./../assets/images/login.jpg')}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />

      {/* Gradient overlay - more transparent at top */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
      ></View>

      {/* White rounded bottom panel */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.35, // Take up about 25% of screen from bottom
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 25,
          paddingTop: 25,
          paddingBottom: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 10,
        }}
      >
        {/* App title at top of panel */}
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            color: '#000',
            marginBottom: 5,
            textAlign: 'center',
          }}
        >
          Plan Your Next Trip
        </Text>

        {/* Blurb text */}
        <Text
          style={{
            fontFamily: 'outfit-regular',
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            marginBottom: 15,
            lineHeight: 22,
          }}
        >
          Explore breathtaking destinations, craft personalized itineraries, and
          create memories that last a lifetime. Your journey starts here.{' '}
        </Text>

        {/* Get Started button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#000000', // Changed to blue background
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderRadius: 30,
            marginTop: 15,
            width: '100%',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            justifyContent: 'center',
          }}
          onPress={() => router.push('/auth/sign-in')}
        >
          <Ionicons
            name="arrow-forward-circle"
            size={22}
            color="#fff"
            style={{ marginRight: 10 }}
          />
          <Text
            style={{ fontSize: 16, fontFamily: 'outfit-medium', color: '#fff' }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
