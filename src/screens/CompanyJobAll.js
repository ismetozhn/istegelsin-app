import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { readDataByKey, Keys } from '../helpers/storage';
import { get } from '../api/apiHelper';
import { LinearGradient } from 'expo-linear-gradient';


export default function CompanyJob() {
    const navigateToApplications = (jobPostingId) => {
        navigation.navigate('Basvurular', { jobPostingId });
    }
    const [logoPath, setLogoPath] = useState('');
    const [isUser, setIsUser] = useState(false);
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
        fetchData();
    }, []);

    const fetchData = async () => {
        try {

            const companyId = await readDataByKey('@companyid');
            // Şirket verilerini al
            const companyData = await getCompanyData(companyId);
            setLogoPath(companyData.logo_path);
            setIsUser(false);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getCompanyData = async (companyId) => {
        try {
            const headers = {
                'Company': 'true'
            };
            const response = await get(`https://ig.colaksoft.online/api/v1/Company`, headers, true);
            if (response && response.data) {
                return response.data;
            } else {
                throw new Error('Company data not found');
            }
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };
    return (
        <LinearGradient
            colors={['#330867', '#075985']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View className="flex-1  " >
                <View className="flex-row justify-between mt-20 ">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
                    </TouchableOpacity>

                </View>

                <View className=" items-center mb-5 ">
                    {/* <Image
                        source={require("../../assets/images/istegelsin.png")} style={{ width: hp(15), height: hp(15), borderRadius: 180, borderWidth: 3, borderColor: 'white' }}
                    /> */}

                    {logoPath ? (
                        <Image source={{ uri: 'https://cdn.colaksoft.online' + logoPath }} style={{ width: hp(15), height: hp(15), borderRadius: 180, borderWidth: 3, borderColor: '#12218e' }}/>
                    ) : (
                        <Image source={require('../../assets/images/man.jpg')} style={{ width: hp(15), height: hp(15), borderRadius: 180, borderWidth: 3, borderColor: 'white' }} />
                    )}
                </View>

                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddJob')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl ">
                        <Text
                            className="text-xl font-bold text-center text-gray-100 "
                        >
                            İlan Ekle
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className=" mb-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SirketKabul')}
                        className="py-3 bg-indigo-600 mx-7 rounded-xl ">
                        <Text
                            className="text-xl font-bold text-center text-gray-100 "
                        >
                            Onaylanan Başvurular
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={jobs}
                    renderItem={({ item }) => (
                        <TouchableOpacity className=' space-y-2  mx-5  rounded-2xl ' onPress={() => navigateToApplications(item.job_postingid)} style={{ padding: hp(1.5) }}>
                            <LinearGradient
                                colors={['#4c669f', '#3b5998', '#192f6a']}
                                style={{ padding: 16, borderRadius: 8, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 }}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={{ color: '#ffffff', fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.title}</Text>
                                <Text className='text-slate-50 font-bold mb-2'>{item.adress}</Text>
                                <Text className='text-slate-50'>{item.description}</Text>
                                <Text className='text-slate-50 mt-2'>{item.total_salary}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />




            </View>
        </LinearGradient>

    )
}
const styles = StyleSheet.create({})