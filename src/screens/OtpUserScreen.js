import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Modal, Button, StyleSheet } from 'react-native';
import { get, add } from '../api/apiHelperDeneme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'


export default function OtpUserScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const activeJobData = route.params?.activeJobData;
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackScore, setFeedbackScore] = useState('');

  useEffect(() => {
    fetchOtp(activeJobData);
  }, [activeJobData]); 

  const fetchOtp = async (activeJobData) => {
    try {
      const response = await get(`https://ig.colaksoft.online/api/v1/WorkAttendance?job_postingid=${activeJobData.job_postingid}&userid=${activeJobData.userid}`, {}, {}, true);
      const receivedOtp = response?.data?.otp;
      setOtp(receivedOtp);
      setIsOtpVerified(response?.data?.is_otp_verified || false);
    } catch (error) {
      console.error('OTP alınırken hata oluştu:', error);
    }
  };

  const handlePostButtonClick = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
      };

      const requestData = {
        job_postingid: activeJobData.job_postingid,
        userid: activeJobData.userid,
        otp: otp,
        is_otp_verified: true,
        created_at: new Date(),
      };

      const response = await add('WorkAttendance', requestData, headers, true);

      console.log('API yanıtı:', response);

      if (response && response.isSuccess) {
        setIsOtpVerified(true);
        Alert.alert('Başarılı', 'İstek başarıyla tamamlandı.');
      } else {
        Alert.alert('Hata', 'İstek sırasında bir hata oluştu.');
      }
    } catch (e) {
      console.error('Veri gönderme hatası:', e);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
      };

      const feedbackData = {
        job_postingid: activeJobData.job_postingid,
        userid: activeJobData.userid,
        companyid: activeJobData.companyid,
        question_score: feedbackScore,
        is_feedback_for_user: false,
        create_at: new Date(),
      };

      const response = await add('JobFeedback', feedbackData, headers, true);

      console.log('Feedback API yanıtı:', response);

      if (response && response.isSuccess) {
        Alert.alert('Başarılı', 'Geri bildiriminiz başarıyla gönderildi.');
        setModalVisible(false);
      } else {
        Alert.alert('Hata', 'Geri bildiriminiz gönderilirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Geri bildirim gönderme hatası:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#4D83E3', '#6A11CB']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ marginBottom: 30, color: 'white', fontSize: 24, fontWeight: 'bold' }}>OTP: {otp}</Text>
      
      <TouchableOpacity onPress={handlePostButtonClick} style={{ marginBottom: 20, borderRadius: 25, overflow: 'hidden' }}>
        <LinearGradient
          colors={['#6A11CB', '#2575FC']}
          style={{ paddingVertical: 15, paddingHorizontal: 50, borderRadius: 25 }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>OTP Gönder</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={{ marginBottom: 20, color: 'white', fontSize: 18, textAlign: 'center' }}>
        {isOtpVerified ? 'OTP başarıyla onaylandı.' : 'Şirket tarafından onay bekleniyor....'}
      </Text>

      {isOtpVerified && (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginBottom: 20, borderRadius: 25, overflow: 'hidden' }}>
          <LinearGradient
            colors={['#6A11CB', '#2575FC']}
            style={{ paddingVertical: 15, paddingHorizontal: 50, borderRadius: 25 }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Şirketi Değerlendir</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ marginBottom: 10, fontSize: 18, textAlign: 'center' }}>İş deneyimine kaç puan verirsiniz?</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, borderRadius: 8 }}
              onChangeText={text => setFeedbackScore(text)}
              value={feedbackScore}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleFeedbackSubmit}>
              <LinearGradient
                colors={['#6A11CB', '#2575FC']}
                style={{ padding: 15, borderRadius: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Gönder</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}