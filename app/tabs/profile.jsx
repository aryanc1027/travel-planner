import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { auth } from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { updateProfile, updateEmail, sendPasswordResetEmail } from 'firebase/auth';

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;
  const [fullName, setFullName] = React.useState(user?.displayName || '');
  const [email, setEmail] = React.useState(user?.email || '');

  const handleUpdateProfile = async () => {
    try {
      if (user) {
        await updateProfile(user, { displayName: fullName });
        await updateEmail(user, email);
        Alert.alert("Success", "Profile updated successfully!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleChangePassword = () => {
    Alert.alert(
      "Change Password",
      "We will send you a password reset email",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send Email",
          onPress: async () => {
            try {
              await sendPasswordResetEmail(auth, user.email);
              Alert.alert("Success", "Password reset email sent!");
            } catch (error) {
              Alert.alert("Error", "Failed to send reset email. Please try again.");
            }
          }
        }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            auth.signOut()
              .then(() => {
                router.replace('/');
              })
              .catch((error) => {
                Alert.alert("Error", "Failed to logout. Please try again.");
              });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color={Colors.primary} />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
          />
          
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          
          <TouchableOpacity 
            style={styles.updateButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.changePasswordButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.changePasswordText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={Colors.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    color: Colors.black,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightGrey + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: Colors.darkGrey,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.lightGrey + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontFamily: 'outfit-regular',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    fontFamily: 'outfit-medium',
    color: Colors.white,
    fontSize: 16,
  },
  changePasswordButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  changePasswordText: {
    fontFamily: 'outfit-medium',
    color: Colors.primary,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'outfit-medium',
    color: Colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
});
