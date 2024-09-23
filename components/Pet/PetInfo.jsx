import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Pressable,ScrollView } from 'react-native';
import React, { useState } from 'react';
import PetDetailCard from './PetDetailCard';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

export default function PetInfo({ Pet }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false)


  const handleFavorite = async () => {
    setLoading(true);
    try {

      setTimeout(() => {
        setIsFavorite(!isFavorite);
        setLoading(false); // Stop loading
      }, 1000); // Simulating a 1-second API call
    } catch (error) {
      console.error('Error favoriting pet:', error);
      setLoading(false); // Stop loading even on error
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView>

      <Image style={styles.image} source={{ uri: Pet?.image }} />

      <View style={styles.headerContainer}>
        <Text style={styles.petName}>{Pet?.name}</Text>

        <TouchableOpacity onPress={handleFavorite} disabled={loading}>
          <View style={styles.favoriteButton}>
            {loading ? (
              <ActivityIndicator size="small" color={Colors.SECONDARY} />
            ) : (
              // Favorite Icon with dynamic style
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'} // Filled heart if favorited, outlined heart if not
                size={28} // Icon size
                color={isFavorite ? Colors.PRIMARY : Colors.GRAY} // Change color based on favorite status
              />
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 10 }}>
        <PetDetailCard
          icon={require('../../assets/images/gender.png')}
          label="Name"
          value={Pet?.name}
        />
        <PetDetailCard
          icon={require('../../assets/images/weight.png')}
          label="Weight"
          value={Pet?.weight}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 10 }}>
        <PetDetailCard
          icon={require('../../assets/images/bone.png')}
          label="Category"
          value={Pet?.category}
        />
        <PetDetailCard
          icon={require('../../assets/images/calendar.png')}
          label="Age"
          value={Pet?.age}
        />
      </View>

{/* About */}
      <View style={{
        padding: 20,
        marginVertical:10


      }}>
        <Text style={{
          color:Colors.PRIMARY,
          fontSize:29,
          fontFamily:'outfit-bold',
          paddingVertical:5
        }}>About</Text>

        <Text style={{
          fontFamily: 'outfit',
          letterSpacing: 0.5,
          fontSize: 15,
          color: Colors.GRAY
        }}>
         { !show ? Pet?.about.slice(0,70) : Pet?.about}

        </Text>

<Pressable onPress={
  ()=>{
    setShow(!show)
  }
}>
        <Text style={{
        fontSize:17,
        fontFamily:'outfit',
        color:'red',
        width:100,
        borderRadius:9,
        marginVertical:4
        }}>
        { !show ? 'show more' : 'show less' }
        </Text>
</Pressable>
      </View>

      <View style={styles.authorContainer}>

        <Image
          source={{ uri: Pet?.users?.image || 'https://via.placeholder.com/50' }} // Demo image if no user image
          style={styles.authorImage}
        />
        <Text style={styles.authorName}>
          Posted by: {Pet?.users?.name || 'Unknown'}
        </Text>
      </View>
      </ScrollView>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
  },
  image: {
    height: 400,
    width: '100%',
    resizeMode: 'cover',
    borderColor: Colors.SECONDARY,
    borderWidth: 1, // Add borderWidth if needed
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 15,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: Colors.LIGHT_PRIMARY, // Optional background to make it stand out
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: Colors.WHITE, // Use WHITE for consistency
    borderRadius: 10,
    shadowColor: '#000',
    backgroundColor:Colors.LIGHT_PRIMARY,
    borderRadius:27,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // For Android shadow
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.GRAY, // Use GRAY for the border
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.GRAY, // Use GRAY for text color
  },
});



