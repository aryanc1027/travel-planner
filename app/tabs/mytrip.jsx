import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../configs/FirebaseConfig';
import { ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() =>{
    user && GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"), 
      where("userId", "==", user.uid),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      setUserTrips(prev => [...prev, doc.data()]);
    });
    setLoading(false);
  }

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
          }}
        >
          My Trips
        </Text>
        <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
          <Ionicons name="add" size={40} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator size="large" color={Colors.primary} /> : 
        userTrips.length == 0 ? <StartNewTripCard /> : <UserTripList userTrips={userTrips}/>
      }
    </ScrollView>
  );
}
