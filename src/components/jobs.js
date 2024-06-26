import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';
import { get } from '../api/apiHelper';
import { readDataByKey, Keys } from '../helpers/storage';

import StarRating from 'react-native-star-rating';





export default function Jobs({ categories, meals }) {
  const navigation = useNavigation();
  //console.log(categories)
  return (
    <View className="flex mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">İş İlanları</Text>
      <View>
        {
          categories.length == 0 || meals.length == 0 ? (
            <Loading size="large" className="mt-20" />
          ) : (
            <MasonryList

              data={meals}
              keyExtractor={(item) => item.job_postingid}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, i }) => <JobCard item={item} index={i} navigation={navigation} />}
              // refreshing={isLoadingNext}
              // onRefresh={() => refetch({first: ITEM_CNT})}
              onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
            />

          )
        }

      </View>
    </View>
  )
}

const JobCard = ({ item, index, navigation }) => {

  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    fetchJobScores(item.job_postingid, item.companyid);
  }, [item.job_postingid, item.companyid]);

  const fetchJobScores = async (jobPostingId, companyId) => {
    try {
      let headers;

      // userid'ye göre headers belirleme
      const userId = await readDataByKey(Keys.userid);
      if (userId) {
        headers = { 'Company': 'true' };

        const response = await get(`https://ig.colaksoft.online/api/v1/JobFeedback/ListScore?companyId=${companyId}`, { headers }, true);
        if (response.data) {
          const validFeedbacks = response.data.filter(feedback => !feedback.is_feedback_for_user);
          const scores = validFeedbacks.map(feedback => feedback.question_score);
          const totalQuestions = scores.length; // Toplam question_score sayısı
          const sumOfHalfScores = scores.reduce((acc, curr) => acc + curr / 2, 0); // Her bir question_score'un yarısının toplamı
          const averageScore = sumOfHalfScores / totalQuestions;
          setStarCount(averageScore);
        }
      } else {
        // companyid'ye göre headers belirleme
        headers = { 'Company': 'true' };
        const response = await get(`https://ig.colaksoft.online/api/v1/JobFeedback/ListScore?companyId=${companyId}`, headers, true);
        if (response.data) {
          const validFeedbacks = response.data.filter(feedback => !feedback.is_feedback_for_user);
          const scores = validFeedbacks.map(feedback => feedback.question_score);
          const totalQuestions = scores.length; // Toplam question_score sayısı
          const sumOfHalfScores = scores.reduce((acc, curr) => acc + curr / 2, 0); // Her bir question_score'un yarısının toplamı
          const averageScore = sumOfHalfScores / totalQuestions;
          setStarCount(averageScore);
        }
      }
    } catch (error) {
      console.error('Hata oluştu:', error);
    }
  };
  //let isEven = index % 2 == 0;
  let isEven = index % 1 == 0;
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        //style={{ width: '50%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        style={{ width: '100%' }}
        className="flex justify-center mb-4 space-y-1 "
        onPress={() => navigation.navigate('JobDetail', { ...item })}
      >


        <View className="flex-row" >

          {
            <Image
              source={{ uri: 'https://cdn.colaksoft.online' + item.logo_path }}
              style={{ width: '50%', height: hp(10), borderRadius: 35 }}
            />
          }

          <View>
            <Text style={{ fontSize: hp(2.0) }} className=" font-bold ml-2 text-neutral-700">
              {
                item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title
              }
            </Text>

            <Text style={{ fontSize: hp(2.0) }} className=" 
            font-semibold ml-2 text-neutral-500">
              {
                item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description
              }

            </Text>

            <Text style={{ fontSize: hp(2.0) }} className=" 
            font-semibold ml-2 text-neutral-500">
              {
                item.adress.length > 20 ? item.adress.slice(0, 20) + '...' : item.companyid
              }

            </Text>


            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 7 }}>
              <Text style={{ marginRight: 5, fontSize: hp(1.7), color: 'black' }}>Şirket Puanı:</Text>
              <StarRating disabled={false} maxStars={5} rating={starCount} starSize={hp(2)} fullStarColor={'gold'} />
            </View>



          </View>


        </View>



      </Pressable>
    </Animated.View>
  )
}