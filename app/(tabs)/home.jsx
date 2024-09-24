import { View, FlatList, Text, StyleSheet ,ScrollView ,SafeAreaView } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Banner from '../../components/Home/Banner';
import PetsListByCategory from '../../components/Home/PetsListByCategory';
import Colors from '../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

export default function Home() {
  
  const data = [{}];

  const renderItem = () => (
    <TouchableOpacity style={styles.pet}>
      <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:Colors.PRIMARY
      }}>Add new Pet</Text>
      <MaterialIcons name="pets" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    // <FlatList
    //   data={data} 
    //   renderItem={renderItem} 
    //   keyExtractor={(item, index) => index.toString()}
    //   ListHeaderComponent={
    //     <>
    //       <Header />
    //       <Banner />
    //       <PetsListByCategory />
    //     </>
    //   }
    //   contentContainerStyle={{ padding: 20, marginTop: 30 }} 
    // />

    <SafeAreaView>

    <View>
      <ScrollView>
        <Header />
        <Banner />
        <PetsListByCategory />
        <TouchableOpacity style={styles.pet}>
      <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:Colors.PRIMARY
      }}>Add new Pet</Text>
      <MaterialIcons name="pets" size={24} color="black" />
    </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  pet: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius:10,
    marginBottom:20

  },
});
