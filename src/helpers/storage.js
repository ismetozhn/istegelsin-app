import AsyncStorage from '@react-native-async-storage/async-storage';

// Anahtar nesnesi
export const Keys = {
  isLoggedIn: '@is_logged_in',
  email: '@email',
  password: '@user_password',
  companyid: '@companyid',
  // Diğer özelleştirilmiş anahtarlar buraya eklenebilir
};

// Anahtarları kullanarak değerleri saklamak için kullanılan işlev
export const saveDataByKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, String(value)); // Değer String() ile dönüştürülüyor
    console.log(`Data saved for key: ${key}`);
  } catch (error) {
    console.error(`Error saving data for key: ${key}`, error);
  }
};

// Anahtarları kullanarak değerleri okumak için kullanılan işlev
export const readDataByKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Retrieved value for key ${key}:`, value);
      return value;
    } else {
      console.log(`No value found for key: ${key}`);
      return null; // Varsayılan değer olarak null döndürülüyor
    }
  } catch (error) {
    console.error(`Error retrieving data for key: ${key}`, error);
    return null; // Hata durumunda varsayılan değer olarak null döndürülüyor
  }
};

// Tüm anahtarları döngüye alarak değerleri gösterme
export const showAllData = async () => {
  try {
    for (const key in Keys) {
      const value = await AsyncStorage.getItem(key);
      console.log(`${key}: ${value}`);
    }
  } catch (error) {
    console.error('Error showing data:', error);
  }
};
