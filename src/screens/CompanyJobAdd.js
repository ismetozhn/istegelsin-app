import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { add } from '../api/apiHelper'
import { Picker } from '@react-native-picker/picker'
import { readDataByKey } from '../helpers/storage'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CompanyJobAdd() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startMode, setStartMode] = useState('date');
  const [endMode, setEndMode] = useState('date');
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  let newDate = new Date()
  const [formData, setFormData] = useState({
    job_postingid: 2,
    companyid: 0,
    employment_type: '',
    education_level: '',
    experience_level: '',
    experience_years: '',
    work_model: '',
    work_per_hour: '',
    total_salary: '',
    title: '',
    description: '',
    logo_path: '1',
    adress: '',
    is_active: true,
    start_at: '',
    end_at: ''
  });

  const navigation = useNavigation();

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStart(false);
    setStartDate(currentDate);

    const formattedDate = currentDate.toISOString().split('T')[0];
    setFormData({ ...formData, start_at: formattedDate });
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(false);
    setEndDate(currentDate);

    const formattedDate = currentDate.toISOString().split('T')[0];
    setFormData({ ...formData, end_at: formattedDate });
  };

  const showStartMode = (currentMode) => {
    setShowStart(true);
    setStartMode(currentMode);
  };

  const showEndMode = (currentMode) => {
    setShowEnd(true);
    setEndMode(currentMode);
  };

  const showStartDatepicker = () => {
    showStartMode('date');
  };

  const showEndDatepicker = () => {
    showEndMode('date');
  };
  useEffect(() => {
    // Component yüklendiğinde storage'dan companyid al
    async function fetchCompanyId() {
      try {
        const storedCompanyId = await readDataByKey('@companyid'); // AsyncStorage'den companyid'yi oku
        if (storedCompanyId) {
          setFormData(prevState => ({ ...prevState, companyid: storedCompanyId })); // Değer varsa state'e set et
        }
      } catch (error) {
        console.error('Error fetching company id:', error);
      }
    }
    fetchCompanyId();
  }, []);

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
        'Company': 'true'

      };
      const response = await add('JobPosting', formData, headers, true);
      console.log('API yanıtı:', response);
      navigation.navigate('CompanyJob');
      console.log('API yanıtı:', response);


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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} className="flex-1 ">
        <SafeAreaView className="flex">
          <View className="flex-row justify-start mb-2">
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
              <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
            </TouchableOpacity>

          </View>

        </SafeAreaView>
        <View className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="from space-y-2">
            <Text className="text-gray-1000 ml-4">İlan Başlığı</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('title', value)}
              value={formData.title}
              placeholder='İlan Başlığını Girin'
            />
            <Text className="text-gray-1000 ml-4">Açıklama</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('description', value)}
              value={formData.description}
              placeholder='İlan Açıklaması Girin'
            />
            <Text className="text-gray-1000 ml-4">İlan Adresi</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('adress', value)}
              value={formData.adress}
              placeholder='İlan Adresini Girin'
            />

            <Text className="text-gray-1000 ml-4">Maaş</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('total_salary', value)}
              value={formData.total_salary}
              placeholder='Belirlediğiniz Maaşı Girin'
            />

            <Text className="text-gray-1000 ml-4">Çalışma Saati</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('work_per_hour', value)}
              value={formData.work_per_hour}
              placeholder='Çalışma Saatini Belirleyin'
            />

            <Text className="text-gray-1000 ml-4">Deneyim Yılı</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2x1"
              onChangeText={(value) => handleChange('experience_years', value)}
              value={formData.experience_years}
              placeholder='Deneyim Yılı Girin'
            />

            <Text className="text-gray-1000 ml-4">Çalışma Süresi</Text>
            <Picker
              selectedValue={formData.employment_type}
              onValueChange={(itemValue, itemIndex) => {
                console.log('Seçilen değer:', itemValue);
                setFormData({ ...formData, employment_type: itemValue });
              }}
              style={{backgroundColor: '#f0f0f0', borderRadius: 8 }}
            >
              <Picker.Item label="Seçiniz" value="" />
              <Picker.Item label="Tam Zamanlı" value={1} />
              <Picker.Item label="Yarı Zamanlı" value={2} />
              <Picker.Item label="Sözleşmeli" value={3} />
              <Picker.Item label="Dönemlik" value={4} />
              <Picker.Item label="Stajyer" value={5} />
            </Picker>
            <Text className="text-gray-1000 ml-4">Öğrenim Seviyesi</Text>
            <Picker
              selectedValue={formData.education_level}
              onValueChange={(itemValue, itemIndex) => setFormData({ ...formData, education_level: itemValue })}
              style={{backgroundColor: '#f0f0f0', borderRadius: 8 }}
            >
              <Picker.Item label="Seçiniz" value="" />
              <Picker.Item label="Lise" value="1" />
              <Picker.Item label="Ön Lisans" value="2" />
              <Picker.Item label="Lisans" value="3" />
              <Picker.Item label="Yüksek Lisans" value="4" />
              <Picker.Item label="Doktora" value="5" />
              <Picker.Item label="Post-Doktora" value="6" />
              <Picker.Item label="Profesyonel Derece" value="7" />
            </Picker>
            <Text className="text-gray-1000 ml-4">Deneyim</Text>
            <Picker
              selectedValue={formData.experience_level}
              onValueChange={(itemValue, itemIndex) => setFormData({ ...formData, experience_level: itemValue })}
              style={{backgroundColor: '#f0f0f0', borderRadius: 8 }}
            >
              <Picker.Item label="Seçiniz" value="" />
              <Picker.Item label="Giriş" value="1" />
              <Picker.Item label="Orta" value="2" />
              <Picker.Item label="Üst Düzey" value="3" />
              <Picker.Item label="Uzman" value="4" />
            </Picker>
            <Text className="text-gray-1000 ml-4">Çalışma Şekli</Text>
            <Picker
              selectedValue={formData.work_model}
              onValueChange={(itemValue, itemIndex) => setFormData({ ...formData, work_model: itemValue })}
              style={{backgroundColor: '#f0f0f0', borderRadius: 8 }}
            >
              <Picker.Item label="Seçiniz" value="" />
              <Picker.Item label="Uzaktan" value="1" />
              <Picker.Item label="Hibrit" value="2" />
              <Picker.Item label="Ofis" value="3" />

            </Picker>
              
            <SafeAreaView>
              <Text className="text-gray-1000 ml-4">Başlangıç Tarihi</Text>
              <TouchableOpacity onPress={showStartDatepicker} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
                <Text>Tarih Seç</Text>
              </TouchableOpacity>
              {showStart && (
                <DateTimePicker
                testID="dateTimePickerStart"
                value={startDate}
                mode={startMode}
                is24Hour={true}
                onChange={onChangeStart}
              />
              )}
            </SafeAreaView>

            <SafeAreaView>
              <Text className="text-gray-1000 ml-4">Bitiş Tarihi</Text>
              <TouchableOpacity onPress={showEndDatepicker} style={{ padding: 10, backgroundColor: 'lightgray', borderRadius: 5 }}>
                <Text>Tarih Seç</Text>
              </TouchableOpacity>
              {showEnd && (
                <DateTimePicker
                testID="dateTimePickerEnd"
                value={endDate}
                mode={endMode}
                is24Hour={true}
                onChange={onChangeEnd}
              />
              )}
            </SafeAreaView>


            <TouchableOpacity onPress={handlePostButtonClick} className="py-3 mb-10 bg-indigo-800 rounded-xl">
              <Text className="font-xl font-bold text-center text-gray-100">İlan Ekle</Text>
            </TouchableOpacity>


          </View>


        </View>
      </ScrollView>
    </LinearGradient>
  )
}

