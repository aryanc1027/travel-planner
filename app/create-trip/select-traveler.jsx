import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { SelectTravelerOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '../../context/createTripContext';
import { Alert } from 'react-native';
export default function SelectTraveler() {
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState();
  const {tripData, setTripData} = useContext(CreateTripContext);
  const router = useRouter();

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

  const handleContinue = () => {
    if(!selectedOption) {
      Alert.alert('Please select your travelers');
      return;
    }
    setTripData({...tripData, traveler: selectedOption.title})
    router.push('/create-trip/select-dates');
  }


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
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        
        />
      </View>
      
      <TouchableOpacity 
      onPress={handleContinue}
      style={{
        padding: 20,
        backgroundColor: '#4B9CD3',
        borderRadius: 20,
        marginHorizontal: 5,
        shadowColor: "#4B9CD3",
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