import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { readDataByKey, Keys } from '../helpers/storage';
import { get, add, update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/core';

export default function ActiveJobScreen() {
  const [activeJob, setActiveJob] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchActiveJob = async () => {
      try {
        // AsyncStorage'den userid'yi al
        const userId = await readDataByKey(Keys.userid);

        // UserId'yi kullanarak API'den işleri getir
        const response = await get(`https://ig.colaksoft.online/api/v1/JobApplication/ListJobsAcceptedByUser?is_user_accepted=true&userid=${userId}`, {}, {}, true);

        console.log("API Response:", response); // API yanıtını logla

        // API'den gelen verileri kontrol et ve işle
        if (response.isSuccess && response.data.length > 0) {
          // Örneğin, ilk kabul edilmiş işi alalım
          const activeJobData = response.data[0];
          setActiveJob(activeJobData);
        } else {
          console.log("Kullanıcının aktif bir işi bulunamadı.");
        }
      } catch (error) {
        console.error("Aktif iş getirilirken bir hata oluştu:", error);
      }
    };

    fetchActiveJob();
  }, []);







  return (
    <LinearGradient
      colors={['#118dbf', '#3b5998', '#7d3cf2']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '90%', maxWidth: 400 }}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ padding: 16, borderRadius: 8, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {activeJob ? (
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{ padding: 12, borderRadius: 8 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 }}>Şirket: {activeJob.company_name}</Text>
                <Text style={{ fontSize: 16, color: 'white', marginBottom: 8 }}>Adres: {activeJob.adress}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>Pozisyon: {activeJob.title}</Text>
                <Text style={{ fontSize: 16, color: 'white', marginBottom: 8 }}>Başlangıç: {activeJob.start_at}</Text>
                <Text style={{ fontSize: 16, color: 'white', marginBottom: 8 }}>Bitiş: {activeJob.end_at}</Text>

                <View className=" mb-3 mt-5">
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Otp', { activeJobData: activeJob })}
                    className="py-3 bg-indigo-600 mx-7 rounded-xl">
                    <Text className="text-xl font-bold text-center text-gray-100">
                      Onaylama & Değerlendirme
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            ) : (
              <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '600', color: 'white' }}>Aktif iş bulunamadı.</Text>
            )}
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};
