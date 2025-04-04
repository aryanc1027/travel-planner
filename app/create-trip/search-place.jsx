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
import { Colors, lightColors, darkColors } from '../../constants/Colors';
import { useTheme } from '../../context/themeContext';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { CreateTripContext } from '../../context/createTripContext';
import { getCityImageFromPlace } from './cityImage';
import { useRouter } from 'expo-router';

export default function SearchPlace() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;
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
        color: colors.textDark,
      },
      headerStyle: {
        backgroundColor: isDarkMode ? colors.background + '80' : 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 0,
      },
    });
  }, [isDarkMode]);

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
    router.push('/create-trip/select-departure-airport');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { 
        backgroundColor: isDarkMode ? colors.backgroundLight : '#f5f5f5',
        shadowColor: colors.shadow,
      }]}>
        <Ionicons
          name="search"
          size={20}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.input, { color: colors.textDark }]}
          placeholder="Search for a city"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={text => {
            setQuery(text);
            searchPlaces(text);
          }}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={colors.primary}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.resultItem, 
                { 
                  borderBottomWidth: 1,
                  borderBottomColor: isDarkMode ? colors.primary + '30' : '#f0f0f0',
                  backgroundColor: colors.background,
                }
              ]}
              onPress={() => handlePlaceSelect(item)}
            >
              <Ionicons
                name="location"
                size={20}
                color={colors.primary}
                style={styles.locationIcon}
              />
              <View style={styles.resultTextContainer}>
                <Text style={[styles.resultText, { color: colors.textDark }]}>
                  {item.text}
                </Text>
                <Text style={[styles.resultSubtext, { color: colors.textMuted }]}>
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
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 5,
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
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  locationIcon: {
    marginRight: 15,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
  },
  resultSubtext: {
    fontSize: 14,
    fontFamily: 'outfit',
    marginTop: 3,
  },
});
