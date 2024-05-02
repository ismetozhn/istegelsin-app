import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { saveData, readData, saveDataByKey, Keys } from '../helpers/storage';
import { get } from '../api/apiHelperDeneme'
import { LinearGradient } from 'expo-linear-gradient';





export default function LoginScreen() {
  const fetchData = async (email, password) => {
    console.log(email,password)
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
        
      };
      const response = await get(`User/Login?email=${email}&password=${password}`, headers);
      console.log('API yanıtı:', response);

      // API yanıtını kontrol et
      if (response) {
        // API yanıtından gelen verileri kaydet
        saveDataByKey(Keys.email, response.data.email);
        saveDataByKey(Keys.password, response.data.password);
        saveDataByKey(Keys.userid, response.data.userid);
        saveDataByKey(Keys.isLoggedIn, true);
        navigation.navigate('Home');
      } else {
        // Yanıt boşsa veya hatalıysa uygun bir işlem yap
        console.error('API yanıtı boş veya hatalı.');
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };


  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleReadUserId = async () => {
    const id = await readData('user_id');
    setUserId(id);
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
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-sky-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />

          </TouchableOpacity>

        </View>
        <View className="flex-row  justify-center mb-8">
          <Image source={require('../../assets/images/istegelsin.png')}
            style={{ width: 200, height: 200, borderRadius: 100, borderColor:'black', borderWidth: 3 }}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >



        <View className="from space-y-2">
          <Text className="text-gray-1000 ml-4">Email Adresi</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            onChangeText={setEmail}
            value={email}
            placeholder='Mail Gir'
          />
          <Text className="text-gray-1000 ml-4">Şifre</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            placeholder='Şifre Gir'
          />


          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700">Şifremi Unuttum?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => fetchData(email, password)} className="py-3 bg-indigo-400 rounded-xl h-12">
            <Text className="font-xl font-bold text-base text-center align-middle text-gray-1000">Giriş Yap</Text>
          </TouchableOpacity>
          


        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">Or</Text>
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
            Hesabın yok mu?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500"> Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </LinearGradient>

  )
}

