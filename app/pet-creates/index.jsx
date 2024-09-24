import { View, Text, StyleSheet ,ScrollView } from 'react-native'
import React from 'react'
import PetCreate from '../../components/Pet/PetCreate'

export default function Index() {
  return (
    <ScrollView>

    <View>
      <PetCreate/>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

    container:{
     display:'flex',
     justifyContent:'center'
    }

})