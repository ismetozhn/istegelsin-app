import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { readDataByKey, Keys } from '../helpers/storage';
import { get, add, update } from '../api/apiHelperDeneme'; // apiHelper dosyasının bulunduğu yolu doğru olarak güncelleyin
import { LinearGradient } from 'expo-linear-gradient';


export default function CompanyJob() {
    const navigateToApplications = (jobPostingId) => {
        navigation.navigate('Basvurular', { jobPostingId });
    }
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

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchCompanyIdAndJobs() {
            try {
                const storedCompanyId = await readDataByKey('@companyid');
                if (!storedCompanyId) {
                    console.error('Storage companyid equal 0');
                }

                const headers = {
                    'Company': 'true',
                };

                const response = await get(`JobPosting/ListByCompany?companyId=${storedCompanyId}&pageNumber=1&pageSize=10`, headers, true);
                if (response.isSuccess) {
                    setJobs(response.data.items); // API'den gelen ilanları state'e kaydet
                }
                else {
                    console.error('API request failed:', response.message);
                }
            } catch (error) {
                console.error('Error fetching company id and jobs:', error);
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
        <View className="flex-1  " >
            <View className="flex-row justify-between mt-20 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-blue-600">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="white" />
                </TouchableOpacity>
            </View>

            <View className=" items-center mb-5 ">
                <Image
                    source={require("../../assets/images/istegelsin.png")} style={{ width: hp(15), height: hp(15), borderRadius: 180, borderWidth: 3, borderColor:'white' }}
                />
            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddJob')}
                    className="py-3 bg-indigo-500 mx-7 rounded-xl ">
                    <Text
                        className="text-xl font-bold text-center text-gray-200 "
                    >
                        İlan Ekle
                    </Text>
                </TouchableOpacity>
            </View>
            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('SirketKabul')}
                    className="py-3 bg-indigo-500 mx-7 rounded-xl ">
                    <Text
                        className="text-xl font-bold text-center text-gray-200 "
                    >
                        Onaylanan Başvurular
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={jobs}
                renderItem={({ item }) => (
                    <TouchableOpacity className=' border-4 space-y-2 border-slate-50 mx-5  rounded-2xl bg-indigo-400 ' onPress={() => navigateToApplications(item.job_postingid)} style={{ padding: hp(1.5) }}>
                        <Text style={{color:'#ffffff', fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.total_salary}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />

            


        </View>
        </LinearGradient>

    )
}
const styles = StyleSheet.create({})