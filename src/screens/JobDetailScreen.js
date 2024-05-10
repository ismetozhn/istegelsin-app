import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AcademicCapIcon, BanknotesIcon, ChevronLeftIcon, ClockIcon, UsersIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { readDataByKey, Keys } from '../helpers/storage';
import { add, get } from '../api/apiHelper';
import StarRating from 'react-native-star-rating';
import { LinearGradient } from 'expo-linear-gradient';


export default function JobDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [starCount, setStarCount] = useState(0);

    useEffect(() => {
        getJobData(item.job_postingid);
        fetchJobScores(item.job_postingid, item.companyid);
    }, [item.job_postingid, item.companyid]);

    const getJobData = async (id) => {
        try {
            const response = await get(`JobPosting?jobPostingId=${id}`);
            if (response && response.isSuccess) {
                setMeal(response.data);
                setLoading(false);
            }
        } catch (err) {
            console.log('error:', err.message);
        }
    };

    const fetchJobScores = async (jobPostingId, companyId) => {
        try {
            let headers;

            // userid'ye göre headers belirleme
            const userId = await readDataByKey(Keys.userid);
            if (userId) {
                headers = { 'Company': 'true' };

                const response = await get(`https://ig.colaksoft.online/api/v1/JobFeedback/ListJobScoresByCompany?job_postingid=${jobPostingId}&companyId=${companyId}`, { headers }, true);
                if (response.data) {
                    const validFeedbacks = response.data.filter(feedback => !feedback.is_feedback_for_user);
                    const scores = validFeedbacks.map(feedback => feedback.question_score);
                    const averageScore = scores.reduce((acc, curr) => acc + curr, 0) / 2;
                    setStarCount(averageScore);
                }
            } else {
                // companyid'ye göre headers belirleme
                headers = { 'Company': 'true' };
                const response = await get(`https://ig.colaksoft.online/api/v1/JobFeedback/ListJobScoresByCompany?job_postingid=${jobPostingId}&companyId=${companyId}`, headers, true);
                if (response.data) {
                    const validFeedbacks = response.data.filter(feedback => !feedback.is_feedback_for_user);
                    const scores = validFeedbacks.map(feedback => feedback.question_score);
                    const averageScore = scores.reduce((acc, curr) => acc + curr, 0) / 2;
                    setStarCount(averageScore);
                }
            }
        } catch (error) {
            console.error('Hata oluştu:', error);
        }
    };


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

            // Show alert for successful application
            Alert.alert(
                "Başvuru Yapıldı",
                "İlgili ilana başvurunuz alınmıştır.",
                [
                    { text: "Tamam" }
                ]
            );

            console.log('Başvuru sonucu:', response);

        } catch (error) {
            console.log('Başvuru hatası:', error);

        }
    }

    if (loading) {
        return <Loading size="large" />;
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
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#330867" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-5 bg-white">
                    <BookmarkIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>


            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2 flex-row items-center">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                                {item?.title}
                            </Text>
                            <StarRating disabled={false} maxStars={5} rating={starCount} starSize={hp(3)} fullStarColor={'gold'} />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                                {item?.company_name}
                            </Text>
                            <TouchableOpacity onPress={applyForJob} className="p-2 rounded-full ">
                                <LinearGradient
                                    colors={['#330867', '#075985']}
                                    style={{
                                        flex: 1,
                                        marginLeft: '15%',
                                        marginRight: '15%',
                                        borderRadius: 20,
                                        justifyContent: 'center', // Yatayda ortala
                                        alignItems: 'center', // Dikeyde ortala
                                    }}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Text className="h-12 mt-4 font-bold text-cyan-50" style={{ fontSize: hp(2.5), textAlign: 'center' }}>İlana Başvuru Yap</Text>
                                </LinearGradient>

                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
                            <View className="flex rounded-full h-32 bg-violet-950 p-2">

                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white ml-1 rounded-full flex items-center justify-center">
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text className="font-bold text-neutral-50"
                                        style={{ fontSize: hp(2) }}
                                    >
                                        {item?.employment_name.slice(0, 12).split(' ').map((word, index, arr) => (
                                            <React.Fragment key={index}>
                                                {word}
                                                {index !== arr.length - 1 && '\n'}
                                            </React.Fragment>
                                        ))}
                                    </Text>




                                </View>
                            </View>
                            <View className="flex rounded-full h-32 bg-violet-950 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-50">500+</Text>
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700"></Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-violet-950 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full ml-1 flex items-center justify-center">
                                    <AcademicCapIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text className="font-bold text-neutral-50"
                                        style={{ fontSize: hp(2) }}
                                    >
                                        {item?.experience_level_name.slice(0, 12).split(' ').map((word, index, arr) => (
                                            <React.Fragment key={index}>
                                                {word}
                                                {index !== arr.length - 1 && '\n'}
                                            </React.Fragment>
                                        ))}
                                    </Text>


                                </View>
                            </View>
                            <View className="flex rounded-full bg-violet-950 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <BanknotesIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-50">  {item.total_salary.toString().length > 4 ? item.total_salary.toString().slice(0, 2) + 'k' : item.total_salary.toString()} </Text>

                                </View>
                            </View>

                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{ fontSize: hp(1.8) }} className="text-violet-950 font-semibold text-center">
                                İlan Başlangıç Tarihi: {item?.start_at.slice(0, 10)}
                            </Text>

                            <Text className="text-violet-950 font-extrabold text-center text-lg">
                                Son Başvuru Tarihi: {item?.end_at.slice(0, 10)}
                            </Text>



                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                İş Tanımı
                            </Text>
                            <Text style={{ fontSize: hp(1.8) }} className="text-neutral-700">
                                {
                                    item?.description
                                }
                            </Text>
                        </Animated.View>
                    </View>
                )
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({})