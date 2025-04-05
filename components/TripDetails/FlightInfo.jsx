import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/themeContext';
import { lightColors, darkColors } from '../../constants/Colors';

export default function FlightInfo({flightData}) {
    const { isDarkMode } = useTheme();
    const colors = isDarkMode ? darkColors : lightColors;

    const cleanData = (str) => {
        if (!str) return ''; // Return empty string if value is undefined or null
        return str.replace(/\s*\(Example\)/i, '')  // Remove (Example)
                 .replace(/\s*Example - Replace with actual booking site/i, '') // Remove booking URL example text
                 .replace(/\s*Example - check current flights/i, '') // Remove flight check example text
                 .replace(/\s*example - confirm actual flight number/i, '')
                 .replace(/\s*\(\s*\)/, ''); // Remove empty parentheses
    }
    
    

    const departure = flightData?.departure ? {
        ...flightData.departure,
        airline: cleanData(flightData.departure.airline),
        destination: cleanData(flightData.departure.destination),
        origin: cleanData(flightData.departure.origin),
        flightNumber: cleanData(flightData.departure.flightNumber),
        bookingURL: cleanData(flightData.departure.bookingURL),
    } : {};
    
    const arrival = flightData?.arrival ? {
        ...flightData.arrival,
        airline: cleanData(flightData.arrival.airline),
        destination: cleanData(flightData.arrival.destination),
        origin: cleanData(flightData.arrival.origin),
        flightNumber: cleanData(flightData.arrival.flightNumber),
        bookingURL: cleanData(flightData.arrival.bookingURL),
    } : {};
    
    const renderField = (label, value) => {
        if (!value) return null;
        return (
            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: colors.textMuted }]}>{label}:</Text>
                <Text style={[styles.value, { color: colors.textDark }]}>{value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.textDark }]}>Flight Details</Text>

            {/* Departure Information */}
            <View style={[styles.flightSection, { 
                backgroundColor: isDarkMode ? colors.backgroundLight : colors.white,
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDarkMode ? 0.3 : 0.08,
                shadowRadius: 4,
                elevation: 3,
            }]}>
                <View style={[styles.headerContainer, { 
                    borderBottomColor: isDarkMode ? colors.primary + '20' : colors.lightGrey 
                }]}>
                    <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Departure Flight</Text>
                    {departure.flightPrice && (
                        <Text style={[styles.price, { color: colors.success }]}>${departure.flightPrice}</Text>
                    )}
                </View>
                {renderField('Airline', departure.airline)}
                {renderField('Flight #', departure.flightNumber)}
                {renderField('From', departure.destination)}
                {renderField('To', departure.origin)}
            </View>

            {/* Arrival Information */}
            <View style={[styles.flightSection, { 
                backgroundColor: isDarkMode ? colors.backgroundLight : colors.white,
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: isDarkMode ? 0.3 : 0.08,
                shadowRadius: 4,
                elevation: 3,
            }]}>
                <View style={[styles.headerContainer, { 
                    borderBottomColor: isDarkMode ? colors.primary + '20' : colors.lightGrey 
                }]}>
                    <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Return Flight</Text>
                    {arrival.flightPrice && (
                        <Text style={[styles.price, { color: colors.success }]}>${arrival.flightPrice}</Text>
                    )}
                </View>
                {renderField('Airline', arrival.airline)}
                {renderField('Flight #', arrival.flightNumber)}
                {renderField('From', arrival.destination)}
                {renderField('To', arrival.origin)}
            </View>
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
    flightSection: {
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
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
    },
    sectionTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
    },
    fieldContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    label: {
        fontFamily: 'outfit-bold',
        fontSize: 15,
        marginRight: 8,
        width: 75,
    },
    value: {
        fontSize: 15,
        flex: 1,
    },
    price: {
        fontSize: 16,
        fontFamily: 'outfit-bold',
    },
});