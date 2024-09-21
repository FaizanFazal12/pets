import { View, Text, Image, SafeAreaViewComponent, Pressable } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

import Colors from '../../constants/Colors'






export const useWarmUpBrowser = () => {
  useEffect(() => {
  
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {


  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      })

      if (createdSessionId) {
 
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (


    <View style={{
      color: Colors.WHITE,
      height: '100%',
    }}>
      <Image source={require('../../assets/images/login.png')} style={{ width: '100%', height: 500, alignSelf: 'center', marginBottom: 20 }} />

      <View style={{
    
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,

      }}>

        <Text style={{ fontSize: 30, textAlign: 'center', fontFamily: 'outfit-bold' }}>Welcome to Pets!</Text>
        <Text style={{ padding: 20, textAlign: 'center', fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>
          um id fugiat alias maxime tempora distinctio labore, cumque ut beatae eius inventore?
        </Text>

        <Pressable onPress={onPress} style={{
          width: '80%',
          margin:30
        }}>

          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 10, fontFamily: 'outfit-medium', backgroundColor: Colors.PRIMARY, padding: 16, borderRadius: 10, width: '100%', color: Colors.WHITE }}>Gets Started</Text>
        </Pressable>
      </View>


    </View>
  )
}