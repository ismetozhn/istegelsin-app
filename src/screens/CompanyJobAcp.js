import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { get, update } from '../api/apiHelperDeneme';

export default function CompanyJobAcp() {
  const [userList, setUserList] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});

  useEffect(() => {
    fetchData(); // Başlangıçta job_postingid olarak 34'ü kullanarak veri çekiyoruz
  }, []);

  const fetchData = async (job_postingid) => {
    try {
      const headers = {
        'company': 'true' // Şirket için header
      };

      // API'den veri çekme
      const response = await get(`JobApplication/ListAcceptedUsersByCompany`, {}, headers, true);

      if (response && response.isSuccess) {
        setUserList(response.data);
        // Kullanıcılar listesi güncellendiğinde, her bir kullanıcı için bir OTP girişi oluşturulmalıdır.
        const newOtpInputs = {};
        response.data.forEach(user => {
          newOtpInputs[user.userid] = ''; // Kullanıcı kimliğine özel boş bir OTP girişi oluştur
        });
        setOtpInputs(newOtpInputs);
      } else {
        console.error('API yanıtı başarısız:', response.message);
      }
    } catch (error) {
      console.error('Veri getirme hatası:', error);
    }
  };

  const handleAcceptButtonPress = async (job_postingid, userid) => {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
        'company': 'true' // Şirket için header
      };

      const otp = otpInputs[userid]; // Kullanıcıya özgü OTP'yi al

      if (!otp) {
        Alert.alert('Hata', 'Lütfen bir OTP girin.');
        return;
      }

      const verifyUrl = `WorkAttendance/VerifyOTP?job_postingid=${job_postingid}&userid=${userid}&otp=${otp}`;

      // API'ye güncelleme isteği gönder
      const response = await update(verifyUrl, {}, headers, true);

      if (response && response.isSuccess) {
        Alert.alert('Başarılı', 'Kullanıcı başarıyla işe alındı.');
      } else {
        Alert.alert('Hata', 'OTP doğrulaması başarısız. Lütfen geçerli bir OTP girin.');
      }
    } catch (error) {
      console.error('İşe alınırken bir hata oluştu:', error);
    }
  };

  const renderOTPInput = (userid) => (
    <TextInput
      style={styles.input}
      placeholder="OTP'yi girin"
      onChangeText={(text) => handleOTPChange(text, userid)}
      value={otpInputs[userid]}
    />
  );

  const handleOTPChange = (text, userid) => {
    const newOtpInputs = { ...otpInputs };
    newOtpInputs[userid] = text;
    setOtpInputs(newOtpInputs);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name} {item.surname}</Text>
      <Text>Email: {item.email}</Text>
      <Text>GSM: {item.gsm}</Text>
      <Text>Cinsiyet: {item.gender_name}</Text>
      <Image style={styles.logo} source={{ uri: item.logo_path }} />
      {renderOTPInput(item.userid)}
      <TouchableOpacity
        onPress={() => handleAcceptButtonPress(item.job_postingid, item.userid)}
        style={styles.button}>
        <Text style={styles.buttonText}>Kabul Et</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // KeyExtractor'ı güncelledik
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
