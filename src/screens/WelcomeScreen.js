import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;

    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
    setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);
    setTimeout(() => navigation.navigate('Home'), 2500)


  }, [])


  return (
    <LinearGradient
      colors={['#330867', '#075985']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >

      <View className="flex-1 justify-center items-center space-y-10 " >
        <StatusBar style='light' />


        <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring2padding }} >
          <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring1padding }}>
            <Image source={require("../../assets/images/istegelsin.png")} style={{ width: hp(25), height: hp(25), borderRadius: 180 }} />
          </Animated.View>
        </Animated.View>


        <View className="flex items-center space-y-2">


        </View>


      </View>
    </LinearGradient>


  )
}

const styles = StyleSheet.create({})