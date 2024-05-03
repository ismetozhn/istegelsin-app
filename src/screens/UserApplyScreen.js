import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { readDataByKey, Keys } from '../helpers/storage';
import { get, add, update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { LinearGradient } from 'expo-linear-gradient';

export default function UserApplyScreen() {

    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        job_postingid: 2,
        companyid: 0,
        employment_type: '',
        education_level: '',
        experience_level: '',
        experience_years: '',
        work_model: '',
        work_per_hour: '',
        total_salary: '',
        title: '',
        description: '',
        logo_path: '1',
        adress: '',
        is_active: true,
        start_at: '2024-04-20T15:56:22',
        end_at: '2024-05-20T15:56:22'
    });

    const [apply, setApply] = useState([]);

    useEffect(() => {
        async function fetchCompanyIdAndJobs() {
            try {
                const storedUserId = await readDataByKey('@userid');
                if (!storedUserId) {
                    console.error('Storage userid equal 0');
                }

                const headers = {

                };

                const response = await get('https://ig.colaksoft.online/api/v1/JobApplication/ListByUser', headers, true);
                if (response.isSuccess) {
                    setApply(response.data); // API'den gelen ilanları state'e kaydet
                    console.log(apply)
                }
                else {
                    console.error('API request failed:', response.message);
                }
            } catch (error) {
                console.error('Error fetching user,, id and apply:', error);
            }
        }
        fetchCompanyIdAndJobs();
    }, []);
    return (
        <LinearGradient
            colors={['#330867', '#075985']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >

            <View className="flex-1 " >
                <View className="flex-row justify-between mt-20 ">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
                    </TouchableOpacity>
                </View>

                <View className=" items-center mb-5 ">
                    <Image
                        source={require("../../assets/images/istegelsin.png")} style={{ width: hp(15), height: hp(15), borderRadius: 180 }}
                    />
                </View>

                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ActiveJob')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl ">
                        <Text
                            className="text-xl font-bold text-center text-gray-100 "
                        >
                            Aktif İş
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-xl font-bold text-center underline text-gray-50" >
                    Başvurularım
                </Text>
                <FlatList
                    data={apply}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ padding: hp(1.5), borderBottomWidth: 4, borderBottomColor: '#ccc' }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.company_name}</Text>
                            <Text className='text-base'>{item.title}</Text>
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />


            </View>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({})