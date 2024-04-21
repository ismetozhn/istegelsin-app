import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { add } from '../api/apiHelperDeneme'


export default function SignUpScreen() {

  let newDate = new Date()
  const [formData, setFormData] = useState({
    userid: 0,
    name: '',
    surname: '',
    id_no: '1',
    email: '',
    password: '',
    gsm: '',
    gender_type: 0,
    bank_account_code: '1',
    working_with_bankid: 0,
    iban: '1',
    logo_path: '1',
    is_active: true,
    birthday: '2024-04-20T15:56:22',
    created_at: newDate,
    logo_file: '',
  });

  const navigation = useNavigation();

  // TextInput değişikliklerini ele alacak genel bir handleChange fonksiyonu
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostButtonClick = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
        
      };
      const response = await add('User', formData, headers);
      console.log('API yanıtı:', response);
      // response nesnesi ve data özelliği null değilse devam edin
      //if (response.eventStatus === 1) {
      navigation.navigate('Home');
      //} else {
      console.log('API yanıtı:', response);
      //}

    } catch (e) {
      console.error('Veri gönderme hatası:', e);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1 bg-indigo-400">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-sky-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>

        </View>
        <View className="flex-row  justify-center ">
          <Image source={require('../../assets/images/bman.png')}
            style={{ width: 140, height: 150, borderRadius: 100 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="from space-y-2">
          <Text className="text-gray-1000 ml-4">Ad</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            onChangeText={(value) => handleChange('name', value)}
            value={formData.name}
            placeholder='Adınızı Girin'
          />
          <Text className="text-gray-1000 ml-4">Soyad</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            onChangeText={(value) => handleChange('surname', value)}
            value={formData.surname}
            placeholder='Soyadınızı Girin'
          />
          <Text className="text-gray-1000 ml-4">Email Adresi</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            onChangeText={(value) => handleChange('email', value)}
            value={formData.email}
            placeholder='Email Adresinizi Girin'
          />

          <Text className="text-gray-1000 ml-4">Telefon Numarası</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            onChangeText={(value) => handleChange('gsm', value)}
            value={formData.gsm}
            placeholder='Telefon Numaranızı Girin'
          />

          <Text className="text-gray-1000 ml-4">Şifre</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            secureTextEntry
            onChangeText={(value) => handleChange('password', value)}
            value={formData.password}
            placeholder='Şifrenizi Girin'
          />

          <TouchableOpacity onPress={handlePostButtonClick} className="py-3 bg-indigo-400 rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-900">Kayıt Ol</Text>
          </TouchableOpacity>


        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">Veya</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/images/google.jpg')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/images/apple.jpg')} className="w-10 h-10" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <Image source={require('../../assets/images/Facebook.png')} className="w-10 h-10" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center my-5">
          <Text className="text-gray-500 font-semibold">
            Zaten bir hesabın var mı?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="font-semibold text-yellow-500"> Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

