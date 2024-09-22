import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PetsList from './PetsList'

export default function PetsListByCategory() {
  const [pets, setPets] = useState([]);

  const GetPetList = async(category) => {
    setPets([]);
    const q = query(collection(db, 'pets'), where('category', '==', category));
    const snap = await getDocs(q);
    let data = [];

    snap.forEach((doc) => {
      const pet = doc.data();
      data.push(pet);
    });

    setPets(data); // Update the state with fetched data
  }

  useEffect(() => {
    GetPetList('Dog'); // Default category
  }, []);

  return (
    <View style={styles.container}> 
      <Category category={(value) => GetPetList(value)} />

      <Text>Hi</Text>

      <FlatList
        data={pets}
        numColumns={2}  // Display items in two columns
        renderItem={({ item }) => <PetsList item={item} />} 
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}  // Optional: Hide the vertical scrollbar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
  }
});
