import { View, Text } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CreateTripContext } from '../../context/createTripContext';
import { Colors } from '../../constants/Colors';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: '#F5F7FA',
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
          color: '#1A1A1A',
        }}
      >
        Review Your Trip
      </Text>

      <View>
        {/* Destination Section */}
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 20,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 12,
              borderRadius: 15,
            }}
          >
            <Ionicons name="location-sharp" size={34} color="#4B9CD3" />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 16,
                color: '#666666',
              }}
            >
              Destination
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                color: '#1A1A1A',
                marginTop: 2,
              }}
            >
              {tripData.locationInfo?.name?.split(',')[0]}
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 16,
                color: '#4B9CD3',
                marginTop: 4,
              }}
            >
              {tripData.locationInfo?.name
                ?.split(',')
                .slice(1)
                .join(', ')
                .trim()}
            </Text>
          </View>
        </View>

        {/* Travel Dates Section */}
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 20,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 12,
              borderRadius: 15,
            }}
          >
            <Ionicons name="calendar" size={34} color="#FF9500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 16,
                color: '#666666',
              }}
            >
              Travel Dates
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 18,
                color: '#1A1A1A',
                marginTop: 2,
              }}
            >
              {moment(tripData?.startDate).format('DD MMMM')}
              <Text style={{ color: '#666666' }}> to </Text>
              {moment(tripData?.endDate).format('DD MMMM')}
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 16,
                color: '#4B9CD3',
                marginTop: 4,
              }}
            >
              {tripData?.totalDays === 1
                ? '1 Day'
                : `${tripData?.totalDays} Days`}
            </Text>
          </View>
        </View>

        {/* Travelers Section */}
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 20,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 12,
              borderRadius: 15,
            }}
          >
            <Ionicons name="people" size={34} color="#4CAF50" />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 16,
                color: '#666666',
              }}
            >
              Who is Traveling?
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                color: '#1A1A1A',
              }}
            >
              {tripData.traveler}
            </Text>
          </View>
        </View>

        {/* Budget Section */}
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 20,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              padding: 12,
              borderRadius: 15,
            }}
          >
            <Ionicons name="wallet" size={34} color="#9C27B0" />
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 16,
                color: '#666666',
              }}
            >
              Budget
            </Text>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                color: '#1A1A1A',
              }}
            >
              {tripData.budget}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.replace('/create-trip/generate-trip')}
        style={{
          padding: 18,
          backgroundColor: '#4B9CD3',
          borderRadius: 15,
          marginTop: 'auto',
          marginHorizontal: 5,
          shadowColor: '#4B9CD3',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: '#ffffff',
              fontFamily: 'outfit-medium',
              fontSize: 18,
            }}
          >
            Build Your Trip
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
