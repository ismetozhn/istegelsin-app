import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

export default function ProfileScreen() {
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

        <View className="flex-1   space-y-10  bg-blue-700" >
            <View className="flex-row justify-between mt-20 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(56 189 248)" />
                </TouchableOpacity>
            </View>
            <View className="mt-20 items-center ">
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}
                >
                    İş Dünyasına Hoşgeldin!

                </Text>
            </View>





            <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring2padding }} >
                <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring1padding }}>
                    <Image source={require("../../assets/images/man.jpg")} style={{ width: hp(25), height: hp(25), borderRadius: 180 }} />
                </Animated.View>
            </Animated.View>


            <View className="space-y-4">
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUp')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Kayıt Ol
                    </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold">Zaten bir hesabın var mı?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-semibold text-indigo-400"> Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>



    )
}

const styles = StyleSheet.create({})