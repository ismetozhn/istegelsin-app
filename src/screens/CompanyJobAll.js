import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/core';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { readDataByKey, Keys } from '../helpers/storage';



export default function CompanyJob() {

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

    // useEffect(() => {
    //     async function fetchCompanyIdAndJobs() {
    //         try {
    //             const storedCompanyId = await readDataByKey('@companyid');
    //             if (storedCompanyId) {
    //                 setFormData(prevState => ({ ...prevState, companyid: storedCompanyId }));
    //                 // API'ye istek gönder
    //                 const response = await fetch(`https://ig.colaksoft.online/api/v1/JobPosting/ListByCompany?companyId=${storedCompanyId}&pageNumber=1&pageSize=10`);
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     // Gelen veriyi işle, örneğin bir state içine koyarak ekranda göster
    //                     console.log(data); // Gelen veriyi kontrol etmek için konsola yazdır
    //                 } else {
    //                     console.error('API request failed:', response.status);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error fetching company id and jobs:', error);
    //         }
    //     }
    //     fetchCompanyIdAndJobs();
    // }, []);
    

    useEffect(() => {
        async function fetchCompanyIdAndJobs() {
            try {
                const storedCompanyId = await readDataByKey('@companyid');
                if (storedCompanyId) {
                    const response = await fetch(`https://ig.colaksoft.online/api/v1/JobPosting/ListByCompany?companyId=${storedCompanyId}&pageNumber=1&pageSize=10`);
                    if (response.ok) {
                        console.log(formData.logo_path)
                        const data = await response.json();
                        setJobs(data.data.items); // API'den gelen ilanları state'e kaydet
                    } else {
                        console.error('API request failed:', response.status);
                    }
                }
            } catch (error) {
                console.error('Error fetching company id and jobs:', error);
            }
        }
        fetchCompanyIdAndJobs();
    }, []);

    return (
        <View className="flex-1  bg-blue-600" >
            <View className="flex-row justify-between mt-20 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(56 189 248)" />
                </TouchableOpacity>
            </View>


            <View className=" items-center mb-5 ">
                
                <Image
                 source={{ uri: 'https://cdn.colaksoft.online' + formData.logo_path }}
                 style={{ width: hp(15), height: hp(15), borderRadius: 180 }} />
            </View>

            <View className=" mb-3">
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddJob')}
                    className="py-3 bg-indigo-400 mx-7 rounded-xl">
                    <Text
                        className="text-xl font-bold text-center text-gray-900"
                    >
                        İlan Ekle
                    </Text>
                </TouchableOpacity>

            </View>

            

            <FlatList
                data={jobs}
                renderItem={({ item }) => (
                    <View style={{ padding: hp(1.5), borderBottomWidth: 4, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', marginBottom: hp(1) }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.total_salary}</Text>
                        {/* İlanın diğer bilgilerini burada gösterebilirsiniz */}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        

          
        </View>



    )
}

const styles = StyleSheet.create({})