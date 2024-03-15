import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';




export default function Jobs({ categories, meals }) {
  const navigation = useNavigation();

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
              keyExtractor={(item) => item.title}
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
  let isEven = index % 2 == 0;
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        style={{ width: '50%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        className="flex justify-center mb-4 space-y-1 "
        onPress={() => navigation.navigate('JobDetail', { ...item })}
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: '100%', height: hp(35), borderRadius: 35 }}
          className="bg-black/5"
        /> */}
        <View className="flex-row">
          {/* <CachedImage
            uri={item.logoPath}
            style={{ width: '50%', height: hp(10), borderRadius: 35 }}
            className="bg-black/5"
            sharedTransitionTag={item.title}

          /> */}

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
          
          </View>


        </View>



      </Pressable>
    </Animated.View>
  )
}