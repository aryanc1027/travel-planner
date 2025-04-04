import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors, lightColors, darkColors } from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/themeContext';

export default function StartNewTripCard() {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container, 
        { 
          transform: [{ scale: scaleAnim }],
          backgroundColor: colors.background,
          shadowColor: colors.shadow
        }
      ]}
    >
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.iconGradient}
        >
          <Ionicons name="airplane" size={35} color="white" />
        </LinearGradient>
      </View>

      <Text style={[styles.title, { color: colors.textDark }]}>No Trips Planned Yet</Text>

      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        Create your first adventure and start exploring!
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/create-trip/search-place')}
        style={styles.button}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Ionicons
            name="add-circle-outline"
            size={20}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>Start a New Trip</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
    gap: 20,
    borderRadius: 25,
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
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});
