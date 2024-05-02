import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';


export default function EditProfileScreen() {
    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);
    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;

        setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)), 100);
        setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5.5)), 300);



    }, [])



    return (
        <LinearGradient
        colors={['#330867', '#075985']} 
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

        <View className="flex-1   space-y-7  -" >
            <View className="flex-row justify-between mt-20 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(56 189 248)" />
                </TouchableOpacity>
            </View>
        

            <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring2padding }} >
                <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring1padding, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require("../../assets/images/istegelsin.png")} style={{ width: hp(25), height: hp(25), borderRadius: 180 }} />
                </Animated.View>
            </Animated.View>


            <View className="space-y-4">
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditUser')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Kullanıcı Profil Düzenle
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditCompany')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                       Şirket Profili Düzenle
                    </Text>
                </TouchableOpacity>
               
            </View>


        </View>
        </LinearGradient>



    )
}

const styles = StyleSheet.create({})