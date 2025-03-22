import { View, Text } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import { CreateTripContext } from '../../context/createTripContext';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';


export default function SelectDates() {
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const handleContinue = () => {
    if(!selectedStartDate || !selectedEndDate) {
      Alert.alert('Please select a start and end date');
      return;
    }
   
    
    const totalDays = moment(selectedEndDate).diff(moment(selectedStartDate), 'days');
    console.log(totalDays + 1);
    setTripData({
        ...tripData,
        startDate: moment(selectedStartDate).format('YYYY-MM-DD'),
        endDate: moment(selectedEndDate).format('YYYY-MM-DD'),
        totalDays: totalDays + 1,
    })
    router.push('/create-trip/select-budget');
  }

  return (
    <View style={{
      padding: 20,
      paddingTop: 50,
      backgroundColor: '#ffffff',
      height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 23,
        color: '#000000',
        marginBottom: 15,
        marginTop: 40,
        textAlign: 'center'
      }}>Select your travel dates</Text>

      <View style={{
        marginTop: 20,
        transform: [{ scale: 1.1 }],
        marginBottom: 20,
      }}>
        <CalendarPicker 
          onDateChange={onDateChange}
          allowRangeSelection={true} 
          minDate={new Date()}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
          selectedDayColor='#4B9CD3'
          selectedDayTextColor='#ffffff'
          startDate={selectedStartDate}
          endDate={selectedEndDate}
          width={350}
        />
      </View>

      <TouchableOpacity 
        onPress={handleContinue}
        style={{
          padding: 15,
          backgroundColor: '#4B9CD3',
          borderRadius: 15,
          marginHorizontal: 20,
          shadowColor: '#4B9CD3',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 5,
          marginBottom: 30,
          marginTop: 20
        }}>
        <Text style={{
          textAlign: 'center',
          color: '#ffffff',
          fontFamily: 'outfit-bold',
          fontSize: 18
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}


