import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import moment from 'moment'
import { Colors, lightColors, darkColors } from '../../constants/Colors'
import UserTripCard from './UserTripCard'
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/themeContext';

export default function UserTripList({trips}) {
    const LatestTrip = trips[0]?.tripPlan
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const imageUrl = useMemo(() => {
      if (!trips[0]?.tripData) return null;
      const logData = JSON.parse(trips[0].tripData);
      return logData.locationInfo.imageUrl;
    }, [trips[0]?.tripData]);

    const getStartDate = useMemo(() => {
      if (!trips[0]?.tripData) return null;
      const logData = JSON.parse(trips[0].tripData);
      return logData.startDate;
    }, [trips[0]?.tripData]);

    return trips && trips.length > 0 ? (
      <View>
        <View style={{
          marginTop: 20,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}>
          <Image 
            source={imageUrl ? {uri: imageUrl} : require('../../assets/images/react-logo.png')} 
            style={{
              width: '100%', 
              height: 240, 
              borderRadius: 15
            }}
            resizeMode="cover"
          />
        </View>

        <View style={{
          marginTop: 12,
        }}>
          <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 20,
              color: colors.textDark,
              marginBottom: 4,
          }}>
              {LatestTrip.tripDetails?.location}
          </Text>
          <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
          }}>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 15,
                color: colors.textMuted,
            }}>
                {moment(getStartDate).format('DD MMMM YYYY')}
            </Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: colors.textMuted,
            }}>
                {(() => {
                  const travelers = LatestTrip.tripDetails?.travelers.toLowerCase();
                  if (travelers === 'solo') return '✈️ Just me';
                  if (travelers.includes('family')) return '✈️ A family';
                  if (travelers.includes('group')) return '✈️ A group';
                  if (travelers.includes('couple')) return '❤️ A couple';
                  return `✈️ ${LatestTrip.tripDetails?.travelers}`;
                })()}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push({
              pathname: '/trip-details',
              params: {
                tripData: JSON.stringify(trips[0])
              }
            })}
            style={{
              backgroundColor: colors.primary,
              padding: 12,
              borderRadius: 12,
              marginTop: 12,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
          }}>
            <Text style={{
                fontFamily: 'outfit-medium',
                color: colors.white,
                textAlign: 'center',
                fontSize: 16,
            }}>
                View Trip Details
            </Text>
          </TouchableOpacity>

          {trips.slice(1).reverse().map((trip, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => router.push({
                  pathname: '/trip-details',
                  params: {
                    tripData: JSON.stringify(trip)
                  }
                })}
              >
                <UserTripCard trip={trip}/>
              </TouchableOpacity>
          ))}
        </View>
      </View>
    ) : null;
}