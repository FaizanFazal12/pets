import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const { user, isLoaded } = useUser(); // Check if user data is loaded
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Start loading when logging out
    await signOut();
    setLoading(false); // Stop loading after sign out
    router.push('/login'); // Redirect to login page
  };

  useEffect(() => {
    // If user is not loaded, we can show a loader or handle it as needed
    if (!isLoaded) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>User Profile</Text>
          {user.imageUrl && (
            <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
          )}
          <Text style={styles.infoText}>Name: {user.fullName}</Text>
          <Text style={styles.infoText}>Email: {user.primaryEmailAddress?.emailAddress}</Text>

          <Button title="Logout" onPress={handleLogout} color={Colors.SECONDARY} />
        </>
      ) : (
        <Text style={styles.infoText}>No user is logged in.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  infoText: {
    fontSize: 18,
    color: Colors.GRAY,
    marginVertical: 5,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_PRIMARY,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.GRAY,
  },
});
