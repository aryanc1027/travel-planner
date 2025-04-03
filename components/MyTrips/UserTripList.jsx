import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors'
import UserTripCard from './UserTripCard'
import { useRouter } from 'expo-router';
export default function UserTripList({userTrips}) {
    const LatestTrip = userTrips[0]?.tripPlan
    const router = useRouter();

    const imageUrl = useMemo(() => {
      if (!userTrips[0]?.tripData) return null;
      const logData = JSON.parse(userTrips[0].tripData);
      return logData.locationInfo.imageUrl;
    }, [userTrips[0]?.tripData]);

    const getStartDate = useMemo(() => {
      if (!userTrips[0]?.tripData) return null;
      const logData = JSON.parse(userTrips[0].tripData);
      return logData.startDate;
    }, [userTrips[0]?.tripData]);

    return userTrips && (
      <View>
        <View style={{
          marginTop: 20,
          shadowColor: '#000',
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
              color: '#1A1A1A',
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
                color: Colors.grey,
            }}>
                {moment(getStartDate).format('DD MMMM YYYY')}
            </Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                color: Colors.grey,
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
                tripData: JSON.stringify(userTrips[0])
              }
            })}
            style={{
              backgroundColor: Colors.primary,
              padding: 12,
              borderRadius: 12,
              marginTop: 12,
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
              elevation: 3,
          }}>
              <Text style={{
                  color: 'white', 
                  textAlign: 'center', 
                  fontFamily: 'outfit-medium', 
                  fontSize: 15
              }}>
                  See Details
              </Text>
          </TouchableOpacity>

          {userTrips.slice(1).reverse().map((trip, index) => (
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
    )
}