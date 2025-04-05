import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function ItineraryList({itineraryData}) {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;

  // Helper function to render individual schedule items
  const renderScheduleItems = (schedule) => {
    return schedule.map((item, index) => (
      <View key={index} style={[styles.scheduleItem, {
        backgroundColor: isDarkMode ? colors.backgroundDark : colors.lightGrey + '20',
      }]}>
        <Text style={[styles.scheduleTime, { color: colors.textDark }]}>{item.time}</Text>
        <Text style={[styles.scheduleActivity, { color: colors.textDark }]}>{item.activity}</Text>
        {item.location && (
          <Text style={[styles.scheduleLocation, { color: colors.textMuted }]}>📍 {item.location}</Text>
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
      <Text style={[styles.title, { color: colors.textDark }]}>Daily Itinerary</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <View key={index} style={[styles.dayCard, {
              backgroundColor: isDarkMode ? colors.backgroundLight : colors.white,
              borderWidth: 1,
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0.3 : 0.08,
              shadowRadius: 4,
              elevation: 3,
            }]}>
              <View style={[styles.dayHeader, {
                borderBottomColor: isDarkMode ? colors.primary + '20' : colors.lightGrey,
              }]}>
                <Text style={[styles.dayTitle, { color: colors.textDark }]}>
                  {day.dayNumber.replace(/day(\d+)/i, 'Day $1').toUpperCase()}
                </Text>
                <Text style={[styles.dayTheme, { color: colors.primary }]}>{day.theme}</Text>
                <Text style={[styles.dayDate, { color: colors.textMuted }]}>
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
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  dayCard: {
    width: 300,
    borderRadius: 20,
    padding: 20,
    maxHeight: 500,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },
  dayHeader: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  dayTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  dayTheme: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginTop: 4,
  },
  dayDate: {
    fontFamily: 'outfit',
    fontSize: 16,
    marginTop: 4,
  },
  scheduleContainer: {
    maxHeight: 400,
  },
  scheduleItem: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  scheduleTime: {
    fontFamily: 'outfit-bold',
    fontSize: 16,
    marginBottom: 4,
  },
  scheduleActivity: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginBottom: 4,
  },
  scheduleLocation: {
    fontFamily: 'outfit',
    fontSize: 14,
  },
});