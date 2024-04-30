import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { clearAllData } from '../helpers/storage';


export default function MenuScreen() {

    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            'Çıkış Yap',
            'Emin misiniz?',
            [
                {
                    text: 'Vazgeç',
                    style: 'cancel',
                },
                {
                    text: 'Evet',
                    onPress: () => {
                        clearAllData(); // Verileri temizle
                        navigation.navigate('Profile'); // Giriş yap sayfasına yönlendir
                    },
                },
            ],
            { cancelable: false }
        );
    };



    return (
        <View className="flex-1  bg-blue-800" >
            <View className="flex-row justify-between mt-20 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(56 189 248)" />
                </TouchableOpacity>
            </View>


            <View className=" items-center mb-5 ">
                <Image source={require("../../assets/images/istegelsin.png")} style={{ width: hp(15), height: hp(15), borderRadius: 180 }} />
            </View>

     

            <View className="flex flex-row mb-3">
                <TouchableOpacity
                   
                    onPress={() => navigation.navigate('CompanyJob')}
                    className="flex-1 py-3 bg-teal-500 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Şirket İlan
                    </Text>
                </TouchableOpacity>
            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('KullanıcıBasvuru')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Kullanıcı Aktif İş & Başvurular
                    </Text>
                </TouchableOpacity>

            </View>


            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Profili Düzenle
                    </Text>
                </TouchableOpacity>

            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Sil')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Ödeme Sayfası
                    </Text>
                </TouchableOpacity>

            </View>


            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('İletişim')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        İletişim
                    </Text>
                </TouchableOpacity>

            </View>


            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Ayarlar
                    </Text>
                </TouchableOpacity>

            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('Deneme')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Görüş Bildir
                    </Text>
                </TouchableOpacity>

            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={handleLogout}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        Çıkış Yap
                    </Text>
                </TouchableOpacity>

            </View>




        </View>



    )
}

const styles = StyleSheet.create({})