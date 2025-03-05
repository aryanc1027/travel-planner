import { Text, View } from 'react-native';
import Login from '../components/Login';
import { auth } from '../configs/FirebaseConfig';
import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';


export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    

    return unsubscribe;
  }, []);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ?
      <Redirect href="./tabs/mytrip"/> :
      <Login/>
      }
    </View>
  );
}



