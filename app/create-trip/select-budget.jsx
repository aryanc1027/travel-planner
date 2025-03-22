import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { useNavigation } from 'expo-router';
import { SelectBudgetOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { CreateTripContext } from '@/context/createTripContext';
import { Alert } from 'react-native';
import { Image } from 'react-native';
import { Colors } from '@/constants/Colors';


export default function SelectBudget() {
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
        selectedOption && setTripData({
            ...tripData,
            budget: selectedOption.title
        })
    }, [selectedOption])

    const handleContinue = () => {
        if(!selectedOption) {
            Alert.alert('Please select a budget');
            return;
        }
       router.push('');
    }

    
  return (
    <View style={{
        flex: 1,
        backgroundColor: Colors.white,
        padding: 25,
        paddingTop: 100,
    }}>
        

        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            marginBottom: 20,
            textAlign: 'center',
        }}>Choose a Budget</Text>

        <Text style={{
            fontFamily: 'outfit-regular',
            fontSize: 16,
            color: Colors.darkGrey,
            marginBottom: 30,
            textAlign: 'center',
            lineHeight: 22,
        }}>Select a budget range that works best for your travel plans.</Text>

        <FlatList
            data={SelectBudgetOptions}
            renderItem={({item, index}) => (
                <TouchableOpacity
                    onPress={() => setSelectedOption(item)}
                >
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
                padding: 16,
                backgroundColor: Colors.black,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
            }}>
            <Text style={{
                color: Colors.white,
                fontFamily: 'outfit-medium',
                fontSize: 18,
                textAlign: 'center',
            }}>Continue</Text>
        </TouchableOpacity>
    </View>
  )
}