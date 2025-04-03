import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { CreateTripContext } from '../../context/createTripContext';
import { Alert } from 'react-native';

export default function SelectDepartureAirport() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
    });
  }, []);

  useEffect(() => {
    const searchAirports = async () => {
      // Only search if input is exactly 3 or 4 characters
      if (searchQuery.length !== 3 && searchQuery.length !== 4) {
        setAirports([]);
        return;
      }

      setLoading(true);
      try {
        const apiKey = process.env.EXPO_PUBLIC_API_NINJAS_KEY;
        if (!apiKey) {
          throw new Error('API key is missing. Please check your environment variables.');
        }

        // Determine which endpoint to use based on input length
        const searchParam = searchQuery.length === 3 ? 'iata' : 'icao';
        
        const response = await fetch(
          `https://api.api-ninjas.com/v1/airports?${searchParam}=${encodeURIComponent(searchQuery)}`,
          {
            headers: {
              'X-Api-Key': apiKey,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        setAirports(data);
      } catch (error) {
        Alert.alert(
          'Error',
          error.message || 'Failed to fetch airports. Please check your internet connection and try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchAirports, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleContinue = () => {
    if (!selectedAirport) {
      Alert.alert('Please select a departure airport');
      return;
    }
    setTripData({ ...tripData, departureAirport: selectedAirport });
    router.push('/create-trip/select-traveler');
  };

  const renderAirportItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedAirport(item)}
      style={{
        padding: 15,
        backgroundColor: selectedAirport?.icao === item.icao ? Colors.primary : Colors.white,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: selectedAirport?.icao === item.icao ? Colors.primary : Colors.lightGray,
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 16,
          color: selectedAirport?.icao === item.icao ? Colors.white : Colors.black,
        }}
      >
        {item.name} ({item.iata})
      </Text>
      <Text
        style={{
          fontFamily: 'outfit-regular',
          fontSize: 14,
          color: selectedAirport?.icao === item.icao ? Colors.white : Colors.gray,
        }}
      >
        {item.city}, {item.country}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: '5%',
        paddingTop: '12%',
        backgroundColor: Colors.white,
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
            color: Colors.black,
            marginBottom: '4%',
            marginTop: '10%',
            textAlign: 'center',
          }}
        >
          Select departure airport
        </Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            fontFamily: 'outfit-regular',
            fontSize: 16,
          }}
          placeholder="Enter 3-letter (IATA) or 4-letter (ICAO) airport code..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <FlatList
            data={airports}
            renderItem={renderAirportItem}
            keyExtractor={(item) => item.icao}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        style={{
          padding: '5%',
          backgroundColor: Colors.primary,
          borderRadius: 20,
          marginHorizontal: '1%',
          shadowColor: Colors.primary,
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
            color: Colors.white,
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