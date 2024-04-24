import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { get, add, update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { readDataByKey, Keys, clearAllData } from '../helpers/storage';



export default function EditUserScreen() {

  const [userData, setUserData] = useState({
    userid: '',
    name: '',
    surname: '',
    id_no: '',
    email: '',
    password: '',
    gsm: '',
    gender_type: '',
    bank_account_code: '',
    working_with_bankid: '',
    iban: '',
    logo_path: '',
    is_active: '',
    birthday: '',
    created_at: '',
    logo_file: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          //'Company': 'false',
        };
        const response = await get('User', headers, true);
        const userId = await readDataByKey(Keys.userid);
        console.log('yanıtss', userId)
        console.log('API yanıtı:', response);


        if (response && response.data.userid) {
          setUserData({
            userid: response.data.userid || '',
            name: response.data.name || '',
            surname: response.data.surname || '',
            id_no: response.data.id_no || '',
            email: response.data.email || '',
            password: response.data.password || '',
            gsm: response.data.gsm || '',
            gender_type: response.data.gender_type || '',
            bank_account_code: response.data.bank_account_code || '',
            working_with_bankid: response.data.working_with_bankid || '',
            iban: response.data.iban || '',
            logo_path: response.data.logo_path || '',
            is_active: response.data.is_active || '',
            birthday: response.data.birthday || '',
            created_at: response.data.created_at || '',
            logo_file: response.data.logo_file || '',
          });
        } else {
          console.error('API yanıtı beklenen formatta değil veya companyid özelliği eksik.');
        }

      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);

   const handleUpdate = async () => {
     try {
       const endpoint = 'User'; // Güncellenecek kaydın endpoint'i

       const headers = {
         'Content-Type': 'multipart/form-data',

       };
  
       const response = await update(endpoint, userData, headers, true);
       console.log('Güncelleme işlemi başarılı:', response);
     } catch (error) {
       console.error('Güncelleme işlemi hatası:', error);
    }
 };



  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-indigo-400">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-sky-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>

        </View>

      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="from space-y-2">
          <Text className="text-gray-400 ml-4">Ad</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            placeholder="Şirket İsmi"
          />
          <Text className="text-gray-400 ml-4">Soyad</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value={userData.surname}
            onChangeText={(text) => setUserData({ ...userData, surname: text })}
            placeholder="Soyadınız"
          />
          <Text className="text-gray-400 ml-4">Email Adresi</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            placeholder="Şirket İsmi"
          />
          <Text className="text-gray-400 ml-4">Telefon Numarası</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value={userData.gsm}
            onChangeText={(text) => setUserData({ ...userData, gsm: text })}
          />
          <Text className="text-gray-400 ml-4">Cinsiyet</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value={userData.gender_type}
            onChangeText={(text) => setUserData({ ...userData, gender_type: text })}
          />

          <Text className="text-gray-400 ml-4">Iban Numarası</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            value={userData.iban}
            onChangeText={(text) => setUserData({ ...userData, iban: text })}
          />


          <Text className="text-gray-400 ml-4">Yeni Şifre</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
            secureTextEntry
            value={userData.password}
            onChangeText={(text) => setUserData({ ...userData, password: text })}
          />



          <TouchableOpacity onPress={handleUpdate} className="py-3 bg-indigo-400 rounded-xl">
            <Text className="font-xl font-bold text-center text-gray-100">Güncelle</Text>
          </TouchableOpacity>


        </View>



      </View>
    </View>
  )
}

