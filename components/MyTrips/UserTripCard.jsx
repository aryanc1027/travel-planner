import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
import { Colors, lightColors, darkColors } from '../../constants/Colors'
import { useTheme } from '../../context/themeContext'

export default function UserTripCard({trip}) {
   // Parse JSON once at component level
   const logData = JSON.parse(trip.tripData);
   const { isDarkMode } = useTheme();
   const colors = isDarkMode ? darkColors : lightColors;
   
   const getImageUrl = () => {
     return logData.locationInfo.imageUrl;
   }

   const getStartDate = () => {
     return logData.startDate;
   }
    
  return (
    <View style={{
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: colors.background,
        padding: 12,
        borderRadius: 15,
        shadowColor: colors.shadow,
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
            color: colors.textDark,
            marginBottom: 6,
        }}>
          {trip.tripPlan.tripDetails?.location}
        </Text>
        
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: colors.textMuted,
            marginBottom: 4,
        }}>
          {moment(getStartDate()).format('DD MMMM YYYY')}
        </Text>
        
        
      </View>
    </View>
  )
}