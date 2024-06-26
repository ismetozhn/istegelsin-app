import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Button, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { get, add, update } from '../api/apiHelper';
import { readDataByKey, Keys, clearAllData } from '../helpers/storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';






export default function EditUserScreen() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Eğer selectedDate undefined ise, mevcut tarih kullanılacak
    setShow(false);
    setDate(currentDate);

    // Seçilen tarihi uygun formata dönüştürelim ve state'e atayalım
    const formattedDate = currentDate.toISOString(); // ISO 8601 formatında tarih dönüşümü
    const formattedBirthday = formattedDate.split('T')[0]; // Tarihi ve saati ayıralım ve sadece tarihi kullanalım
    setUserData({ ...userData, birthday: formattedBirthday });
  };


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

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


  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserData({ ...userData, logo_file: result.uri });
    }
  };

  const handleUpdate = async () => {
    try {
      const endpoint = 'User'; // Güncellenecek kaydın endpoint'i

      const headers = {
        'Content-Type': 'multipart/form-data',

      };

      const formData = new FormData();
      // companyData'nın tüm alanlarını formData'ya ekleyelim
      for (const key in userData) {
        formData.append(key, userData[key]);
      }

      // Eğer resim seçilmişse, formData'ya ekleyelim
      if (userData.logo_file) {
        const uriParts = userData.logo_file.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('logo_file', {
          uri: userData.logo_file,
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 80 }} className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <Text className="text-lg text-center font-bold mb-4 underline text-indigo-800">Kullanıcı Bilgilerini Düzenle</Text>
          <View className="from space-y-2">
            <Text className="text-gray-1000 ml-4">Ad</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
              placeholder="Adınız"
            />
            <Text className="text-gray-1000 ml-4">Soyad</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={userData.surname}
              onChangeText={(text) => setUserData({ ...userData, surname: text })}
              placeholder="Soyadınız"
            />
            <Text className="text-gray-1000 ml-4">TC Kimlik No</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={userData.id_no}
              onChangeText={(text) => setUserData({ ...userData, id_no: text })}
              placeholder="Kimlik Numaranız"
            />
            <Text className="text-gray-1000 ml-4">Email Adresi</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              placeholder="Email Adresiniz"
            />
            <Text className="text-gray-1000 ml-4">Telefon Numarası</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={userData.gsm}
              onChangeText={(text) => setUserData({ ...userData, gsm: text })}
            />
            <Text className="text-gray-1000 ml-4">Cinsiyet</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
              <TouchableOpacity
                onPress={() => setUserData({ ...userData, gender_type: '2' })}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: userData.gender_type === '1' ? 'blue' : 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
                  {userData.gender_type === '2' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'blue' }} />}
                </View>
                <Text style={{ marginLeft: 8 }}>Erkek</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserData({ ...userData, gender_type: '3' })}
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}
              >
                <View style={{ height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: userData.gender_type === '2' ? 'blue' : 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
                  {userData.gender_type === '3' && <View style={{ height: 12, width: 12, borderRadius: 6, backgroundColor: 'blue' }} />}
                </View>
                <Text style={{ marginLeft: 8 }}>Kadın</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-gray-1000 ml-4">Iban Numarası</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              value={userData.iban}
              onChangeText={(text) => setUserData({ ...userData, iban: text })}
            />
            <Text className="text-gray-1000 ml-4">Banka Bilgileri</Text>
            <Picker

              selectedValue={userData.working_with_bankid}
              onValueChange={(itemValue, itemIndex) => setUserData({ ...userData, working_with_bankid: itemValue })}
              style={{ flex: 1, backgroundColor: '#f0f0f0' }}
            >
              <Picker.Item label="Seçiniz" value="" />
              <Picker.Item label="Fibabanka" value="1" />
              <Picker.Item label="Ziraat Bankası" value="2" />
              <Picker.Item label="Garanti Bankası" value="3" />
              <Picker.Item label="Finansbank" value="4" />
              <Picker.Item label="Enpara" value="5" />
            </Picker>

            <Text className="text-gray-1000 ml-4">Yeni Şifre</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              secureTextEntry
              value={userData.password}
              onChangeText={(text) => setUserData({ ...userData, password: text })}
            />


            <SafeAreaView>
              <Text className="text-gray-1000 ml-4">Doğum Tarihi</Text>
              <TouchableOpacity onPress={showDatepicker} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
                <Text>Tarih Seç</Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </SafeAreaView>


            <Text className="text-gray-1000 ml-4" >Profil Resim</Text>
            <TouchableOpacity onPress={handleChooseImage} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
              <Text>Resim Seç</Text>
            </TouchableOpacity>
            {userData.logo_file && <Image source={{ uri: userData.logo_file }} style={{ width: 100, height: 100, marginBottom: 16 }} />}


            <TouchableOpacity onPress={handleUpdate} className="py-3 bg-indigo-800 rounded-xl">
              <Text className="font-xl font-bold text-center text-gray-100">Güncelle</Text>
            </TouchableOpacity>


          </View>




        </ScrollView>
      </View>

    </LinearGradient>
  )
}

