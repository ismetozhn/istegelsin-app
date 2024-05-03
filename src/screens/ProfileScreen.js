import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';

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
        <LinearGradient
            colors={['#330867', '#075985']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >

            <View className="flex-1   space-y-5 " >
                <View className="flex-row justify-between mt-20 ">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
                    </TouchableOpacity>
                </View>
                <View className="mt-20 items-center">
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}
                    >
                        İş Dünyasına Hoşgeldin!

                    </Text>
                </View>

                <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring2padding }} >
                    <Animated.View className="bg-white/20 rounded-full " style={{ padding: ring1padding, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("../../assets/images/man.jpg")} style={{ width: hp(25), height: hp(25), borderRadius: 180 }} />
                    </Animated.View>
                </Animated.View>
                <View className="flex flex-row mb-3">

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="flex-1 py-3 bg-indigo-600 ml-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            Aday Kayıt Ol
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp2')}
                        className="flex-1 py-3 bg-blue-700 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            İşveren Kayıt Ol
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="">
                    <View className="flex-row justify-center">
                        <Text className="text-white text-lg font-semibold">Zaten bir hesabın var mı?</Text>

                    </View>
                </View>

                <View className="flex flex-row mb-3">

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        className="flex-1 py-3 bg-indigo-600 ml-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            Aday Giriş
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login2')}
                        className="flex-1 py-3 bg-blue-700 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            İşveren Giriş
                        </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </LinearGradient>


    )
}

const styles = StyleSheet.create({})