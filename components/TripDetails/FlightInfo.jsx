import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


export default function FlightInfo({flightData}) {
    const cleanData = (str) => {
        if (!str) return ''; // Return empty string if value is undefined or null
        return str.replace(/\s*\(Example\)/, '')  // Remove (Example)
                 .replace(/\s*Example - Replace with actual booking site/, '') // Remove booking URL example text
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
                <Text style={styles.label}>{label}:</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flight Details</Text>

            {/* Departure Information */}
            <View style={styles.flightSection}>
                <View style={styles.headerContainer}>
                    <Text style={styles.sectionTitle}>Departure Flight</Text>
                    {departure.flightPrice && (
                        <Text style={styles.price}>${departure.flightPrice}</Text>
                    )}
                </View>
                {renderField('Airline', departure.airline)}
                {renderField('Flight #', departure.flightNumber)}
                {renderField('From', departure.origin)}
                {renderField('To', departure.destination)}
            </View>

            {/* Arrival Information */}
            <View style={styles.flightSection}>
                <View style={styles.headerContainer}>
                    <Text style={styles.sectionTitle}>Return Flight</Text>
                    {arrival.flightPrice && (
                        <Text style={styles.price}>${arrival.flightPrice}</Text>
                    )}
                </View>
                {renderField('Airline', arrival.airline)}
                {renderField('Flight #', arrival.flightNumber)}
                {renderField('From', arrival.origin)}
                {renderField('To', arrival.destination)}
            </View>
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
    flightSection: {
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
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: '#34495e',
    },
    fieldContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    label: {
        fontFamily: 'outfit-bold',
        fontSize: 15,
        color: '#7f8c8d',
        marginRight: 8,
        width: 75,
    },
    value: {
        fontSize: 15,
        color: '#2c3e50',
        flex: 1,
    },
    price: {
        fontSize: 16,
        color: '#27ae60',
        fontFamily: 'outfit-bold',
    },
};