import 'react-native-get-random-values';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { CreateTripContext } from '../../context/createTripContext';
import { getCityImageFromPlace } from './cityImage';
import { useRouter } from 'expo-router';

export default function SearchPlace() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 0,
      },
    });
  }, []);

  // useEffect(() => {
  //   console.log('tripData', tripData);
  // }, [tripData]);

  const searchPlaces = async text => {
    if (text.length > 1) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json`,
          {
            params: {
              access_token: process.env.EXPO_PUBLIC_MAPBOX_TOKEN,
              types: 'place',
              limit: 10,
            },
          }
        );
        setResults(response.data.features);
      } catch (error) {
        console.error('Error searching places:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handlePlaceSelect = async place => {
    setQuery(place.place_name);
    setResults([]);

    // Set initial trip data without the image
    setTripData({
      locationInfo: {
        name: place.place_name,
        coordinates: place.geometry.coordinates,
        url: 'https://www.wikidata.org/wiki/' + place.properties.wikidata,
        imageUrl: '', // Will be updated when image loads
        imageAttribution: '', // Will be updated when image loads
      },
    });

    // Fetch image in the background
    getCityImageFromPlace(place).then(({ imageUrl, attribution }) => {
      setTripData(prev => ({
        ...prev,
        locationInfo: {
          ...prev.locationInfo,
          imageUrl,
          imageAttribution: attribution,
        },
      }));
    });

    // Navigate immediately without waiting for the image
    router.push('/create-trip/select-traveler');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for a city"
          placeholderTextColor="#999"
          value={query}
          onChangeText={text => {
            setQuery(text);
            searchPlaces(text);
          }}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={Colors.primary || '#0066CC'}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handlePlaceSelect(item)}
            >
              <Ionicons
                name="location"
                size={20}
                color="#666"
                style={styles.locationIcon}
              />
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>{item.text}</Text>
                <Text style={styles.resultSubtext}>
                  {item.place_name.replace(item.text + ', ', '')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  loader: {
    marginTop: 20,
  },
  resultsList: {
    paddingHorizontal: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationIcon: {
    marginRight: 15,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  resultSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },
});
