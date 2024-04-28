import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { CachedImage } from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AcademicCapIcon, BanknotesIcon, ChevronLeftIcon, ClockIcon, UsersIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { readDataByKey, Keys } from '../helpers/storage';
import { add } from '../api/apiHelperDeneme';



export default function JobDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getJobData(item.job_postingid);
    }, [])

    const getJobData = async (id = 1) => {
        try {
            //const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const response = await axios.get(`https://ig.colaksoft.online/api/v1/JobPosting?jobPostingId=${id}`);
            //console.log('got meal:',response);
            if (response && response.data) {
                setMeal(response.data.data[0]);
                setLoading(false);

            }
        }
        catch (err) {
            console.log('error:', err.message);
        }
    }

    const applyForJob = async () => {
        try {
            const userId = await readDataByKey(Keys.userid);
            const jobPostingId = item.job_postingid;

            const requestBody = {
                userid: userId,
                job_postingid: jobPostingId,
                is_user_accepted: false,
                created_at: new Date().toISOString()
            };
            const headers = {
                'Content-Type': 'application/json-patch+json',
                

            };
            const response = await add('https://ig.colaksoft.online/api/v1/JobApplication', requestBody, headers, true);



            console.log('Başvuru sonucu:', response);
            // Başvurunun başarılı olduğuna dair bir geri bildirim gösterebilirsiniz
        } catch (error) {
            console.log('Başvuru hatası:', error);
            // Başvurunun başarısız olduğuna dair bir geri bildirim gösterebilirsiniz
        }
    }


    return (
        <ScrollView className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style={'light'} />

            <View className="flex-row justify-center">


                {
                    <Image
                        source={{ uri: 'https://cdn.colaksoft.online' + item.logo_path }}
                        sharedTransitionTag={item.title}
                        style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
                    />
                }
            </View>


            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14 ">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="rgb(56 189 248)" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
                    <BookmarkIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>


            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8" >
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                                {item?.title}

                            </Text>



                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                                {item?.company_name}
                            </Text>


                            <TouchableOpacity onPress={applyForJob} className="p-2 rounded-full ">
                                <Text className=" bg-cyan-700 w-1/2 mx-20 text-cyan-50" style={{ fontSize: hp(3), borderRadius: 10, textAlign: 'center' }} >Başvur</Text>
                            </TouchableOpacity>


                        </Animated.View>


                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                            <View className="flex rounded-full bg-sky-400 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full ml-5 flex items-center justify-center">
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text
                                        style={{ fontSize: hp(2) }}
                                        className="font-bold text-neutral-700"
                                    >
                                        {item?.employment_name.length > 8 ?
                                            item?.employment_name.slice(0, 11) + "\n" + item?.employment_name.slice(11) :
                                            item?.employment_name
                                        }
                                    </Text>



                                </View>
                            </View>
                            <View className="flex rounded-full bg-sky-400 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">500+</Text>
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700"></Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-sky-400 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full ml-3 flex items-center justify-center">
                                    <AcademicCapIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">{item?.experience_level_name}</Text>

                                </View>
                            </View>
                            <View className="flex rounded-full bg-sky-400 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <BanknotesIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">  {item.total_salary.toString().length > 4 ? item.total_salary.toString().slice(0, 3) + 'k' : item.total_salary.toString()} </Text>

                                </View>
                            </View>

                        </Animated.View>




                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                İş Tanımı
                            </Text>
                            <Text style={{ fontSize: hp(1.8) }} className="text-neutral-700">
                                {
                                    item?.description
                                }
                            </Text>
                        </Animated.View>






                        {/* {
                            meal.strYoutube && (
                                <View className="space-y-4">
                                    <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                        İşveren Hakkında
                                    </Text>
                                    <View>
                                        <YoutubeIframe
                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                            height={hp(30)}
                                        />
                                    </View>

                                </View>
                            )
                        }
                         */}
                    </View>
                )
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({})