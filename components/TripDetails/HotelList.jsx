import { View, Text } from 'react-native'
import React from 'react'

export default function HotelList({hotelData}) {
  const renderAmenities = (amenities) => {
    return (
      <View style={styles.amenitiesContainer}>
        {amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenityItem}>• {amenity}</Text>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel Options</Text>
      
      {hotelData?.map((hotel, index) => (
        <View key={index} style={styles.hotelSection}>
          <View style={styles.headerContainer}>
            <Text style={styles.hotelName}>{hotel.hotelName}</Text>
            <Text style={styles.price}>${hotel.price}/night</Text>
          </View>

          <Text style={styles.rating}>Rating: {hotel.rating}⭐</Text>
          <Text style={styles.address}>{hotel.hotelAddress}</Text>
          <Text style={styles.description}>{hotel.description}</Text>
          
          <Text style={styles.amenitiesTitle}>Amenities:</Text>
          {renderAmenities(hotel.amenities)}
        </View>
      ))}
    </View>
  )
}

const styles = {
  container: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 22,
    marginBottom: 15,
    color: '#2c3e50',
  },
  hotelSection: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
    color: '#34495e',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#27ae60',
    fontFamily: 'outfit-bold',
  },
  rating: {
    fontSize: 15,
    color: '#f39c12',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 10,
  },
  amenitiesTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 15,
    color: '#34495e',
    marginBottom: 5,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityItem: {
    fontSize: 13,
    color: '#7f8c8d',
  },
};