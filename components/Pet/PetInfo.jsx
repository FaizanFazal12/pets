import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import PetDetailCard from './PetDetailCard';
import Colors from '../../constants/Colors';

export default function PetInfo({ Pet }) {

  console.log('pet',Pet)
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: Pet?.image }} />

      <View style={{flexDirection:'row' ,gap:10 ,marginHorizontal:10}}>
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
        <View style={{flexDirection:'row',gap:10 ,marginHorizontal:10}}>
        <PetDetailCard
          icon={require('../../assets/images/weight.png')}
          label="Category"
          value={Pet?.category}
        />
        <PetDetailCard
          icon={require('../../assets/images/weight.png')}
          label="age"
          value={Pet?.age}
        />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE, // Example using WHITE
    
  },
  image: {
    height: 400,
    width: '100%',
    resizeMode: 'cover',
    borderColor: Colors.SECONDARY, // Example using SECONDARY for image border
  },
});
