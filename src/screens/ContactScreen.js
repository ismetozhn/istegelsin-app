import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EnvelopeIcon, MapIcon } from 'react-native-heroicons/outline'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PhoneIcon } from 'react-native-heroicons/outline';

export default function ContactScreen() {
    return (
        <View className="flex-1 bg-blue-600" >
            <View className=" flex items-center mt-20 space-y-8" >
                <Text className="text-3xl font-bold text-white" >İletişim Adresleri</Text>
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
    )
}

const styles = StyleSheet.create({})