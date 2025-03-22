import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import { Alert } from 'react-native';

export default function SignUp() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const OnCreateAccount = () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Please fill all the fields');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        router.replace('/tabs/mytrip');
      })
      .catch(error => {
        const errorCode = error.code;
        let errorMessage = error.message;

        if (errorMessage.includes(') ')) {
          errorMessage = errorMessage.split(') ')[1];
        }

        if (errorCode === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered';
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address';
        }

        Alert.alert(errorMessage);
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: -10,
        backgroundColor: Colors.white,
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Image
        source={require('../../../assets/images/plane.png')}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 0.1,
          resizeMode: 'contain',
        }}
      />
      <StatusBar barStyle="dark-content" />

      <Text style={styles.headerText}>Create New Account</Text>

      <View style={styles.formContainer}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={value => setFirstName(value)}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={value => setLastName(value)}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: 'outfit-medium' }}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color={Colors.darkGrey}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={OnCreateAccount}
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
            Create Account
          </Text>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('auth/sign-in/index')}
          >
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: Colors.lightGrey + '30',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeaderText: {
    fontFamily: 'outfit-regular',
    fontSize: 16,
    color: Colors.darkGrey,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginTop: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.lightGrey,
    marginTop: 10,
    fontFamily: 'outfit-regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.lightGrey,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontFamily: 'outfit-regular',
  },
  eyeIcon: {
    padding: 15,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLinkText: {
    fontFamily: 'outfit-regular',
    color: Colors.darkGrey,
  },
  loginLink: {
    fontFamily: 'outfit-medium',
    color: Colors.black,
  },
});
