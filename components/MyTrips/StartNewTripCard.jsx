import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
export default function StartNewTripCard() {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const router = useRouter();
  
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={['#4B9CD3', '#7BAFD4']}
          style={styles.iconGradient}
        >
          <Ionicons name="airplane" size={35} color="white" />
        </LinearGradient>
      </View>
      
      <Text style={styles.title}>No Trips Planned Yet</Text>

      <Text style={styles.subtitle}>
        Create your first adventure and start exploring!
      </Text>

      <TouchableOpacity 
        onPress={() => router.push('/create-trip/search-place')}
        style={styles.button}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#4B9CD3', '#7BAFD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Ionicons name="add-circle-outline" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Start a New Trip</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 10,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#4B9CD3",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 7,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 26,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.gray,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    marginTop: 10,
    shadowColor: "#4B9CD3",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
  buttonIcon: {
    marginRight: 8,
  }
});