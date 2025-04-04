import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectBudgetOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '../../context/createTripContext';
import { useTheme } from '../../context/themeContext';
import { Colors, lightColors, darkColors } from '@/constants/Colors';
import { Alert } from 'react-native';
import { Image } from 'react-native';

export default function SelectBudget() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;
  const [selectedOption, setSelectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
      headerTitleStyle: {
        color: colors.textDark,
      },
      headerStyle: {
        backgroundColor: isDarkMode ? colors.background + '80' : 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 0,
      },
    });
  }, [isDarkMode]);

  useEffect(() => {
    selectedOption &&
      setTripData({
        ...tripData,
        budget: selectedOption.title,
      });
  }, [selectedOption]);

  const handleContinue = () => {
    if (!selectedOption) {
      Alert.alert('Please select a budget');
      return;
    }
    router.push('/create-trip/review-trip');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 25,
        paddingTop: 100,
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginBottom: 20,
          textAlign: 'center',
          color: colors.textDark,
        }}
      >
        Choose a Budget
      </Text>

      <Text
        style={{
          fontFamily: 'outfit-regular',
          fontSize: 16,
          color: colors.textMuted,
          marginBottom: 30,
          textAlign: 'center',
          lineHeight: 22,
        }}
      >
        Select a budget range that works best for your travel plans.
      </Text>

      <FlatList
        data={SelectBudgetOptions}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setSelectedOption(item)}>
            <OptionCard 
              option={item} 
              selectedOption={selectedOption}
            />
          </TouchableOpacity>
        )}
        style={{ marginBottom: 20 }}
      />

      <TouchableOpacity
        onPress={handleContinue}
        style={{
          width: '100%',
          padding: 18,
          backgroundColor: colors.primary,
          borderRadius: 15,
          shadowColor: colors.primary,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontFamily: 'outfit-medium',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
