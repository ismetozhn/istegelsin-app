import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { saveData } from '../helpers/storage';







export default function SignUpScreen() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');

  const handleSaveUserId = async (id) => {
    await saveData('user_id', id);
  };

  
  
  return (
    <View className="flex-1 bg-indigo-400">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
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
          <Text className="text-gray-400 ml-4">Ad-Soyad</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='berkan'
            placeholder='Adınızı ve Soyadınızı Girin'
          />
          <Text className="text-gray-400 ml-4">Kullanıcı Adı</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='berkan123456'
            placeholder='Kullanıcı Adı Gir'
          />
          <Text className="text-gray-400 ml-4">Email Adresi</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='berkan@gmail.com'
            placeholder='Mail Gir'
          />
          <Text className="text-gray-400 ml-4">Şifre</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            secureTextEntry
            value='1234'
            placeholder='Şifre Gir'
          />
         
         <TouchableOpacity onPress={() => handleSaveUserId('123456')} className="py-3 bg-indigo-400 rounded-xl">
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
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Zaten bir hesabın var mı?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="font-semibold text-yellow-500"> Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

