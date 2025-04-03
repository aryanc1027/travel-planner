import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import ItineraryList from '../../components/TripDetails/ItineraryList';
export default function TripDetails() {
    const navigation = useNavigation();
    const {tripData} = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState();
    
    // Parse JSON once at component level
    const parsedTripData = JSON.parse(tripData);
    const logData = JSON.parse(parsedTripData.tripData);

    
    // Get all needed data
    const imageUrl = logData.locationInfo.imageUrl;
    const startDate = logData.startDate;
    const endDate = logData.endDate;


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
            headerStyle: {
                backgroundColor: 'transparent',
            },
            headerBackground: () => null,
        });
        setTripDetails(parsedTripData);
    }, [])

    return tripDetails && (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
                if (nativeEvent.contentOffset.y > 100) {
                    navigation.setOptions({ headerShown: false });
                } else {
                    navigation.setOptions({ 
                        headerShown: true,
                        headerTransparent: true 
                    });
                }
            }}
        >
            <Image source={{uri: imageUrl}} style={{width: '100%', height: 300}}/>
            <View style={{
                padding: 15,
                backgroundColor: Colors.white,
                marginTop: -30,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
            }}>
                <Text style={{
                    fontSize: 25,
                    fontFamily: 'outfit-bold',
                }}>{tripDetails?.tripPlan.tripDetails?.location}</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                    marginTop: 5,

                }}>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 18,
                        color: Colors.grey,
                    }}>
                        {moment(startDate).format('DD MMMM YYYY')}
                    </Text>
                    <Text style={{
                        fontFamily: 'outfit',
                        fontSize: 18,
                        color: Colors.grey,
                    }}>
                        - {moment(endDate).format('DD MMMM YYYY')}
                    </Text>
                </View>
                <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.grey,
            }}>
                {(() => {
                  const travelers = tripDetails?.tripPlan.tripDetails?.travelers.toLowerCase();
                  if (travelers === 'solo') return '✈️ Just me';
                  if (travelers.includes('family')) return '✈️ A family';
                  if (travelers.includes('group')) return '✈️ A group';
                  if (travelers.includes('couple')) return '❤️ A couple';
                  return `✈️ ${tripDetails?.tripPlan.tripDetails?.travelers}`;
                })()}
            </Text>


            {/* Flight info */}
            <FlightInfo flightData={parsedTripData?.tripPlan?.flights} />

            {/* Hotel List  */}
            <HotelList hotelData={parsedTripData?.tripPlan?.hotels} />

            {/* Day plan */}
            <ItineraryList itineraryData={parsedTripData?.tripPlan?.itinerary}/>
            </View>

            


        </ScrollView>
    )
}