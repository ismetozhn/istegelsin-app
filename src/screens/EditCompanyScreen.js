import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { get, add, update } from '../api/apiHelper';
import { readDataByKey, Keys, clearAllData } from '../helpers/storage';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function EditCompanyScreen() {
  const [companyData, setCompanyData] = useState({
    companyid: '',
    company_name: '',
    email: '',
    password: '',
    fax: '',
    phone: '',
    adress: '',
    logo_path: '',
    is_active: '',
    created_at: '',
    logo_file: '',
  });


  useEffect(() => {
    const fetchData = async () => {
      try {

        const headers = {

          'Company': 'true',
        };
        const response = await get('Company', headers, true);
        const companyId = await readDataByKey(Keys.companyid);
        console.log('yanıtss', companyId)
        console.log('API yanıtı:', response);


        if (response && response.data.companyid) {
          setCompanyData({
            companyid: response.data.companyid || '',
            company_name: response.data.company_name || '',
            email: response.data.email || '',
            password: response.data.password || '',
            fax: response.data.fax || '',
            phone: response.data.phone || '',
            adress: response.data.adress || '',
            logo_path: response.data.logo_path || '',
            is_active: response.data.is_active || '',
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

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCompanyData({ ...companyData, logo_file: result.uri });
    }
  };



  const handleUpdate = async () => {
    try {
      const endpoint = 'Company';

      const headers = {
        'Content-Type': 'multipart/form-data',
        'company': 'true',
      };

      const formData = new FormData();

      for (const key in companyData) {
        formData.append(key, companyData[key]);
      }


      if (companyData.logo_file) {
        const uriParts = companyData.logo_file.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('logo_file', {
          uri: companyData.logo_file,
          name: `logo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await update(endpoint, formData, headers, true);
      if (response.success) {
        alert(response.message || 'Güncelleme işlemi başarılı');
        console.log('Güncelleme işlemi başarılı:', response);
      } else {
        alert(response.message || 'Güncelleme işlemi başarısız');
        console.error('Güncelleme işlemi başarısız:', response.error);
      }
    } catch (error) {
      alert('Güncelleme işlemi sırasında bir hata oluştu');
      console.error('Güncelleme işlemi hatası:', error);
    }
  };



  const navigation = useNavigation();
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

        </SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 80 }} className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >

          <Text className="text-lg text-center font-bold underline mb-4 text-indigo-800">Şirket Bilgilerini Düzenle</Text>
          <View className="from space-y-2">

            <Text className="text-gray-1000 ml-4">Şirket İsim</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={companyData.company_name}
              onChangeText={(text) => setCompanyData({ ...companyData, company_name: text })}
              placeholder="Şirket İsmi"
            />
            <Text className="text-gray-1000 ml-4">Şirket Adres</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={companyData.adress}
              onChangeText={(text) => setCompanyData({ ...companyData, adress: text })}
              placeholder="Adres"
            />
            <Text className="text-gray-1000 ml-4">Email Adresi</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={companyData.email}
              onChangeText={(text) => setCompanyData({ ...companyData, email: text })}
              placeholder="Email"
            />

            <Text className="text-gray-1000 ml-4">Şirket Telefonu</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={companyData.phone}
              onChangeText={(text) => setCompanyData({ ...companyData, phone: text })}
              placeholder="Telefon"
            />

            <Text className="text-gray-1000 ml-4">Yeni Şifre</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              secureTextEntry
              value={companyData.password}
              onChangeText={(text) => setCompanyData({ ...companyData, password: text })}
              placeholder="Şifre"
            />

            <Text className="text-gray-1000 ml-4" >Şirket Resim</Text>
            <TouchableOpacity onPress={handleChooseImage} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
              <Text>Resim Seç</Text>
            </TouchableOpacity>
            {companyData.logo_file && <Image source={{ uri: companyData.logo_file }} style={{ width: 100, height: 100, marginBottom: 16 }} />}

            <TouchableOpacity onPress={handleUpdate} className="py-3 bg-indigo-800 rounded-xl">
              <Text className="font-xl font-bold text-center text-gray-100">Güncelle</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </LinearGradient>
  )
}

