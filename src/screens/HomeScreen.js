import { ScrollView, StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Bars3BottomRightIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Jobs from '../components/jobs';


export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Günlük');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, [])
  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      //console.log('got categories:',response.data);
      if (response && response.data) {
        setCategories(response.data.categories);

      }
    }
    catch (err) {
      console.log('error:', err.message);
    }
  }
  return (
    <View>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image source={require('../../assets/images/man.jpg')} style={{ height: hp(5), width: hp(5.5), borderRadius: 25 }} />
          <Bars3BottomRightIcon size={hp(4)} color="gray" />
        </View>


        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600"> Merhaba, Berkan!</Text>
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
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        <View>
        { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} /> }

        </View>

        <View>
          <Jobs />
        </View>
      </ScrollView >
    </View >

  )
}
