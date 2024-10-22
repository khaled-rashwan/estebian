import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native'; // Import for native, or adjust for web if necessary

const SignOutButton = () => {
  const { signOut } = useAuthenticator(); // Access the `signOut` method from AWS Amplify Authenticator

  return (
    <Pressable onPress={signOut} style={styles.signOutButton}>
      <Text style={styles.buttonText}>تسجيل خروج</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    margin: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignOutButton;
