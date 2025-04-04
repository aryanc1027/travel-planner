import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { SelectTravelerOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '../../context/createTripContext';
import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function SelectTraveler() {
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
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, traveler: selectedOption });
  }, [selectedOption]);

  const handleContinue = () => {
    if (!selectedOption) {
      Alert.alert('Please select your travelers');
      return;
    }
    setTripData({ ...tripData, traveler: selectedOption.title });
    router.push('/create-trip/select-dates');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: '12%',
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1,
          marginTop: '3%',
          marginBottom: '5%',
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: Platform.OS === 'ios' ? 23 : 21,
            color: colors.textDark,
            marginBottom: '4%',
            marginTop: '10%',
            textAlign: 'center',
          }}
        >
          Select your travelers
        </Text>

        <FlatList
          contentContainerStyle={{
            paddingBottom: '5%',
          }}
          data={SelectTravelerOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              style={{
                marginVertical: '2%',
              }}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={{
          padding: '5%',
          backgroundColor: colors.primary,
          borderRadius: 20,
          marginHorizontal: '1%',
          shadowColor: colors.primary,
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 5,
          marginBottom: '12%',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: colors.white,
            fontFamily: 'outfit-bold',
            fontSize: Platform.OS === 'ios' ? 20 : 18,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
