import { View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const { height } = Dimensions.get('window');

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      {/* Background Image */}
      <Image 
        source={require('./../assets/images/login.jpg')} 
        style={{width:'100%', height:'100%', position: 'absolute'}}
      />
      
      {/* Gradient overlay - more transparent at top */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.2)',
      }}>
      </View>

      {/* White rounded bottom panel */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: height * 0.25, // Take up about 25% of screen from bottom
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
      }}>
        {/* App title at top of panel */}
        <Text style={{
          fontFamily:'outfit-bold', 
          fontSize:30, 
          color:'#000',
          marginBottom: 5,
          textAlign: 'center'
        }}>
          Plan Your Next Trip
        </Text>
        
        {/* Sign in button */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderRadius: 30,
            marginTop: 15,
            width: '100%',
            borderWidth: 1,
            borderColor: '#ddd',
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 3,
            justifyContent: 'center',
          }}
          onPress={() => console.log('Google Sign In')}
        >
          <Ionicons name="logo-google" size={22} color="#4285F4" style={{marginRight: 10}} />
          <Text style={{fontSize: 16, fontFamily: 'outfit-medium'}}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}