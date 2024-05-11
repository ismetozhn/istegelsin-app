import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert ,Image} from 'react-native';
import { get, update } from '../api/apiHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

export default function CompanyApplyScreen({ route }) {
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

      } else {
        Alert.alert('Hata', 'Başvuruyu reddetme işlemi başarısız oldu');
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };
  return (
    <LinearGradient
      colors={['#330867', '#075985']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View>
        <FlatList
          data={applications}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginTop: hp(5.0),
                padding: hp(1.5),
                borderBottomWidth: 4,
                borderBottomColor: '#ccc',
                opacity: 0.8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Renkli arka plan
                borderRadius: 10, // Kenar yuvarlatma
              }}
            >
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image source={{ uri: 'https://cdn.colaksoft.online' + item.logo_path }} style={{ height: 120, width: 120, borderRadius: 60 }} />
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', color: 'white' }}>{item.name} {item.surname}</Text>
                  <Text style={{ color: 'white' }}>Email: {item.email}</Text>
                  <Text style={{ color: 'white' }}>Telefon Numarası: {item.gsm}</Text>

                  
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={() => handleAccept(item)}
                  style={{
                    marginTop: 10,
                    backgroundColor: '#4CAF50', // Yeşil renk
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'white' }}>Onayla</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleReject(item)}
                  style={{
                    marginTop: 10,
                    backgroundColor: '#F44336', // Kırmızı renk
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'white' }}>Reddet</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    </LinearGradient>
  );
}