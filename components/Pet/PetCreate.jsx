import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage
import { db } from "../../configs/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { Picker } from '@react-native-picker/picker';
import Colors from "../../constants/Colors";

export default function PetCreate() {
  const { user } = useUser();
  const [categoryList, setCategoryList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    about: "",
    image: "",
    category: "",
    weight: ""
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("image", result.assets[0].uri);
    }
  };


  const uploadImage = async (imageUri) => {
    setUploading(true);
    const storage = getStorage();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `petImages/${Date.now()}.jpg `);
    try {
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL; // Return the image download URL
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const { name, breed, age, about, image, category, weight } = form;
    if (!name || !breed || !age || !category || !image) {
      Alert.alert("Error", "All fields except 'about' are required");
      return;
    }

    setLoading(true);

    // Upload the image to Firebase Storage
    let imageUrl;
    if (image) {
      imageUrl = await uploadImage(image); // Upload image and get URL
    }

    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const newPet = {
      id: Date.now() ,
      name,
      breed,
      age,
      about,
      weight,
      category,
      image: imageUrl,
      userimage: user.imageUrl,
      username: user.fullName,
      email: userEmail,
      timestamp: new Date(),
    };


    try {
      await addDoc(collection(db, "pets"), newPet);
      Alert.alert("Success", "Pet saved successfully!");

      setForm({
        name: "",
        breed: "",
        age: "",
        about: "",
        image: "",
        category: '',
        weight: ''
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
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>About Pet (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter details about the pet"
        value={form.about}
        onChangeText={(value) => handleInputChange("about", value)}
      />


      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Text style={styles.label}>{form.image ? "Change Image" : "Pick Image"}</Text>
      </TouchableOpacity>
      {form.image ? <Image source={{ uri: form.image }} style={styles.imagePreview} /> : null}

      <Button
        title={loading ? "Saving..." : "Save Pet"}
        onPress={handleSave}
        color={Colors.PRIMARY}
        disabled={loading || uploading}
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
  },
  picker: {
    color: Colors.PRIMARY,
    backgroundColor: Colors.LIGHT_PRIMARY,
    fontFamily: 'outfit',
  },
  imagePicker: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
    alignSelf: "center",
  },
});
