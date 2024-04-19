import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView  } from 'react-native';
import { get, add,update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { saveDataByKey, readDataByKey, Keys, clearAllData } from '../helpers/storage';

const GetDataPage = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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
          'Content-Type': 'application/json-patch+json',
          'user': 'true',
        };
        const response = await get('User/Login?email=test1@gmail.com&password=123', headers);
        console.log('API yanıtı:', response);
        setResponseData(response);
        
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);



  const handleGetButtonClick = async () => {
    // API'den gelen verileri formData'ya yerleştir
    if (responseData) {
      setFormData({
        userid: String(responseData.userid) || '',
        name: responseData.name || '',
        surname: responseData.surname || '',
        id_no: responseData.id_no || '',
        email: responseData.email || '',
        password: responseData.password || '',
        gsm: responseData.gsm || '',
        gender_type: String(responseData.gender_type) || '',
        bank_account_code: responseData.bank_account_code || '',
        working_with_bankid: String(responseData.working_with_bankid) || '',
        logo_file:  '',
        iban: responseData.iban || '',
        logo_path: responseData.logo_path || '',
        is_active: String(responseData.is_active) || '',
        birthday: responseData.birthday || '',
        created_at: responseData.created_at || '',
        
        
        
      });

      clearAllData();
      // saveDataByKey fonksiyonunu çağırarak veriyi kaydet
saveDataByKey(Keys.email, responseData.email);
saveDataByKey(Keys.password, responseData.password);
saveDataByKey(Keys.userid, responseData.userid);
saveDataByKey(Keys.isLoggedIn, true);

    }
    
  };

  const handlePostButtonClick = async () => {
   
    try {
        const headers = {
        'Content-Type': 'application/json-patch+json',
        'user': 'true',
      };
      const response = await add('User', formData, headers);
      console.log('API yanıtı:', response);
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
    }
  };

  
    const handleUpdate = async () => {
      try {
        const endpoint = 'User'; // Güncellenecek kaydın endpoint'i
        
        const headers = {
          'Content-Type': 'multipart/form-data',
          'user': 'true',
        };
        const response = await update(endpoint, formData, headers,true);
        console.log('Güncelleme işlemi başarılı:', response);
      } catch (error) {
        console.error('Güncelleme işlemi hatası:', error);
      }
    };
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>API'den Gelen Veri</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <ScrollView  showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
          <Button title="Get" onPress={handleGetButtonClick} />
          <TextInput
            value={formData.userid}
            onChangeText={(text) => setFormData({ ...formData, companyid: text })}
            placeholder="User ID"
            style={styles.input}
          />
          <TextInput
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="User Name"
            style={styles.input}
          />
            <TextInput
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
            placeholder="User SurName"
            style={styles.input}
          />  
          <TextInput
          value={formData.id_no}
          onChangeText={(text) => setFormData({ ...formData, id_no: text })}
          placeholder="ID No"
          style={styles.input}
        />

          <TextInput
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            placeholder="Password"
            style={styles.input}
          />
          <TextInput
            value={formData.gsm}
            onChangeText={(text) => setFormData({ ...formData, gsm: text })}
            placeholder="Gsm"
            style={styles.input}
          />
          <TextInput
            value={formData.gender_type}
            onChangeText={(text) => setFormData({ ...formData, gender_type: text })}
            placeholder="gender type"
            style={styles.input}
          />
          <TextInput
            value={formData.bank_account_code}
            onChangeText={(text) => setFormData({ ...formData, bank_account_code: text })}
            placeholder="Bank Account Code"
            style={styles.input}
          />
          <TextInput
            value={formData.working_with_bankid}
            onChangeText={(text) => setFormData({ ...formData, working_with_bankid: text })}
            placeholder="Working with bankid"
            style={styles.input}
          />
          <TextInput
            value={formData.iban}
            onChangeText={(text) => setFormData({ ...formData, iban: text })}
            placeholder="Iban"
            style={styles.input}
          />
          <TextInput
            value={formData.is_active}
            onChangeText={(text) => setFormData({ ...formData, is_active: text })}
            placeholder="is_active"
            style={styles.input}
          />
            <TextInput
            value={formData.birthday}
            onChangeText={(text) => setFormData({ ...formData, birthday: text })}
            placeholder="Birthday"
            style={styles.input}
          />
          <TextInput
            value={formData.created_at}
            onChangeText={(text) => setFormData({ ...formData, created_at: text })}
            placeholder="Created At"
            style={styles.input}
          />
          <TextInput
            value={formData.logo_file}
            onChangeText={(text) => setFormData({ ...formData, logo_file: text })}
            placeholder="logo_file"
            style={styles.input}
          />
          <Button title="Post" onPress={handlePostButtonClick} />
          <Button title="Update" onPress={handleUpdate} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
   scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default GetDataPage;
