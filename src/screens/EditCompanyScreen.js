import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'




export default function EditCompanyScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-indigo-400">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>

        </View>
        
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="from space-y-2">
          <Text className="text-gray-400 ml-4">Şirket İsim</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='berkan'
            placeholder='Adınızı ve Soyadınızı Girin'
          />
          <Text className="text-gray-400 ml-4">Şirket Adres</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='çor'
            placeholder='Kullanıcı Adı Gir'
          />
          <Text className="text-gray-400 ml-4">Email Adresi</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='ismet@gmail.com'
            placeholder='Kullanıcı Adı Gir'
          />
          
          <Text className="text-gray-400 ml-4">Şirket Telefonu</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value='05325554442878'
            placeholder='Mail Gir'
          />

          <Text className="text-gray-400 ml-4">Eski Şifre</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            secureTextEntry
            value='1234'
            placeholder='Şifre Gir'
          />
          <Text className="text-gray-400 ml-4">Yeni Şifre</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            secureTextEntry
            value='1234'
            placeholder='Şifre Gir'
          />
          
          
         
          <TouchableOpacity className="py-3 bg-indigo-400 rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-900">Kaydet</Text>
          </TouchableOpacity>


        </View>
        
       
    
      </View>
    </View>
  )
}

