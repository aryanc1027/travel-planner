import 'react-native-get-random-values';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import axios from 'axios';

export default function SearchPlace() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  const searchPlaces = async (text) => {
    if (text.length > 1) {
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
      }
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a city"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          searchPlaces(text);
        }}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.result}>{item.place_name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 75,
    backgroundColor: Colors.white,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
