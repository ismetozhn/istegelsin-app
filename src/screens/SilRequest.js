import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import sendApiRequest from '../api/apiHelper';


const App = () => {
  const [formData, setFormData] = useState({
    idNo: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    gsm: '',
    email: '',
    genderType: '',
    countryId: '',
    cityId: '',
    districtId: '',
    streetId: '',
    logoPath: '',
    iban: '',
    bankAccountCode: '',
    workingWithBankId: '',
    isActive: false,
    birthday: new Date().toISOString().split('T')[0], // default birthday value
  });

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (method) => {
    // Burada endpoint ve customBaseUrl gerektiği gibi ayarlanmalıdır.
    sendApiRequest(method, 'User', formData);
  };

  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>API İstek Formu</Text>
      <View style={{ width: '80%' }}>
        {/* Form inputları burada yer alacak */}
        {Object.keys(formData).map(key => (
          <TextInput
            key={key}
            value={formData[key]}
            onChangeText={(value) => handleChange(key, value)}
            placeholder={key}
            style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 1, padding: 1 }}
            {...(key === 'isActive' && { keyboardType: 'numeric' })} // For numeric inputs
            {...(key === 'birthday' && { type: 'date' })} // For date inputs
          />
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="GET İsteği Gönder" onPress={() => handleSubmit('get')} />
        <Button title="POST İsteği Gönder" onPress={() => handleSubmit('post')} />
        <Button title="PUT İsteği Gönder" onPress={() => handleSubmit('put')} />
        <Button title="PATCH İsteği Gönder" onPress={() => handleSubmit('patch')} />
      </View>
    </View>
  );
};

export default App;
