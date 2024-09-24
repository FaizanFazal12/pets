import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import Colors from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function FavouriteList({ userId }) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const {user} = useUser();
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const q = query(collection(db, "favourites"), where("userId", "==", user.id));
        const querySnapshot = await getDocs(q);
        const petsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavourites(petsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favourite pets:", error);
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [user]);

  const renderItem = ({ item }) => (
    <View

    style={styles.cardContainer}>

    <Image
      source={{ uri: item?.petImage }}
      style={styles.image}
      resizeMode="cover"
    />


    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item?.petName}</Text>
      <Text style={styles.breed}>{item?.petBreed || "Unknown Breed"}</Text>
    </View>
  </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Pets</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
  petItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: Colors.LIGHT_PRIMARY,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    alignItems: 'center',
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  petBreed: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  petId: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  age: {
    fontSize: 12,
    fontFamily: 'outfit',
    color: Colors.GRAY,
    marginTop: 2,
  },
});
