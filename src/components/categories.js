import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { categoryData } from '../constants'

export default function Categories() {
  return (
    <View>
      <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      className="space-x-4"
      contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            categoryData.map((cat,index)=>{
                return(
                    <TouchableOpacity
                key={index}
                className="flex items-center space-y-1">
                    <View className="rounded=full p-[6px]">
                        <Image
                        
                        source={{uri:cat.image}}
                        style={{width:hp(7),height:hp(7)}}
                        className="rounded-full"
                        

                        />
                        
                    </View>
                        <Text className="text-neutral-600" style={{fontSize:hp(1.6)}}>
                            {cat.name}

                        </Text>

                </TouchableOpacity>
                )

            })
        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})