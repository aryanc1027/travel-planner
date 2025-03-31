import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors } from '../../constants/Colors'

export default function UserTripCard({trip}) {
   const getImageUrl = () => {
    const logData = JSON.parse(trip.tripData);
    const imageUrl = logData.locationInfo.imageUrl;
    return imageUrl;
   }
    
  return (
    <View style={{
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    }}>
      <Image 
        source={{ uri: getImageUrl() }} 
        style={{
          width: 90, 
          height: 90, 
          borderRadius: 12
        }}
        resizeMode="cover"
      />
      
      <View style={{
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
      }}>
        <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            color: '#1A1A1A',
            marginBottom: 6,
        }}>
          {trip.tripPlan.tripDetails?.location}
        </Text>
        
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: Colors.grey,
            marginBottom: 4,
        }}>
          {moment(trip.tripPlan.startDate).format('DD MMMM YYYY')}
        </Text>
        
        
      </View>
    </View>
  )
}