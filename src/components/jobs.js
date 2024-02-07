import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { mealData } from '../constants';
import MasonryList from '@react-native-seoul/masonry-list';



export default function Jobs() {
  return (
    <View className="mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">İş İlanları</Text>
      <View>
        <MasonryList
          
          data={mealData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <JobCard item={item} index={i} />}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({first: ITEM_CNT})}
          onEndReachedThreshold={0.1}
        // onEndReached={() => loadNext(ITEM_CNT)}
        />
      </View>
    </View>
  )
}

const JobCard = ({ item, index }) => {
  let isEven = index%2==0;
  return (
    <View>
      <Pressable
        style={{ width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven?8:0 }}
        className="flex justify-center mb-4 space-y-1 "
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: '100%', height: hp(35), borderRadius: 35 }}
          className="bg-black/5"
        />

      </Pressable>
    </View>
  )
}