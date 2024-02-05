import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function WelcomeScreen() {



  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-blue-600" >
      <StatusBar style='light' />


      <View className="bg-white/20 rounded-full p-10" >
        <View className="bg-white/20 rounded-full p-8">
          <Image source={require("../../assets/images/istegelsin.png")} style={{ width: hp(25), height: hp(25), borderRadius: 180 }} />
        </View>
      </View>


      <View className="flex items-center space-y-2">


      </View>


    </View>



  )
}

const styles = StyleSheet.create({})