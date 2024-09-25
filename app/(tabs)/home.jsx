import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import Banner from "../../components/Home/Banner";
import PetsListByCategory from "../../components/Home/PetsListByCategory";
import Colors from "../../constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

export default function Home() {
  const data = [{}];
  const [loading, setLoading] = useState(true)

  const { isLoaded, user } = useUser();



  const router = useRouter();
  const renderItem = () => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "/pet-creates",
        });
      }}
      style={styles.pet}
    >
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 20,
          color: Colors.PRIMARY,
        }}
      >
        Add new Pet
      </Text>
      <MaterialIcons name="pets" size={24} color="black" />
    </TouchableOpacity>
  );


  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <>
          <Header />
          <Banner />
          <PetsListByCategory />
        </>
      }
      contentContainerStyle={{ padding: 20, marginTop: 30 }}
    />
  );
}

const styles = StyleSheet.create({
  pet: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 20,
  },
});
