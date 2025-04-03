import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function ItineraryList({itineraryData}) {
  // Helper function to render individual schedule items
  const renderScheduleItems = (schedule) => {
    return schedule.map((item, index) => (
      <View key={index} style={styles.scheduleItem}>
        <Text style={styles.scheduleTime}>{item.time}</Text>
        <Text style={styles.scheduleActivity}>{item.activity}</Text>
        {item.location && (
          <Text style={styles.scheduleLocation}>📍 {item.location}</Text>
        )}
      </View>
    ));
  };

  // Convert itinerary object to array and sort by day number
  const days = Object.entries(itineraryData || {})
    .map(([key, value]) => ({
      dayNumber: key,
      dayNum: parseInt(key.replace('day', '')), // Extract number from 'day1', 'day2', etc.
      ...value
    }))
    .sort((a, b) => a.dayNum - b.dayNum); // Sort by day number

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Itinerary</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <View key={index} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>
                  {day.dayNumber.replace(/day(\d+)/i, 'Day $1').toUpperCase()}
                </Text>
                <Text style={styles.dayTheme}>{day.theme}</Text>
                <Text style={styles.dayDate}>
                  {new Date(day.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </View>
              
              <ScrollView style={styles.scheduleContainer}>
                {renderScheduleItems(day.schedule)}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 26,
    marginBottom: 15,
    color: '#1A1A1A',
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  dayCard: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    maxHeight: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  dayHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  dayTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    color: '#1A1A1A',
  },
  dayTheme: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#4B9CD3',
    marginTop: 4,
  },
  dayDate: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  scheduleContainer: {
    maxHeight: 400,
  },
  scheduleItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  scheduleTime: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  scheduleActivity: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  scheduleLocation: {
    fontFamily: 'outfit',
    fontSize: 14,
    color: '#666666',
  },
});