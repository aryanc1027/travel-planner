import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function HotelList({hotelData}) {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  const renderAmenities = (amenities) => {
    return (
      <View style={styles.amenitiesContainer}>
        {amenities.map((amenity, index) => (
          <Text key={index} style={[styles.amenityItem, { color: colors.textMuted }]}>• {amenity}</Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textDark }]}>Hotel Options</Text>
      
      {hotelData?.map((hotel, index) => (
        <View key={index} style={[styles.hotelSection, {
          backgroundColor: isDarkMode ? colors.backgroundLight : colors.white,
          borderWidth: 1,
          borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDarkMode ? 0.3 : 0.08,
          shadowRadius: 4,
          elevation: 3,
        }]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.hotelName, { color: colors.textDark }]}>{hotel.hotelName}</Text>
            <Text style={[styles.price, { color: colors.success }]}>${hotel.price}/night</Text>
          </View>

          <Text style={[styles.rating, { color: colors.warning }]}>Rating: {hotel.rating}⭐</Text>
          <Text style={[styles.address, { color: colors.textMuted }]}>{hotel.hotelAddress}</Text>
          <Text style={[styles.description, { color: colors.textDark }]}>{hotel.description}</Text>
          
          <Text style={[styles.amenitiesTitle, { color: colors.textDark }]}>Amenities:</Text>
          {renderAmenities(hotel.amenities)}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginBottom: 15,
  },
  hotelSection: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hotelName: {
    fontFamily: 'outfit-bold',
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
  },
  rating: {
    fontSize: 15,
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  amenitiesTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 15,
    marginBottom: 5,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityItem: {
    fontSize: 13,
  },
});