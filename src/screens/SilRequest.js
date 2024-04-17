// App.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// Fake verileri kullanalım
const fakeData = [
  { id: 1, name: 'Ahmet', surname: 'Yılmaz', age: 30 },
  { id: 2, name: 'Mehmet', surname: 'Demir', age: 25 },
];

const App = () => {
  // State'ler
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    surname: '',
    age: ''
  });
  const [response, setResponse] = useState(null);

  // Input değişiklikleri için handleChange fonksiyonu
  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // GET işlemi için handleGet fonksiyonu
  const handleGet = () => {
    try {
      const id = parseInt(formData.id);
      if (!id) {
        alert('Geçersiz ID');
        return;
      }
      const data = fakeData.find(item => item.id === id);
      if (!data) {
        alert('Veri bulunamadı');
        return;
      }
      setResponse(data);
      setFormData(data);
    } catch (error) {
      console.error('GET işlemi sırasında hata:', error);
    }
  };

  // UPDATE işlemi için handleUpdate fonksiyonu
  const handleUpdate = () => {
    try {
      // formData içindeki id alanını kontrol et
      if (!formData.id) {
        alert('Lütfen güncellenecek verinin ID\'sini girin.');
        return;
      }
  
      // Güncelleme işlemini fakeData'da yapalım
      const id = parseInt(formData.id);
      const index = fakeData.findIndex(item => item.id === id);
      if (index === -1) {
        alert('Veri bulunamadı');
        return;
      }
  
      // Veri bulunduğunda güncelleme işlemini yap
      fakeData[index] = { ...fakeData[index], ...formData };
      alert('Veri güncellendi!');
      handleGet(); // Güncelleme işlemi başarılı olduğunda get işlemi yapalım
    } catch (error) {
      console.error('UPDATE işlemi sırasında hata:', error);
    }
  };
  
  
  
  

  // DELETE işlemi için handleDelete fonksiyonu
  const handleDelete = () => {
    try {
      if (formData.id && fakeData.find(item => item.id === parseInt(formData.id))) {
        const id = parseInt(formData.id);
        const index = fakeData.findIndex(item => item.id === id);
        fakeData.splice(index, 1); // Kaydı listeden kaldır
        alert('Kayıt silindi!');
        handleGet(); // Kayıt silindiğinde get işlemi yapalım
      } else {
        alert('Veri bulunamadı');
      }
    } catch (error) {
      console.error('Silme işlemi sırasında hata:', error);
    }
  };
  

  // ADD işlemi için handleAdd fonksiyonu
  const handleAdd = () => {
    try {
      if (!formData.id || !fakeData.find(item => item.id === parseInt(formData.id))) {
        // Yeni bir kayıt oluşturulacak
        const newRecord = {
          id: formData.id ? parseInt(formData.id) : fakeData.length + 1, // Yeni bir ID oluşturulacak
          name: formData.name,
          surname: formData.surname,
          age: formData.age
        };
        fakeData.push(newRecord);
        alert('Yeni kayıt eklendi!');
      } else {
        // Verilen ID'ye sahip kayıt güncellenecek
        const id = parseInt(formData.id);
        const index = fakeData.findIndex(item => item.id === id);
        if (index !== -1) {
          fakeData[index] = {
            ...fakeData[index],
            name: formData.name,
            surname: formData.surname,
            age: formData.age
          };
          alert('Kayıt güncellendi!');
        } else {
          alert('Veri bulunamadı');
        }
      }
      handleGet(); // Yeni kayıt eklendiğinde veya kayıt güncellendiğinde get işlemi yapalım
    } catch (error) {
      console.error('İşlem sırasında hata:', error);
    }
  };
  
  
  
  


  // Return kısmı, component'in görünen kısmı
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API İstek Gönderici</Text>
      <TextInput
        value={formData.id}
        onChangeText={(value) => handleChange('id', value)}
        placeholder="ID"
        style={styles.input}
      />
      <TextInput
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholder="İsim"
        style={styles.input}
      />
      <TextInput
        value={formData.surname}
        onChangeText={(value) => handleChange('surname', value)}
        placeholder="Soyisim"
        style={styles.input}
      />
      <TextInput
        value={formData.age}
        onChangeText={(value) => handleChange('age', value)}
        placeholder="Yaş"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="GET" onPress={handleGet} />
        <Button title="UPDATE" onPress={handleUpdate} />
        <Button title="DELETE" onPress={handleDelete} />
        <Button title="ADD" onPress={handleAdd} />
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
