import { View, Text } from 'react-native'
import React from 'react'
import FavouriteList from '../../components/Favourite/FavouriteList'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Favourite() {
  return (
    <SafeAreaView>
    <View>
    <FavouriteList/>
    </View>
    </SafeAreaView>
  )
}