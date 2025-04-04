import { View, Text } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function OptionCard({ option, selectedOption }) {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <View
      style={[
        {
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor:
            selectedOption?.id === option.id 
              ? colors.primary 
              : isDarkMode ? colors.backgroundLight : colors.background,
          borderWidth: 1,
          borderColor:
            selectedOption?.id === option.id 
              ? colors.primary 
              : isDarkMode ? colors.primary + '30' : colors.lightGrey,
          borderRadius: 20,
          alignItems: 'center',
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
          minHeight: 120,
        },
      ]}
    >
      <View style={{ flex: 1, marginRight: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'outfit-bold',
            marginBottom: 8,
            color: selectedOption?.id === option.id ? colors.white : colors.textDark,
          }}
        >
          {option?.title}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'outfit-regular',
            color: selectedOption?.id === option.id ? colors.white : colors.textMuted,
            lineHeight: 22,
          }}
        >
          {option?.description}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 45,
          opacity: 0.9,
        }}
      >
        {option.icon()}
      </Text>
    </View>
  );
}
