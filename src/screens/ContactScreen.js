import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { EnvelopeIcon, MapIcon, ChevronLeftIcon } from 'react-native-heroicons/outline'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PhoneIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'

export default function ContactScreen() {
    const navigation = useNavigation();
    return (

        <LinearGradient
            colors={['#330867', '#075985']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >

            <View className="flex-1 " >
                <View className="flex-row mt-16 justify-start">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
                    </TouchableOpacity>

                </View>
                <View className=" flex items-center mt-14 space-y-8" >
                    <Text className="text-3xl font-bold underline text-white" >İletişim Adresleri</Text>
                    <Text className="text-2xl mt-5 text-gray-200" >Bize aşağıdaki kanallardan da ulaşabilirsiniz.</Text>
                </View>

                <View className="flex-row p-5 mr-8 items-center mt-10">
                    <MapIcon size={hp(6.5)} strokeWidth={2.5} color="white"></MapIcon>
                    <Text className="text-lg  text-gray-200">
                        Berkanpaşa Mah. İsmet İnönü SK. İşte Gelsin İş Merkezi D Blok NO: 22 B1 Nişantaşı/İstanbul
                    </Text>
                </View>

                <View className="flex-row p-5 mr-8 items-center ">
                    <PhoneIcon size={hp(6.5)} strokeWidth={2.0} color="white"></PhoneIcon>
                    <Text className="text-lg  text-gray-200">
                        +90 0850 259 26 96
                    </Text>
                </View>

                <View className="flex-row p-5 mr-8 items-center ">
                    <EnvelopeIcon size={hp(6.5)} strokeWidth={2.5} color="white"></EnvelopeIcon>
                    <Text className="text-lg  text-gray-200">
                        info@istegelsin.com

                    </Text>
                </View>

                <View>

                </View>

            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({})