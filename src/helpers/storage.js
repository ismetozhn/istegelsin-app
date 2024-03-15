import AsyncStorage from '@react-native-async-storage/async-storage';

// Veri kaydetme fonksiyonu
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved');
  } catch (error) {
    console.error('Error saving data', error);
  }
};

// Veri okuma fonksiyonu
export const readData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved value:', value);
      return value;
    } else {
      console.log('No value found for key:', key);
      return null; // Varsayılan değer olarak null döndürülüyor
    }
  } catch (error) {
    console.error('Error retrieving data', error);
    return null; // Hata durumunda varsayılan değer olarak null döndürülüyor
  }
};