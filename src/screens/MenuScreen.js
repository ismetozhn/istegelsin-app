import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { clearAllData, readDataByKey, Keys } from '../helpers/storage'; // clearAllData ve readDataByKey işlevleri ekleniyor
import { LinearGradient } from 'expo-linear-gradient';

export default function MenuScreen() {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [companyId, setCompanyId] = useState(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        // AsyncStorage'den isLoggedIn anahtarını kontrol et
        const isLoggedIn = await readDataByKey(Keys.isLoggedIn);
        setIsLoggedIn(isLoggedIn === 'true'); // String'i boolean'a dönüştür

        if (isLoggedIn) {
            // Kullanıcı girişi yapılmışsa userId ve companyId'yi kontrol et
            const userId = await readDataByKey(Keys.userid);
            const companyId = await readDataByKey(Keys.companyid);
            setUserId(userId);
            setCompanyId(companyId);
        }
    };

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
                    onPress: async () => {
                        await clearAllData(); 
                        navigation.navigate('Profile'); 
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <LinearGradient
            colors={['#330867', '#075985']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View className="flex-1">
                <View className="flex-row justify-between mt-16">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
                    </TouchableOpacity>
                </View>

                <View className="items-center mb-5">
                    <Image source={require("../../assets/images/istegelsin.png")} style={{ width: hp(15), height: hp(15), borderRadius: 180 }} />
                </View>

                {isLoggedIn && (
                    <View className="flex flex-row mb-3">
                        {!userId && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CompanyJob')}
                                className="flex-1 py-3 bg-indigo-600 mx-7 rounded-xl">
                                <Text
                                    className="text-xl font-bold text-center text-gray-100"
                                >
                                    Şirket İlan
                                </Text>
                            </TouchableOpacity>
                        )}

                        {!companyId && (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('KullanıcıBasvuru')}
                                className="flex-1 py-3 bg-indigo-600 mx-7 rounded-xl">
                                <Text
                                    className="text-xl font-bold text-center text-gray-100"
                                >
                                    Kullanıcı Aktif İş & Başvurular
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {/* Diğer butonlar buraya gelecek */}

                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            Profili Düzenle
                        </Text>
                    </TouchableOpacity>

                </View>

                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            Ödeme Sayfası
                        </Text>
                    </TouchableOpacity>

                </View>

                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('İletişim')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            İletişim
                        </Text>
                    </TouchableOpacity>

                </View>

                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl">
                        <Text
                            className="text-xl font-bold text-center text-gray-100"
                        >
                            Görüş Bildir
                        </Text>
                    </TouchableOpacity>

                </View>

                <View className=" mb-2">
                    <TouchableOpacity onPress={handleLogout} className="py-1  mx-7 rounded-xl">
                        <LinearGradient
                            colors={['#be123c', '#4c0519']}
                            style={{ padding: 15, borderRadius: 12 }}
                        >
                            <Text className="text-xl font-bold text-center text-gray-100">
                                Çıkış Yap
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({})
