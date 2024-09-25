import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import Colors from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function FavouriteList() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isLoaded, user } = useUser();



  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);



  useEffect(() => {
    const fetchFavourites = async () => {
      setLoading(true); 
      try {
        const q = query(collection(db, "favourites"), where("userId", "==", user.id));
        const querySnapshot = await getDocs(q);

        const petsList = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }));
        setFavourites(petsList);
      } catch (error) {
        console.error("Error fetching favourite pets:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (user) {
      fetchFavourites();
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => router.push(`/petDetail/${item.id}`)} // Navigate to pet detail
    >
      <Image
        source={{ uri: item.petImage }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.petName}</Text>
        <Text style={styles.breed}>{item.petBreed || "Unknown Breed"}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.loadingText}>Loading your favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Pets</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorite pets found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.PRIMARY,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.GRAY,
  },
  noFavorites: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.GRAY,
  },
  cardContainer: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    width: '45%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
  },
  breed: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    marginTop: 5,
  },
});
