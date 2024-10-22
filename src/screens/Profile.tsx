import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { getCurrentUser, AuthUser } from 'aws-amplify/auth';

const Profile = () => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    fetchUserData();
  }, []);


  const handleUpdateProfile = () => {
    // Your profile update logic
    console.log('Profile updated!');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>تحميل البيانات الشخصية...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>البريد الإلكتروني: {user.signInDetails?.loginId}</Text>
    <Pressable style={styles.button} onPress={handleUpdateProfile}>
      <Text style={styles.buttonText}>تحديث البيانات</Text>
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent:'space-evenly',
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#007bff', // Your desired button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff', // White text for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
