import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PetsList from './PetsList'
import Colors from '../../constants/Colors'

export default function PetsListByCategory() {
  const [pets, setPets] = useState([]);

  const GetPetList = async(category) => {
    setPets([]);
    const q = query(collection(db, 'pets'), where('category', '==', category));
    const snap = await getDocs(q);


    snap.forEach((doc) => {
      const pet = doc.data();


      setPets((prev) => [...prev, pet]);
    });

  }

  useEffect(() => {
    GetPetList('Dog'); 
  }, []);

  return (
    <View style={styles.container}> 
      <Category category={(value) => GetPetList(value)} />

      <Text style={{
        fontFamily: 'outfit-medium', 
        fontSize: 22,
        textAlign: 'start', 
        marginLeft:10,
        margin:20
      }}>Pets</Text>

      <FlatList
        data={pets}
        numColumns={2}  // Display items in two columns
        renderItem={({ item }) => <PetsList item={item} />} 
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}  
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
