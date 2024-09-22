import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore'; // Ensure 'collection' is imported
import { db } from '../../configs/FirebaseConfig';

export default function Banner() {
  const [bannerData, setBanner] = useState([]);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = async () => {
    try {
      setBanner([]);
      let banners = [];
      const snap = await getDocs(collection(db, 'Banner'));

      snap.forEach((doc) => {
        const data = doc.data();
        banners.push(data);
      });


      setBanner(banners);
    } catch (error) {
      console.error("Error fetching banners: ", error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginRight: 10 }}>

        <Image
          source={{ uri: item?.image }}
          style={styles.containerImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View>

      <FlatList
        data={bannerData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      // contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,

  },

  containerImage: {
    height: 200,
    width: Dimensions.get('window').width * 0.9,
    marginRight: 5,
    borderRadius: 9


  }
})