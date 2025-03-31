import { View, Text } from 'react-native'
import React from 'react'

export default function FlightInfo({flightData}) {
    const departure = flightData.departure;
    const arrival = flightData.arrival;
    console.log(departure.airline)
  return (
    <View>
      <Text>{departure.airport}</Text>
      <Text>{arrival.airport}</Text>
    </View>
  )
}