import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';



export default function MenuScreen() {

    const navigation = useNavigation();

    


    return (
        <View className="flex-1  bg-blue-600" >
            <View className="flex-row justify-between mt-20 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(56 189 248)" />
                </TouchableOpacity>
            </View>


            <View className=" items-center mb-5 ">
                <Image source={require("../../assets/images/istegelsin.png")} style={{ width: hp(15), height: hp(15), borderRadius: 180 }} />
            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddJob')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        İlan Ekle
                    </Text>
                </TouchableOpacity>

            </View>
         
        </View>



    )
}

const styles = StyleSheet.create({})