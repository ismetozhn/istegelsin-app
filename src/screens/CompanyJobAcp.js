import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { get, update ,add} from '../api/apiHelperDeneme';
import { readDataByKey,Keys } from '../helpers/storage'
import { LinearGradient } from 'expo-linear-gradient'




export default function CompanyJobAcp() {
  const [userList, setUserList] = useState([]);
  const [otpInputs, setOtpInputs] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedJobPostingId, setSelectedJobPostingId] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('');
  const [questionScore, setQuestionScore] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const headers = {
        'Company': 'true'
      };

      const response = await get(`JobApplication/ListAcceptedUsersByCompany`, headers, true);

      if (response && response.isSuccess) {
        setUserList(response.data);
        const newOtpInputs = {};
        response.data.forEach(user => {
          newOtpInputs[user.userid] = '';
        });
        setOtpInputs(newOtpInputs);
      } else {
        console.error('API response failed:', response.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAcceptButtonPress = async (job_postingid, userid) => {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
        'company': 'true'
      };

      const otp = otpInputs[userid];

      if (!otp) {
        Alert.alert('Error', 'Please enter an OTP.');
        return;
      }

      const verifyUrl = `WorkAttendance/VerifyOTP?job_postingid=${job_postingid}&userid=${userid}&otp=${otp}`;

      const response = await update(verifyUrl, {}, headers, true);

      if (response && response.isSuccess) {
        Alert.alert('Success', 'User successfully hired.');
      } else {
        Alert.alert('Error', 'OTP verification failed. Please enter a valid OTP.');
      }
    } catch (error) {
      console.error('An error occurred while hiring:', error);
    }
  };

  const handleEvaluateButtonPress = (userId, jobPostingId, companyId) => {
    setSelectedUserId(userId);
    setSelectedJobPostingId(jobPostingId);
    setSelectedCompanyId(companyId);
    setModalVisible(true);
  };

  const handleSubmitFeedback = async () => {
    try {
      const companyId = await readDataByKey(Keys.companyid); // AsyncStorage'den companyid'yi al
  
      const headers = {
        'Content-Type': 'application/json-patch+json',
        'Company': 'true'
      };
  
      const feedbackData = {
        job_postingid: selectedJobPostingId,
        userid: selectedUserId,
        companyid: companyId, // AsyncStorage'den alınan companyid
        question_score: parseInt(questionScore),
        is_feedback_for_user: true,
        created_at: new Date().toISOString(),
      };
  
      const response = await add('JobFeedback', feedbackData, headers, true);
  
      if (response && response.isSuccess) {
        Alert.alert('Success', 'User successfully evaluated.');
        setModalVisible(false);
      } else {
        Alert.alert('Error', 'Evaluation could not be submitted.');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    }
  };

  const renderOTPInput = (userid) => (
    <TextInput
      style={styles.input}
      placeholder="Doğrulama Kodunu Giriniz"
      onChangeText={(text) => setOtpInputs({...otpInputs, [userid]: text})}
      value={otpInputs[userid]}
    />
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name} {item.surname}</Text>
      <Text>Email: {item.email}</Text>
      <Text>GSM: {item.gsm}</Text>
      <Text>Gender: {item.gender_name}</Text>
      <Image style={styles.logo} source={{ uri: item.logo_path }} />
      {renderOTPInput(item.userid)}
      <TouchableOpacity
        onPress={() => handleAcceptButtonPress(item.job_postingid, item.userid)}
        style={styles.button}>
        <Text style={styles.buttonText}>Doğrulama Kodunu Gönder</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleEvaluateButtonPress(item.userid, item.job_postingid, item.companyid)}
        style={[styles.button, styles.evaluateButton]}>
        <Text style={styles.buttonText}>Kullanıcıyı Değerlendir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#330867', '#075985']}
      style={styles.container}>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Kullanıcıyı Değerlendir</Text>
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Puanını Giriniz"
              onChangeText={setQuestionScore}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSubmitFeedback} style={styles.button}>
              <Text style={styles.buttonText}>Gönder</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    paddingVertical: 20,
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginBottom: 5,
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
    backgroundColor: 'white',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  evaluateButton: {
    backgroundColor: '#2196F3',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
});