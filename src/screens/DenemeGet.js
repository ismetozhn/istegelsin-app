import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { get, add } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { saveDataByKey, readDataByKey, Keys } from '../helpers/storage';

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
    adresss: '',
    logo_path: '',
    is_active: '',
    created_at: '',
    logo_file: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('Company/Login?email=test1@gmail.com&password=123'); // İstediğiniz endpoint'i buraya yazın
        setResponseData(response);
        
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchData();
  }, []);

  const handleGetButtonClick = () => {
    // API'den gelen verileri formData'ya yerleştir
    if (responseData) {
      setFormData({
        companyid: String(responseData.companyid) || '',
        company_name: responseData.company_name || '',
        email: responseData.email || '',
        password: responseData.password || '',
        fax: responseData.fax || '',
        phone: responseData.phone || '',
        adresss: String(responseData.adresss) || '',
        logo_path: responseData.logo_path || '',
        is_active: String(responseData.is_active) || '',
        created_at: responseData.created_at || '',
        logo_file: String(responseData.logo_file) || null,
        
        
      });
      saveDataByKey(Keys.email, 'berkan@gmail.com')
  .then(() => {
    // Kaydedildikten sonra konsolda email'i gösterelim
    return readDataByKey(Keys.email);
  })
  .then((savedEmail) => {
    console.log(`Kaydedilen Email: ${savedEmail}`);
  })
  .catch((error) => {
    console.error('Bir hata oluştu:', error);
  });
       //saveDataByKey(Keys.email, 'berkan@gmail.com');
   
      // var email = responseData.email
     //  saveDataByKey(Keys.email, email);
    //     saveDataByKey(Keys.password, responseData.password);
    //     saveDataByKey(Keys.companyid, String(responseData.companyid));
    //   console.log('--- Stored Data ---');
     //console.log(`Email: ${ readDataByKey(Keys.email)}`);
    //   console.log(`Password: ${ readDataByKey(Keys.password)}`);
    //   console.log(`Company ID: ${ readDataByKey(Keys.companyid)}`);
    //   console.log('--- End of Stored Data ---');
    }
    
  };

  const handlePostButtonClick = async () => {
    try {
      const response = await add('Company', formData); // 'Company' endpoint'i doğru olmalıdır
      console.log('Post işlemi başarılı:', response);
      // Post işlemi başarılı olduğunda yapılacak işlemler buraya eklenebilir
    } catch (error) {
      console.error('Post işlemi hatası:', error);
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
            value={formData.adresss}
            onChangeText={(text) => setFormData({ ...formData, adresss: text })}
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
