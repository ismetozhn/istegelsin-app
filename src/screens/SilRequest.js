import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { get, add, update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { readDataByKey, Keys, clearAllData } from '../helpers/storage';


const EditCompanyScreen = () => {
  const [companyData, setCompanyData] = useState({
    companyid:'',
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
        // AsyncStorage'den company id'yi al
       
        // API'den ilgili şirket bilgilerini çek
        const headers = {
          
          'Company': 'true',
        };
        const response = await get('Company', headers, true);
        const companyId = await readDataByKey(Keys.companyid);
        console.log('yanıtss', companyId)
        console.log('API yanıtı:', response);
       
        
        if (response && response.data.companyid) {
          setCompanyData({
            companyid: response.data.companyid || '',
            company_name: response.data.company_name || '',
            email: response.data.email || '',
            password: response.data.password || '',
            fax: response.data.fax || '',
            phone: response.data.phone || '',
            adress : response.data.adress  || '',
            logo_path: response.data.logo_path || '',
            is_active: response.data.is_active || '',
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

  const handleUpdate = async () => {
    try {
      const endpoint = 'Company'; // Güncellenecek kaydın endpoint'i
      
      const headers = {
        'Content-Type': 'multipart/form-data',
        'company': 'true',
      };
      // formData yerine companyData kullan
      const response = await update(endpoint, companyData, headers, true);
      console.log('Güncelleme işlemi başarılı:', response);
    } catch (error) {
      console.error('Güncelleme işlemi hatası:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şirket Bilgilerini Düzenle</Text>
      <TextInput
        value={companyData.company_name}
        onChangeText={(text) => setCompanyData({ ...companyData, company_name: text })}
        placeholder="Şirket İsmi"
        style={styles.input}
      />
      <TextInput
        value={companyData.email}
        onChangeText={(text) => setCompanyData({ ...companyData, email: text })}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={companyData.password}
        onChangeText={(text) => setCompanyData({ ...companyData, password: text })}
        placeholder="Şifre"
        style={styles.input}
      />
      <TextInput
        value={companyData.fax}
        onChangeText={(text) => setCompanyData({ ...companyData, fax: text })}
        placeholder="Fax"
        style={styles.input}
      />
      <TextInput
        value={companyData.phone}
        onChangeText={(text) => setCompanyData({ ...companyData, phone: text })}
        placeholder="Telefon"
        style={styles.input}
      />
      <TextInput
        value={companyData.adress }
        onChangeText={(text) => setCompanyData({ ...companyData, adress : text })}
        placeholder="Adres"
        style={styles.input}
      />
      <TextInput
        value={companyData.logo_path}
        onChangeText={(text) => setCompanyData({ ...companyData, logo_path: text })}
        placeholder="Logo Yolu"
        style={styles.input}
      />
      <TextInput
        value={companyData.is_active}
        onChangeText={(text) => setCompanyData({ ...companyData, is_active: text })}
        placeholder="Aktif mi?"
        style={styles.input}
      />
      <TextInput
        value={companyData.created_at}
        onChangeText={(text) => setCompanyData({ ...companyData, created_at: text })}
        placeholder="Oluşturulma Tarihi"
        style={styles.input}
      />
      <TextInput
        value={companyData.logo_file}
        onChangeText={(text) => setCompanyData({ ...companyData, logo_file: text })}
        placeholder="Logo Dosyası"
        style={styles.input}
      />
      <Button title="Kaydet" onPress={handleUpdate} />
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

export default EditCompanyScreen;
