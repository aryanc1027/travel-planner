import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function Discover() {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.textDark }]}>Discover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'outfit-medium',
    fontSize: 18,
  },
});
