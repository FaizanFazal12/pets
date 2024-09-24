import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PetCreate from '../../components/Pet/PetCreate'

export default function Index() {
  return (
    <View style={styles?.container}>
      <PetCreate/>
    </View>
  )
}

const styles = StyleSheet.create({

    container:{
     height:'100%',
     display:'flex',
     justifyContent:'center'
    }

})