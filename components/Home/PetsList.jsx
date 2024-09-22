import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors'; // Import the Colors object
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function PetsList({ item }) {

  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(
          {
           pathname: '/pet-details',
            params: item
          }
        )
      }
      }
      style={styles.cardContainer}>

      <Image
        source={{ uri: item?.image }}
        style={styles.image}
        resizeMode="cover"
      />


      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.breed}>{item?.breed || "Unknown Breed"}</Text>
        <Text style={styles.age}>{item?.age} years old</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
