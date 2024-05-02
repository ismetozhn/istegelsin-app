import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { get, update } from '../api/apiHelperDeneme'; // API Helper dosyasını doğru şekilde güncellediğinizden emin olun
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ApplyScreen({ route }) {
  const { jobPostingId } = route.params;
const [applications, setApplications] = useState([]);

useEffect(() => {
  async function fetchApplications() {
    try {
      const headers = {
        'Content-Type': 'application/json-patch+json',
        'Company': 'true',
      };
      const response = await get(`JobApplication/ListByJobPosting?job_postingid=${jobPostingId}`, headers, true);
      if (response.isSuccess) {
        setApplications(response.data);
      } else {
        console.error('API request failed:', response.message);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  }
  fetchApplications();
}, []);

const handleAccept = async (item) => {
  try {
    const headers = {
      'Content-Type': 'application/json-patch+json',
      'Company': 'true',
    };

    const updatedItem = { ...item, is_user_accepted: true, is_user_rejected: false };
    const response = await update(`JobApplication`, updatedItem, headers, true);
    if (response.isSuccess) {
      Alert.alert('Başvuru Onaylandı');
      // Burada başka bir işlem yapılabilir, örneğin başvuruları tekrar yükleme
    } else {
      Alert.alert('Hata', 'Başvuruyu onaylama işlemi başarısız oldu');
    }
  } catch (error) {
    console.error('Error accepting application:', error);
  }
};

const handleReject = async (item) => {
  try {
    const headers = {
      'Content-Type': 'application/json-patch+json',
      'Company': 'true',
    };

    const updatedItem = { ...item, is_user_accepted: false, is_user_rejected: true };
    const response = await update(`JobApplication`, updatedItem, headers, true);
    if (response.isSuccess) {
      Alert.alert('Başvuru Reddedildi');
      // Burada başka bir işlem yapılabilir, örneğin başvuruları tekrar yükleme
    } else {
      Alert.alert('Hata', 'Başvuruyu reddetme işlemi başarısız oldu');
    }
  } catch (error) {
    console.error('Error rejecting application:', error);
  }
};

  return (
    <View>
      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginTop: hp(5.0), padding: hp(1.5), borderBottomWidth: 4, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.name}</Text>
            <Text>{item.surname}</Text>
            <Text>{item.email}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => handleAccept(item)} style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Onayla</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleReject(item)} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Reddet</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
