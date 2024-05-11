import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Bars3BottomRightIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Jobs from '../components/jobs';
import { useNavigation } from '@react-navigation/native';
import { readDataByKey } from '../helpers/storage';
import { get } from '../api/apiHelper';


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const [logoPath, setLogoPath] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getCategories();
    getJobs();
    fetchData();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    getCategories();
    getJobs();
    setRefreshing(false);
  }, []);
  const handleChangeCategory = category => {
    getJobs(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const fetchData = async () => {
    try {
      const userId = await readDataByKey('@userid');
      const companyId = await readDataByKey('@companyid');
  
      if (userId) {
        // Kullanıcı verilerini al
        const userData = await getUserData(userId);
        setLogoPath(userData.logo_path);
        setIsUser(true);
      } else if (companyId) {
        // Şirket verilerini al
        const companyData = await getCompanyData(companyId);
        setLogoPath(companyData.logo_path);
        setIsUser(false);
      } else {
        // Ne kullanıcı ne de şirket bilgileri bulundu
        console.error('No user or company data found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const getUserData = async (userId) => {
    try {
      const headers = {


      };
      const response = await get(`https://ig.colaksoft.online/api/v1/User`, headers, true);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getCompanyData = async (companyId) => {
    try {
      const headers = {
        'Company': 'true'
      };
      const response = await get(`https://ig.colaksoft.online/api/v1/Company`, headers , true);
      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Company data not found');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };
  



  const getCategories = async () => {
    try {
      const response = await axios.get('https://ig.colaksoft.online/api/v1/Helper/ListWorkModel');
      if (response && response.data) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.log('error:', err.message);
    }
  };

  const getJobs = async (category = 0) => {
    try {
      const response = await axios.get(`https://ig.colaksoft.online/api/v1/JobPosting/List?workModelId=${category}&pageNumber=1&pageSize=100`);
      if (response && response.data) {
        setMeals(response.data.data.items);
      }
    } catch (err) {
      console.log('error:', err.message);
    }
  };


  const handleSearch = () => {
    const filteredMeals = meals.filter(item => {

      const normalizedTitle = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const normalizedSearchText = searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalizedTitle.includes(normalizedSearchText);
    });
    setMeals(filteredMeals);
  };
  const handleChangeText = (text) => {
    setSearchText(text);
    handleSearch();
  };


  const handleJobDetail = (item) => {
    navigation.navigate('JobDetail', { ...item });
  };

  return (
    <View>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {logoPath ? (
              <Image source={{ uri: 'https://cdn.colaksoft.online' + logoPath }} style={{ height: 60, width: 60, borderRadius: 25 }} />
            ) : (
              <Image source={require('../../assets/images/man.jpg')} style={{ height: 50, width: 50, borderRadius: 25 }} />
            )}
          </TouchableOpacity>
          <Bars3BottomRightIcon  onPress={() => navigation.navigate('Menu')}  strokeWidth={2.5} size={hp(6)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-sky-600"> Merhaba, İş Dünyasına Hoş Geldiniz!</Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">Aradığın işi her an </Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">her yerde kolayca
            <Text className=" text-sky-400"> bul</Text>
          </Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='İşi ara'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            onChangeText={setSearchText}
          />
          <Pressable onPress={handleSearch}>

            <View className="bg-white rounded-full p-3">
              <Text>
                <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  {categories.length > 0 && <Categories jobPostings={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
</View>


        <View>
          <Jobs meals={meals} categories={categories} handleJobDetail={handleJobDetail} />
        </View>
      </ScrollView>
    </View>
  );
}
