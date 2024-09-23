import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
export default function PetDetailsCard({ icon, label, value }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.details}>
        
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    width:180,
    gap:10,
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.LIGHT_PRIMARY, // Example using LIGHT_PRIMARY
    borderRadius: 8,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  details: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 14,
    color: Colors.GRAY, // Example using GRAY
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PRIMARY, // Example using PRIMARY
  },
});
