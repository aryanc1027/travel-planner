import 'react-native-get-random-values';
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



export default function SearchPlace() {

  const navigation = useNavigation();



  useEffect(() => {
    navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: 'Search',
    })
  }, [])
  return (
    <View style={{
        padding: 50,
        paddingTop: 75,
        backgroundColor: Colors.white,  
        height: '100%',
    }}>
      <GooglePlacesAutocomplete
        
        placeholder='Search'
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        minLength={2}
        debounce={300}
        onFail={error => {
          console.error('Error message:', error.message);
          

        }}
      />
    </View>
  )
}

