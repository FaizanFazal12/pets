import { View, Text  ,ScrollView} from 'react-native'
import React from 'react'
import PetInfo from '../../components/Pet/PetInfo'
import { useLocalSearchParams } from 'expo-router'

export default function PetDetails() {

  const pet = useLocalSearchParams();


  return (

    <ScrollView>

    <View >
      {/* Pet Info Section */}

      <PetInfo Pet={pet}/>

  
    </View>
    </ScrollView>
  )
}