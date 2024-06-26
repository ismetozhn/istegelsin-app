import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';


export default function Categories({ jobPostings, activeCategory, handleChangeCategory }) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
      
        horizontal
        showsVerticalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          jobPostings.map((item, index) => {
            let is_active = item.work_modelid == activeCategory;
            let activeButtonClass = is_active ? ' bg-sky-400' : ' bg-black/10';
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(item.work_modelid)}
                className="flex items-center space-y-1">
                <View className={"rounded-full p-[6px]" + activeButtonClass}>

                  {
                    <Image
                      source={{ uri: 'https://cdn.colaksoft.online' + item.logo_path }}
                      style={{ width: hp(7), height: hp(7) }}
                      className="rounded-full"
                    />
                  }

                </View>
                <Text className="text-violet-950 font-bold" style={{ fontSize: hp(1.6) }}>
                  {item.header}

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