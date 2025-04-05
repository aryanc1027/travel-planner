import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';
import { SelectTravelerOptions, SelectBudgetOptions } from '../../constants/Options';
import moment from 'moment';
import { useRouter } from 'expo-router';
import { getCurrentSeasonDestinations } from '../../constants/SeasonalDestinations';

export default function Discover() {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode ? darkColors : lightColors;
  const router = useRouter();
  
  const travelStyleDestinations = {
    'Just Me': [
      {
        name: 'Bangkok, Thailand',
        description: 'Perfect for solo backpackers',
        imageUrl: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
        budget: 'Cost-effective',
        bestSeason: 'November to March'
      },
      {
        name: 'Barcelona, Spain',
        description: 'Solo-friendly Mediterranean city',
        imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        budget: 'Mid-range',
        bestSeason: 'April to October'
      },
      {
        name: 'Tokyo, Japan',
        description: 'Safe and exciting solo adventure',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
        budget: 'Mid-range',
        bestSeason: 'March to May'
      },
      {
        name: 'Berlin, Germany',
        description: 'Cultural hub with vibrant nightlife',
        imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047',
        budget: 'Mid-range',
        bestSeason: 'May to September'
      },
      {
        name: 'Seoul, South Korea',
        description: 'Modern city with rich traditions',
        imageUrl: 'https://images.unsplash.com/photo-1506816561089-5cc37b3aa9b0',
        budget: 'Mid-range',
        bestSeason: 'March to May'
      }
    ],
    'A Couple': [
      {
        name: 'Paris, France',
        description: 'The city of love',
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        budget: 'Luxury',
        bestSeason: 'April to October'
      },
      {
        name: 'Santorini, Greece',
        description: 'Romantic island getaway',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        budget: 'Luxury',
        bestSeason: 'June to September'
      },
      {
        name: 'Maldives',
        description: 'Paradise for two',
        imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
        budget: 'Luxury',
        bestSeason: 'December to April'
      },
      {
        name: 'Venice, Italy',
        description: 'Romantic canals and historic charm',
        imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
        budget: 'Luxury',
        bestSeason: 'April to October'
      },
      {
        name: 'Kyoto, Japan',
        description: 'Traditional beauty and tranquility',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
        budget: 'Mid-range',
        bestSeason: 'March to May'
      },
      {
        name: 'Amalfi Coast, Italy',
        description: 'Coastal romance and Italian charm',
        imageUrl: 'https://images.unsplash.com/photo-1633321088355-d0f81134ca3b',
        budget: 'Luxury',
        bestSeason: 'May to September'
      }
    ],
    'A Family': [
      {
        name: 'Orlando, USA',
        description: 'Theme park paradise',
        imageUrl: 'https://images.unsplash.com/photo-1575089776834-8be34696ffb9',
        budget: 'Mid-range',
        bestSeason: 'March to May'
      },
      {
        name: 'Gold Coast, Australia',
        description: 'Beaches and wildlife adventures',
        imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
        budget: 'Mid-range',
        bestSeason: 'September to November'
      },
      {
        name: 'London, UK',
        description: 'Educational and entertaining',
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        budget: 'Mid-range',
        bestSeason: 'June to August'
      },
      {
        name: 'Singapore',
        description: 'Safe, clean, and full of attractions',
        imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
        budget: 'Mid-range',
        bestSeason: 'February to April'
      },
      {
        name: 'Copenhagen, Denmark',
        description: 'Family-friendly with Tivoli Gardens',
        imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc',
        budget: 'Mid-range',
        bestSeason: 'June to August'
      },
      {
        name: 'San Diego, USA',
        description: 'Beaches, zoo, and perfect weather',
        imageUrl: 'https://images.unsplash.com/photo-1619229725920-ac8b63b0631a',
        budget: 'Mid-range',
        bestSeason: 'March to November'
      }
    ],
    'A Group': [
      {
        name: 'Bali, Indonesia',
        description: 'Perfect for group adventures',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        budget: 'Cost-effective',
        bestSeason: 'April to October'
      },
      {
        name: 'Las Vegas, USA',
        description: 'Entertainment capital',
        imageUrl: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4',
        budget: 'Mid-range',
        bestSeason: 'March to May'
      },
      {
        name: 'Ibiza, Spain',
        description: 'Party and beach paradise',
        imageUrl: 'https://images.unsplash.com/photo-1597466599360-3b9775841aec',
        budget: 'Luxury',
        bestSeason: 'June to September'
      },
      {
        name: 'Phuket, Thailand',
        description: 'Beach parties and island hopping',
        imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5',
        budget: 'Cost-effective',
        bestSeason: 'November to April'
      },
      {
        name: 'Barcelona, Spain',
        description: 'Culture, beaches, and nightlife',
        imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        budget: 'Mid-range',
        bestSeason: 'April to October'
      },
      {
        name: 'Cancun, Mexico',
        description: 'Resort paradise with activities',
        imageUrl: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18',
        budget: 'Mid-range',
        bestSeason: 'December to April'
      }
    ],
  };

  const handleDestinationPress = (destination) => {
    // Navigate to search-place with pre-filled data
    router.push({
      pathname: '/create-trip/search-place',
      params: {
        initialSearch: destination.name
      }
    });
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) return 'Winter';
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    return 'Fall';
  };

  return (
    <ScrollView 
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
      contentContainerStyle={{
        padding: 15,
        paddingBottom: 40
      }}
    >
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 32,
        color: colors.textDark,
        marginTop: 50,
        marginBottom: 30,
        flexShrink: 1,
        flexWrap: 'nowrap',
      }}>
        Discover <Text style={{ color: colors.primary }}>Your Next Adventure</Text>
      </Text>

      {/* Travel Style Section */}
      <Text style={styles.sectionTitle(colors)}>Travel Your Way</Text>
      {SelectTravelerOptions.map((travelStyle) => (
        <View key={travelStyle.id} style={{ marginBottom: 25 }}>
          <View style={styles.travelStyleHeader}>
            {travelStyle.icon()}
            <Text style={styles.travelStyleTitle(colors)}>
              {travelStyle.title}
            </Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: -8 }}
          >
            {travelStyleDestinations[travelStyle.title]?.map((destination, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.destinationCard(colors, isDarkMode)}
                onPress={() => handleDestinationPress(destination)}
              >
                <Image
                  source={{ uri: destination.imageUrl }}
                  style={styles.destinationImage}
                  resizeMode="cover"
                />
                <View style={styles.destinationInfo}>
                  <Text style={styles.destinationName(colors)}>
                    {destination.name}
                  </Text>
                  <Text style={styles.destinationDescription(colors)}>
                    {destination.description}
                  </Text>
                  <Text style={styles.destinationMeta(colors)}>
                    {destination.budget} • Best: {destination.bestSeason}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}

      {/* Seasonal Picks */}
      <Text style={styles.sectionTitle(colors)}>
        Perfect for {getCurrentSeason()}
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: -8 }}
      >
        {getCurrentSeasonDestinations().map((destination, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.destinationCard(colors, isDarkMode)}
            onPress={() => handleDestinationPress(destination)}
          >
            <Image
              source={{ uri: destination.imageUrl }}
              style={styles.destinationImage}
              resizeMode="cover"
            />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName(colors)}>
                {destination.name}
              </Text>
              <Text style={styles.destinationDescription(colors)}>
                {destination.description}
              </Text>
              <Text style={styles.destinationMeta(colors)}>
                {destination.budget} • Best: {destination.bestSeason}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: (colors) => ({
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: colors.textDark,
    marginVertical: 15,
  }),
  travelStyleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  travelStyleTitle: (colors) => ({
    fontFamily: 'outfit-medium',
    fontSize: 20,
    color: colors.textDark,
    marginLeft: 8,
  }),
  destinationCard: (colors, isDarkMode) => ({
    width: 280,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: colors.card,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkMode ? 0.1 : 0.15,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: isDarkMode ? 0 : 1,
    borderColor: 'rgba(0,0,0,0.1)',
  }),
  destinationImage: {
    width: '100%',
    height: 160,
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: (colors) => ({
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: colors.textDark,
    marginBottom: 4,
  }),
  destinationDescription: (colors) => ({
    fontFamily: 'outfit',
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 8,
  }),
  destinationMeta: (colors) => ({
    fontFamily: 'outfit',
    fontSize: 12,
    color: colors.textMuted,
    opacity: 0.8,
  }),
});
