import { View, Text, Image, Animated } from 'react-native';
import React, { useEffect, useRef, useContext, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from './../../context/createTripContext';
import { AI_Prompt } from './../../constants/Options';
import { chatSession } from '../../configs/AiModel';
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from '../../configs/FirebaseConfig';
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function GenerateTrip() {
  const navigation = useNavigation();
  const [dots, setDots] = React.useState('');
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;
  const [hasGenerated, setHasGenerated] = useState(false);
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
      headerTitleStyle: {
        color: colors.textDark,
      },
      headerStyle: {
        backgroundColor: isDarkMode ? colors.background + '80' : 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 0,
      },
    });
  }, [isDarkMode]);

  useEffect(() => {
    if (!hasGenerated && tripData) {
      setHasGenerated(true);
      GenerateAITrip();
    }
  }, [tripData]);

  const GenerateAITrip = async() => {
    if (!user) {
      console.error('No authenticated user found');
      return;
    }
    setLoading(true);
    const FinalPrompt = AI_Prompt.replace('{location}', tripData?.locationInfo?.name)
      .replace('{totalDays}', tripData?.totalDays)
      .replace('{totalNights}', tripData?.totalDays - 1)
      .replace('{traveler}', tripData?.traveler)
      .replace('{budget}', tripData?.budget)
      .replace('{departureAirport}', tripData?.departureAirport?.name || '')
      .replace('{departureIATA}', tripData?.departureAirport?.iata || '')
      .replace('{totalDays}', tripData?.totalDays)
      .replace('{totalNights}', tripData?.totalDays - 1);
    //console.log(FinalPrompt);

    const result = await chatSession.sendMessage(FinalPrompt);
    //console.log(result.response.text());
    const tripResponse = JSON.parse(result.response.text());
    setLoading(false);
    const docID = (Date.now()).toString();
    try {
      const docRef = doc(db, "UserTrips", docID);
      const result_ = await setDoc(docRef, {
        userEmail: user.email,
        userId: user.uid,
        createdAt: new Date(),
        tripPlan: tripResponse,  // AI trip plan
        tripData: JSON.stringify(tripData),  // User trip data
        docID: docID,
      });
      
      console.log("Document written successfully");
      router.push('/tabs/mytrip');
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle error appropriately
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: colors.background,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 33,
          color: colors.textDark,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        Generating your trip{dots}
      </Text>

      <Image
        source={require('./../../assets/images/plane.gif')}
        style={{
          width: '80%',
          height: 250,
          resizeMode: 'contain',
          backgroundColor: colors.background,
          alignSelf: 'center',
        }}
      />
    </View>
  );
}
