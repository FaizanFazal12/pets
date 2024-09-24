import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Colors from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { Picker } from '@react-native-picker/picker';  

export default function PetCreate() {
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    about: "",
    image: "",
    category:"",
    weight:""
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSave = async () => {
    const { name, breed, age, about, image ,category } = form;
    if (!name || !breed || !age || !image) {
      Alert.alert("Error", "All fields except 'about' are required");
      return;
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const newPet = {
      name: name,
      id: 1,
      breed: breed,
      age: age,
      about: about,
      weight: weight,
      category: category,
      image: image,
      userimage: user.imageUrl,
      username: user.fullName,
      email: userEmail,
      timestamp: new Date(),
    };

    setLoading(true);

    try {
      await addDoc(collection(db, "pets"), newPet);
      Alert.alert("Success", "Pet saved successfully!");

      setForm({
        name: "",
        breed: "",
        age: "",
        about: "",
        image: "",
        category:'',
        weight:''
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save pet: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      setCategoryList([]);
      let categories = [];
      const snap = await getDocs(collection(db, "category"));

      snap.forEach((doc) => {
        const data = doc.data();
        categories.push(data);
      });

      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Pet</Text>

      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet's name"
        value={form.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter breed"
        value={form.breed}
        onChangeText={(value) => handleInputChange("breed", value)}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        value={form.age}
        onChangeText={(value) => handleInputChange("age", value)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Weight</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        value={form.weight}
        onChangeText={(value) => handleInputChange("weight", value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.category}
          onValueChange={(value) => handleInputChange("category", value)}
          style={styles.picker}
        >

            {
                categoryList.map((category) => (
                  <Picker.Item key={category.id} label={category.name} value={category.name} />
                ))}
        
          {/* <Picker.Item label="Select category" value="" />
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
          <Picker.Item label="Bird" value="bird" />
          <Picker.Item label="Other" value="other" /> */}
        </Picker>
      </View>
      <Text style={styles.label}>About Pet (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter details about the pet"
        value={form.about}
        onChangeText={(value) => handleInputChange("about", value)}
      />

      <Text style={styles.label}>Image URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter image URL"
        value={form.image}
        onChangeText={(value) => handleInputChange("image", value)}
      />

      <Button
        title={loading ? "Saving..." : "Save Pet"}
        onPress={handleSave}
        color={Colors.PRIMARY}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 30,
    backgroundColor: Colors.WHITE,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "outfit", 
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.PRIMARY,
    fontFamily: "outfit",
  },
  input: {
    borderWidth: 1,
    height: 40,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: Colors.LIGHT_PRIMARY,
    fontFamily: "outfit",
    
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: Colors.LIGHT_PRIMARY,
  },
  picker: {
    color: Colors.PRIMARY,
    backgroundColor: Colors.LIGHT_PRIMARY,
    fontFamily: 'outfit',
  },
});
