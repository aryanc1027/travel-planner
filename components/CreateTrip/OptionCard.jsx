import { View, Text } from 'react-native';
import React from 'react';

export default function OptionCard({ option, selectedOption }) {
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
            selectedOption?.id === option.id ? '#f0f8ff' : '#ffffff',
          borderWidth: 3,
          borderColor:
            selectedOption?.id === option.id ? '#007AFF' : 'transparent',
          borderRadius: 20,
          alignItems: 'center',
          shadowColor: '#000',
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
            color: '#000000',
          }}
        >
          {option?.title}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: 'outfit-regular',
            color: '#5d6d6e',
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
