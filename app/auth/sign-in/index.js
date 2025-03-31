import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../constants/Colors';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import { Alert } from 'react-native';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []); // empty array to run only once

  const OnSignIn = () => {
    if (!email || !password) {
      Alert.alert('Please fill all the fields');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('Signed in', user);

        // Navigate to home screen
        router.replace('/tabs/mytrip');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/invalid-credential') {
          Alert.alert('Incorrect email or password');
        }
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        position: 'relative',
      }}
    >
    

      <View
        style={{
          padding: 25,
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            marginBottom: 5,
            textAlign: 'center',
          }}
        >
          Welcome Back
        </Text>

        <Text
          style={{
            fontFamily: 'outfit-regular',
            fontSize: 16,
            color: Colors.textMuted,
            marginBottom: 30,
            lineHeight: 22,
            textAlign: 'center',
          }}
        >
          Sign in to continue your journey and access your saved trips and
          itineraries.
        </Text>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              secureTextEntry={!passwordVisible}
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your password"
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={{ position: 'absolute', right: 15 }}
            >
              <Ionicons
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={22}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={OnSignIn}
          style={{
            padding: 15,
            backgroundColor: Colors.black,
            borderRadius: 30,
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: Colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-medium',
              color: Colors.white,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace('/auth/sign-up')}
          style={{
            padding: 15,
            backgroundColor: Colors.white,
            borderRadius: 30,
            marginTop: 20,
            borderWidth: 1,
            borderColor: Colors.lightGrey,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'outfit-medium',
              color: Colors.black,
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.lightGrey,
    marginTop: 10,
    fontFamily: 'outfit-regular',
  },
});
