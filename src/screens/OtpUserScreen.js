import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { get, add } from '../api/apiHelperDeneme'; // API yardımcı fonksiyonunu doğru dosyaya göre güncelleyin
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OtpUserScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const activeJobData = route.params?.activeJobData; // ActiveJobScreen'den gelen verileri al
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    fetchOtp(activeJobData, setOtp);
  }, [activeJobData]); 

  const fetchOtp = async (activeJobData, setOtp) => {
    try {
      const response = await get(`https://ig.colaksoft.online/api/v1/WorkAttendance?job_postingid=${activeJobData.job_postingid}&userid=${activeJobData.userid}`, {}, {}, true);
      
      // Response'dan OTP değerini al
      const receivedOtp = response?.data?.otp;
  
      // OTP değerini state'e ayarla
      setOtp(receivedOtp);

      // is_otp_verified durumunu kontrol et ve state'i güncelle
      setIsOtpVerified(response?.data?.is_otp_verified || false);
    } catch (error) {
      console.error('OTP alınırken hata oluştu:', error);
    }
  };
  

  // OtpUserScreen component
  const handlePostButtonClick = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
      };

      // activeJobData'dan gelen verileri istek verilerine ekle
      const requestData = {
        job_postingid: activeJobData.job_postingid,
        userid: activeJobData.userid,
        otp: otp, // Burada aldığımız OTP'yi kullanıyoruz
        is_otp_verified: true,
        created_at: new Date(), // Şu anki zamanı kullanarak created_at değerini oluştur
      };

      // API'ye istek gönder
      const response = await add('WorkAttendance', requestData, headers, true);

      console.log('API yanıtı:', response);

      if (response && response.isSuccess) {
        setIsOtpVerified(true); // OTP başarıyla doğrulandığını belirt
        Alert.alert('Başarılı', 'İstek başarıyla tamamlandı.');
      } else {
        Alert.alert('Hata', 'İstek sırasında bir hata oluştu.');
      }
    } catch (e) {
      console.error('Veri gönderme hatası:', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ marginBottom: 20 }}>OTP: {otp}</Text>
     
      <TouchableOpacity onPress={handlePostButtonClick} style={{ padding: 10, backgroundColor: '#4c669f', borderRadius: 8 }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>OTP Gönder</Text>
      </TouchableOpacity>

      {/* is_otp_verified durumuna göre metin gösterimi */}
      <Text style={{ marginTop: 20 }}>
        {isOtpVerified ? 'OTP başarıyla onaylandı.' : 'Şirket tarafından onay bekleniyor.'}
      </Text>
    </View>
  );
}
