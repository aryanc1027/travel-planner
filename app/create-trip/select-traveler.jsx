import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from 'expo-router';
import { SelectTravelerOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '../../context/createTripContext';

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState();
  const {tripData, setTripData} = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
    });
  }, []);

  
  useEffect(() => {
    setTripData({...tripData, traveler: selectedOption})

  }, [selectedOption]);


  return (
    <View style={{
      padding: 20,
      paddingTop: 50,
      backgroundColor: Colors.white,
      height: '100%',
    }}>
      <View style={{
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 23,
          color: Colors.black,
          marginBottom: 15,
          marginTop: 40,
          textAlign: 'center',
        }}>Select your travelers</Text>

        <FlatList
          data={SelectTravelerOptions}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} selected={selectedOption} />
            </TouchableOpacity>
          )}
        
        />
      </View>
      <TouchableOpacity style={{
        padding: 20,
        backgroundColor: '#007AFF',
        borderRadius: 20,
        marginHorizontal: 5,
        shadowColor: "#007AFF",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: 50,
      }}>
        <Text style={{
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'outfit-bold',
          fontSize: 20,
        }}>Continue</Text>
      </TouchableOpacity>
    </View>

  )
}