import { View, Text } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CreateTripContext } from '../../context/createTripContext';
import { Colors, lightColors, darkColors } from '../../constants/Colors';
import { useTheme } from '../../context/themeContext';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
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

  const cardStyle = {
    backgroundColor: isDarkMode ? colors.backgroundLight : colors.white,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: isDarkMode ? 0.3 : 0.08,
    shadowRadius: 12,
    elevation: 8,
    ...(isDarkMode && {
      borderWidth: 1,
      borderColor: colors.primary + '20',
    }),
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: colors.background,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginBottom: 5,
          marginTop: 25,
          padding: 10,
          textAlign: 'center',
          color: colors.textDark,
        }}
      >
        Review Your Trip
      </Text>

      <View>
        {/* Destination Section */}
        <View style={cardStyle}>
          <View style={{ padding: 12, borderRadius: 15 }}>
            <Ionicons name="location-sharp" size={34} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: colors.textMuted }}>
              Destination
            </Text>
            <Text style={{ 
              fontFamily: 'outfit-medium', 
              fontSize: 20, 
              color: colors.textDark, 
              marginTop: 2,
              flexWrap: 'wrap'
            }}>
              {tripData.locationInfo?.name?.split(',')[0]}
            </Text>
            <Text style={{ 
              fontFamily: 'outfit-medium', 
              fontSize: 16, 
              color: colors.primary, 
              marginTop: 4,
              flexWrap: 'wrap'
            }}>
              {tripData.locationInfo?.name?.split(',').slice(1).join(', ').trim()}
            </Text>
          </View>
        </View>

        {/* Travel Dates Section */}
        <View style={cardStyle}>
          <View style={{ padding: 12, borderRadius: 15 }}>
            <Ionicons name="calendar" size={34} color="#FF9500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: colors.textMuted }}>
              Travel Dates
            </Text>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: colors.textDark, marginTop: 2 }}>
              {moment(tripData?.startDate).format('DD MMMM')}
              <Text style={{ color: colors.textMuted }}> to </Text>
              {moment(tripData?.endDate).format('DD MMMM')}
            </Text>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 16, color: colors.primary, marginTop: 4 }}>
              {tripData?.totalDays === 1 ? '1 Day' : `${tripData?.totalDays} Days`}
            </Text>
          </View>
        </View>

        {/* Travelers Section */}
        <View style={cardStyle}>
          <View style={{ padding: 12, borderRadius: 15 }}>
            <Ionicons name="people" size={34} color="#4CAF50" />
          </View>
          <View>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: colors.textMuted }}>
              Who is Traveling?
            </Text>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: colors.textDark }}>
              {tripData.traveler}
            </Text>
          </View>
        </View>

        {/* Budget Section */}
        <View style={cardStyle}>
          <View style={{ padding: 12, borderRadius: 15 }}>
            <Ionicons name="wallet" size={34} color="#9C27B0" />
          </View>
          <View>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, color: colors.textMuted }}>
              Budget
            </Text>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: colors.textDark }}>
              {tripData.budget}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.replace('/create-trip/generate-trip')}
        style={{
          padding: 18,
          backgroundColor: colors.primary,
          borderRadius: 15,
          marginTop: 'auto',
          marginHorizontal: 5,
          shadowColor: colors.primary,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
          marginBottom: 60,
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}>
          <Text style={{
            textAlign: 'center',
            color: colors.white,
            fontFamily: 'outfit-medium',
            fontSize: 18,
          }}>
            Build Your Trip
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
