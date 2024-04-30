import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { get } from '../api/apiHelperDeneme'; // API Helper dosyasını doğru şekilde güncellediğinizden emin olun
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/core';

export default function ApplyScreen({ route }) {
  const { jobPostingId } = route.params;
  const [applications, setApplications] = useState([]);
  const navigation = useNavigation();

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
    <View className="flex-1  bg-sky-50">
      <View className="flex-row justify-between mt-20 ">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-blue-600">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="white" />
        </TouchableOpacity>
      </View>

      <View className=" my-5">
        <TouchableOpacity
          onPress={() => navigation.navigate('AddJob')}
          className="py-3 bg-indigo-500 mx-7 rounded-xl ">
          <Text
            className="text-xl font-bold text-center text-gray-200 "
          >
            İlana Başvuranlar
          </Text>
        </TouchableOpacity>
      </View>



      {/* <FlatList
        data={applications}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginTop: hp(5.0), padding: hp(1.5), borderBottomWidth: 4, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.name}</Text>
            <Text>{item.surname}</Text>
            <Text>{item.email}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}

      <FlatList
        data={applications}
        renderItem={({ item }) => (
          <TouchableOpacity className='border-4 space-y-2 border-indigo-500 mx-5  rounded-2xl '  style={{ padding: hp(1.5) }}>
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
