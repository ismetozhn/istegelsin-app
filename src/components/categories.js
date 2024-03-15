import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated,{FadeInDown} from 'react-native-reanimated';

import { categoryData } from '../constants'
import { CachedImage } from '../helpers/image';

export default function Categories({jobPostings,activeCategory,handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      className="space-x-4"
      contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            jobPostings.map((item,index)=>{
              let isActive=item.companyId==activeCategory;
              let activeButtonClass=isActive? ' bg-sky-400':' bg-black/10';
                return(
                    <TouchableOpacity
                key={index}
                onPress={()=> handleChangeCategory(item.companyId)}
                className="flex items-center space-y-1">
                    <View className={"rounded-full p-[6px]"+activeButtonClass}>
                        {/* <Image
                        
                        source={{uri:cat.strCategoryThumb}}
                        style={{width:hp(7),height:hp(7)}}
                        className="rounded-full"
                        

                        /> */}
                        <CachedImage
                        uri={item.logoPath}
                        style={{width:hp(7),height:hp(7)}}
                        className="rounded-full"
                        />
                        
                    </View>
                        <Text className="text-neutral-600" style={{fontSize:hp(1.6)}}>
                            {item.companyId}

                        </Text>

                </TouchableOpacity>
                )

            })
        }

      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({})