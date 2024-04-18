import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { get, add,update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { saveDataByKey, readDataByKey, Keys, clearAllData } from '../helpers/storage';

const GetDataPage = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
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
          'Content-Type': 'application/json-patch+json',
          'company': 'true',
        };
        const response = await get('Company/Login?email=test1@gmail.com&password=123', headers);
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
        companyid: String(responseData.companyid) || '',
        company_name: responseData.company_name || '',
        email: responseData.email || '',
        password: responseData.password || '',
        fax: responseData.fax || '',
        phone: responseData.phone || '',
        adress: String(responseData.adress) || '',
        logo_path: responseData.logo_path || '',
        is_active: String(responseData.is_active) || '',
        created_at: responseData.created_at || '',
        logo_file:  '',
        
        
      });

      clearAllData();
      // saveDataByKey fonksiyonunu çağırarak veriyi kaydet
saveDataByKey(Keys.email, responseData.email);
saveDataByKey(Keys.password, responseData.password);
saveDataByKey(Keys.companyid, responseData.companyid);
saveDataByKey(Keys.isLoggedIn, true);

// Değişken atama işlemi
//örnek kullanım
// let assignedEmail;
// try {
//   assignedEmail = await readDataByKey(Keys.email);
//   console.log(`Atanan Email: ${assignedEmail}`);
// } catch (error) {
//   console.error('Bir hata oluştu:', error);
// }


  



  
    }
    
  };

  const handlePostButtonClick = async () => {
   
    try {
        const headers = {
        'Content-Type': 'application/json-patch+json',
        'company': 'true',
      };
      const response = await add('Company', formData, headers);
      console.log('API yanıtı:', response);
    } catch (error) {
      console.error('Veri gönderme hatası:', error);
    }
  };

  
    const handleUpdate = async () => {
      try {
        const endpoint = 'Company'; // Güncellenecek kaydın endpoint'i
        
        const headers = {
          'Content-Type': 'multipart/form-data',
          'company': 'true',
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
        <View>
          <Button title="Get" onPress={handleGetButtonClick} />
          <TextInput
            value={formData.companyid}
            onChangeText={(text) => setFormData({ ...formData, companyid: text })}
            placeholder="Company ID"
            style={styles.input}
          />
          <TextInput
            value={formData.company_name}
            onChangeText={(text) => setFormData({ ...formData, company_name: text })}
            placeholder="Company Name"
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
            value={formData.fax}
            onChangeText={(text) => setFormData({ ...formData, fax: text })}
            placeholder="Fax"
            style={styles.input}
          />
          <TextInput
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Phone"
            style={styles.input}
          />
          <TextInput
            value={formData.adress}
            onChangeText={(text) => setFormData({ ...formData, adress: text })}
            placeholder="Address"
            style={styles.input}
          />
          <TextInput
            value={formData.logo_path}
            onChangeText={(text) => setFormData({ ...formData, logo_path: text })}
            placeholder="Logo Path"
            style={styles.input}
          />
          <TextInput
            value={formData.is_active}
            onChangeText={(text) => setFormData({ ...formData, is_active: text })}
            placeholder="Is Active"
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
        </View>
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default GetDataPage;
