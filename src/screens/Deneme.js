import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { get } from '../api/apiHelper'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin

const GetDataPage = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API'den Gelen Veri</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>{JSON.stringify(responseData, null, 2)}</Text>
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
});

export default GetDataPage;
