import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { get } from '../api/apiHelperDeneme'; // API Helper dosyasını doğru şekilde güncellediğinizden emin olun
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ApplyScreen({ route }) {
  const { jobPostingId } = route.params;
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchApplications() {
      try {
        const headers = {
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

  return (
    <View>

      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginTop: hp(5.0), padding: hp(1.5), borderBottomWidth: 4, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.name}</Text>
            <Text>{item.surname}</Text>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
