import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import sendApiRequest from '../api/apiHelper'; // Önceden oluşturduğunuz helper fonksiyon

const App = () => {
  const [formData, setFormData] = useState({
    countryName: '',
    cityName: '',
    districtName: '',
    streetName: '',
    companyId: '',
    companyName: '',
    logoPath: '',
    isActive: '',
    fax: '',
    phone: '',
    email: '',
    countryId: '',
    cityId: '',
    districtId: '',
    streetId: '',
    apartmentNumber: '',
    username: '',
    password: '',
    createdAt: '',
    logoFile: null
  });
  const [response, setResponse] = useState(null);

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRequest = async (method) => {
    try {
      const apiResponse = await sendApiRequest(method, 'endpoint', formData);
      setResponse(apiResponse);
      setFormData(apiResponse.data); // Yanıttaki verileri form verilerine dönüştür
    } catch (error) {
      console.error('API isteği sırasında hata oluştu:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API İstek Gönderici</Text>
      {Object.keys(formData).map(key => (
        <TextInput
          key={key}
          value={formData[key]}
          onChangeText={(value) => handleChange(key, value)}
          placeholder={key}
          style={styles.input}
        />
      ))}
      <View style={styles.buttonContainer}>
        <Button title="GET" onPress={() => handleRequest('get')} />
        <Button title="POST" onPress={() => handleRequest('post')} />
        <Button title="PUT" onPress={() => handleRequest('put')} />
        <Button title="PATCH" onPress={() => handleRequest('patch')} />
      </View>
      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Yanıt:</Text>
          <Text>{JSON.stringify(response, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  responseContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  responseTitle: {
    fontWeight: 'bold',
  },
});

export default App;
