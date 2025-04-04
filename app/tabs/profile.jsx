import { View, Text, TouchableOpacity, StyleSheet, TextInput, Switch, ScrollView, SafeAreaView } from 'react-native';
import React from 'react';
import { Colors, lightColors, darkColors } from '../../constants/Colors';
import { auth } from '../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { updateProfile, updateEmail, sendPasswordResetEmail } from 'firebase/auth';
import { useTheme } from '../../context/themeContext';

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;
  const [fullName, setFullName] = React.useState(user?.displayName || '');
  const [email, setEmail] = React.useState(user?.email || '');
  const { isDarkMode, toggleDarkMode, isSystemTheme, toggleSystemTheme } = useTheme();
  
  const colors = isDarkMode ? darkColors : lightColors;

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textDark }]}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.lightGrey + '20' }]}>
            <Ionicons name="person-circle" size={100} color={colors.primary} />
          </View>
          
          <Text style={[styles.userName, { color: colors.textDark }]}>{fullName || 'Your Name'}</Text>
          <Text style={[styles.userEmail, { color: colors.textMuted }]}>{email || 'your.email@example.com'}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Personal Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: colors.textDark }]}>Full Name</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.lightGrey + '20',
                color: colors.textDark,
                borderColor: colors.lightGrey + '40'
              }]}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textMuted}
            />
            
            <Text style={[styles.label, { color: colors.textDark }]}>Email</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: colors.lightGrey + '20',
                color: colors.textDark,
                borderColor: colors.lightGrey + '40'
              }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.textMuted}
            />
            
            <TouchableOpacity 
              style={[styles.updateButton, { backgroundColor: colors.primary }]} 
              onPress={handleUpdateProfile}
            >
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Security</Text>
          <TouchableOpacity 
            style={[styles.securityButton, { backgroundColor: colors.lightGrey + '20' }]} 
            onPress={handleChangePassword}
          >
            <View style={styles.securityButtonContent}>
              <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
              <Text style={[styles.securityButtonText, { color: colors.textDark }]}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textDark }]}>Appearance</Text>
          <View style={[styles.themeOption, { borderColor: colors.lightGrey + '30' }]}>
            <Text style={[styles.themeOptionText, { color: colors.textDark }]}>Use System Theme</Text>
            <Switch
              value={isSystemTheme}
              onValueChange={toggleSystemTheme}
              trackColor={{ false: colors.lightGrey, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          {!isSystemTheme && (
            <View style={[styles.themeOption, { borderColor: colors.lightGrey + '30' }]}>
              <Text style={[styles.themeOptionText, { color: colors.textDark }]}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: colors.lightGrey, true: colors.primary }}
                thumbColor={colors.white}
              />
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.error }]} 
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.white} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    marginBottom: 5,
  },
  userEmail: {
    fontFamily: 'outfit',
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontFamily: 'outfit',
    fontSize: 16,
    borderWidth: 1,
  },
  updateButton: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  updateButtonText: {
    fontFamily: 'outfit-medium',
    color: Colors.white,
    fontSize: 16,
  },
  securityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
  },
  securityButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityButtonText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    marginLeft: 12,
  },
  themeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  themeOptionText: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutText: {
    fontFamily: 'outfit-medium',
    color: Colors.white,
    fontSize: 16,
    marginLeft: 10,
  },
  bottomPadding: {
    height: 30,
  },
});
