import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import ItineraryList from '../../components/TripDetails/ItineraryList';
import { doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../configs/FirebaseConfig';

export default function TripDetails() {
    const navigation = useNavigation();
    const router = useRouter();
    const {tripData} = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState();
    const [tripId, setTripId] = useState(null);
    
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
        
        // Find the trip ID by querying Firestore
        findTripId();
    }, []);

    const findTripId = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;
            
            // Query Firestore to find the trip document ID
            const q = query(
                collection(db, "UserTrips"),
                where("userId", "==", user.uid),
                where("userEmail", "==", user.email)
            );
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Compare the trip data to find the matching document
                if (data.tripData === parsedTripData.tripData) {
                    setTripId(doc.id);
                }
            });
        } catch (error) {
            console.error("Error finding trip ID:", error);
        }
    };

    const handleDeleteTrip = () => {
        if (!tripId) {
            Alert.alert("Error", "Could not find trip ID. Please try again later.");
            return;
        }
        
        Alert.alert(
            "Delete Trip",
            "Are you sure you want to delete this trip?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "Delete", 
                    onPress: deleteTrip,
                    style: "destructive"
                }
            ]
        );
    };

    const deleteTrip = async () => {
        try {
            if (!tripId) {
                Alert.alert("Error", "Could not find trip ID. Please try again later.");
                return;
            }
            
            // Delete the trip from Firestore
            await deleteDoc(doc(db, "UserTrips", tripId));
            
            // Navigate back to MyTrips screen
            router.replace('/tabs/mytrip');
        } catch (error) {
            console.error("Error deleting trip:", error);
            Alert.alert("Error", "Failed to delete trip. Please try again.");
        }
    };

    return tripDetails && (
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            scrollEventThrottle={16}
            style={{ backgroundColor: 'white' }}
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
            <View style={{ marginBottom: 20 }}>
                <ItineraryList itineraryData={parsedTripData?.tripPlan?.itinerary}/>
            </View>
            
            {/* Delete Trip Button */}
            <View style={{ paddingHorizontal: 5 }}>
                <TouchableOpacity 
                    onPress={handleDeleteTrip}
                    style={{
                        backgroundColor: 'red',
                        padding: 15,
                        borderRadius: 12,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        shadowColor: 'red',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.2,
                        shadowRadius: 6,
                        elevation: 3,
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontFamily: 'outfit-bold',
                        fontSize: 16,
                    }}>
                        Delete Trip
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    )
}