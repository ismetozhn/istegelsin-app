import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { add } from '../api/apiHelper'
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CompanySignUp() {

  let newDate = new Date()
  const [formData, setFormData] = useState({
    companyid: 0,
    company_name: '',
    email: '',
    password: '',
    fax: '1',
    phone: '',
    adress: '1',
    logo_path: '1',
    is_active: true,
    created_at: newDate,
    logo_file: '',
  });

  const navigation = useNavigation();


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
        'company': 'true',
      };
      const response = await add('Company', formData, headers);
      console.log('API yanıtı:', response);

      if (response.eventStatus === 1) {
        navigation.navigate('Home');
      } else {
        console.log('API yanıtı:', response);
      }

    } catch (e) {
      console.error('Veri gönderme hatası:', e);
    }
  };

  return (
    <LinearGradient
      colors={['#330867', '#075985']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="flex-1 ">
        <SafeAreaView className="flex">
          <View className="flex-row justify-start">
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
              <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
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
            <Text className="text-gray-1000 ml-4">Şirket Adı</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('company_name', value)}
              value={formData.company_name}
              placeholder='Şirket Adınızı Girin'
            />
            <Text className="text-gray-1000 ml-4">Email Adresi</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('email', value)}
              value={formData.email}
              placeholder='Email Adresinizi Girin'
            />
            <Text className="text-gray-1000 ml-4">Şifre</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('password', value)}
              value={formData.password}
              secureTextEntry
              placeholder='Şifrenizi Girin'
            />
            <Text className="text-gray-1000 ml-4">Telefon Numarası</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('phone', value)}
              value={formData.phone}
              placeholder='Telefon Numaranızı Girin'
            />

            <TouchableOpacity onPress={handlePostButtonClick} className="py-3 bg-indigo-800 rounded-xl">
              <Text className="font-xl font-bold text-center text-gray-100">Kayıt Ol</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-7">
            <Text className="text-gray-500 font-semibold">
              Zaten bir hesabın var mı?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-bold text-indigo-800"> Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>

  )
}

