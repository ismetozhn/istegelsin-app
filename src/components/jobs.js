import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';




export default function Jobs({ categories, meals }) {
  const navigation = useNavigation();
  console.log(categories)
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
  //let isEven = index % 2 == 0;
  let isEven = index % 1 == 0;
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        //style={{ width: '50%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        style={{ width: '100%'}}
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
                item.adress.length > 20 ? item.adress.slice(0, 20) + '...' : item.adress
              }

            </Text>


            <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: hp(2.0), fontWeight: '600', color: '#666' }}>
                {item.total_salary}
              </Text>
            </View>




          </View>


        </View>



      </Pressable>
    </Animated.View>
  )
}