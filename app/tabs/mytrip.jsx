import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Colors, lightColors, darkColors } from '../../constants/Colors';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../configs/FirebaseConfig';
import { ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserTripList from '../../components/MyTrips/UserTripList';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/themeContext';

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

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
    let trips = [];
    querySnapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    // Sort trips by creation time (newest first)
    // Assuming there's a createdAt field in your trip data
    trips.sort((a, b) => b.createdAt - a.createdAt);
    setUserTrips(trips);
    setLoading(false);
  }

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: colors.background,
        height: '100%',
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 28, color: colors.textDark }}>
          {userTrips.length === 1 ? 'My Trip' : 'My Trips'}
        </Text>
        <TouchableOpacity onPress={() => router.push('/create-trip/search-place')}>
          <Ionicons name="add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : userTrips.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList trips={userTrips} />
      )}
    </ScrollView>
  );
}
